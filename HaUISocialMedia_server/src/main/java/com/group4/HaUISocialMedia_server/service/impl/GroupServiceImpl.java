package com.group4.HaUISocialMedia_server.service.impl;

import com.group4.HaUISocialMedia_server.dto.GroupDto;
import com.group4.HaUISocialMedia_server.dto.MemberDto;
import com.group4.HaUISocialMedia_server.dto.PostDto;
import com.group4.HaUISocialMedia_server.dto.SearchObject;
import com.group4.HaUISocialMedia_server.entity.*;
import com.group4.HaUISocialMedia_server.repository.*;
import com.group4.HaUISocialMedia_server.service.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class GroupServiceImpl implements GroupService {

    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private MemberService memberService;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private NotificationTypeRepository notificationTypeRepository;

    @Autowired
    private LikeService likeService;

    @Autowired
    private CommentService commentService;

    @Autowired
    private PostImageService postImageService;

    @Override
    public GroupDto createGroup(GroupDto groupDto) {
        if (groupDto == null)
            return null;
        Group newGroup = new Group();
        newGroup.setCreateDate(new Date());
        newGroup.setName(groupDto.getName());
        newGroup.setCode(groupDto.getCode());
        newGroup.setAvatar(groupDto.getAvatar());
        newGroup.setBackGroundImage(groupDto.getBackGroundImage());
        newGroup.setUser(userService.getCurrentLoginUserEntity());
        newGroup.setDescription(groupDto.getDescription());

        Group group = groupRepository.save(newGroup);

        Set<Member> userList = new HashSet<>();
        Member userAdmin = new Member();
        userAdmin.setRole(Role.ADMIN);
        userAdmin.setApproved(true);
        userAdmin.setJoinDate(new Date());
        userAdmin.setUser(userService.getCurrentLoginUserEntity());
        userAdmin.setGroup(group);
        memberService.createUserGroup(new MemberDto(userAdmin));
        userList.add(userAdmin);

        if (groupDto.getUserJoins() == null) {
            GroupDto newGroupDto = new GroupDto(group);
            newGroupDto.setUserJoins(userList.stream().map(MemberDto::new).collect(Collectors.toSet()));
            return newGroupDto;
        }

        groupDto.getUserJoins().stream().map(x -> {
            User user = userRepository.findById(x.getUser().getId()).orElse(null);
            Member member = new Member();
            member.setGroup(group);
            member.setApproved(true);
            member.setRole(Role.USER);
            member.setUser(user);
            member.setJoinDate(new Date());
            MemberDto memberDto = memberService.createUserGroup(new MemberDto(member));
            member.setId(memberDto.getId());
            return member;
        }).forEach(userList::add);


        GroupDto newGroupDto = new GroupDto(group);
        newGroupDto.setUserJoins(userList.stream().map(MemberDto::new).collect(Collectors.toSet()));
        return newGroupDto;
    }

    @Override
    public GroupDto updateGroup(GroupDto groupDto) {
        Group oldGroup = groupRepository.findById(groupDto.getId()).orElse(null);
        if (oldGroup == null)
            return null;
        oldGroup.setName(groupDto.getName());
        oldGroup.setCode(groupDto.getCode());
        oldGroup.setAvatar(groupDto.getAvatar());
        oldGroup.setBackGroundImage(groupDto.getBackGroundImage());
        oldGroup.setDescription(groupDto.getDescription());

        GroupDto groupDto1 = new GroupDto(groupRepository.saveAndFlush(oldGroup));

        if (oldGroup.getUserJoins() != null)
            groupDto1.setUserJoins(oldGroup.getUserJoins().stream().filter(Member::isApproved).map(MemberDto::new).collect(Collectors.toSet()));
        if (oldGroup.getPosts() != null)
            groupDto1.setPosts(oldGroup.getPosts().stream().map(PostDto::new).collect(Collectors.toSet()));
        return groupDto1;
    }

    @Override
    public MemberDto joinGroupRequest(UUID groupId) {
        if (memberRepository.isEmpty(userService.getCurrentLoginUserEntity().getId(), groupId) != null)
            return null;
        Member newMember = new Member();
        Group group = groupRepository.findById(groupId).orElse(null);
        if (group != null)
            newMember.setGroup(group);
        newMember.setUser(userService.getCurrentLoginUserEntity());
        newMember.setApproved(false);
        newMember.setRole(Role.USER);
        return memberService.createUserGroup(new MemberDto(newMember));
    }

    @Override
    public MemberDto approvedJoinGroupRequest(UUID userGroupId) {
        Member userRequest = memberRepository.findById(userGroupId).orElse(null);
        if (userRequest == null)
            return null;
        if (userRequest.isApproved())
            return null;
        userRequest.setApproved(true);
        userRequest.setJoinDate(new Date());

        Notification notification = new Notification();
        notification.setOwner(userRequest.getUser());
        notification.setGroup(userRequest.getGroup());
        notification.setCreateDate(new Date());
        notification.setActor(userService.getCurrentLoginUserEntity());
        notification.setContent("Yêu cầu tham gia nhóm " + userRequest.getGroup().getName() + " đã được duyệt");
        NotificationType notificationType = notificationTypeRepository.findByName("Group");

        if (notificationType != null)
            notification.setNotificationType(notificationType);
        notificationRepository.save(notification);
        return memberService.updateUserGroup(new MemberDto(userRequest));
    }

    @Override
    public boolean cancelJoinGroupRequest(UUID memberId) {
        Member userRequest = memberRepository.findById(memberId).orElse(null);
        if (userRequest == null || userRequest.isApproved())
            return false;
        memberRepository.removeById(memberId);
        return true;
    }

    @Override
    public boolean leaveGroup(UUID groupId) {
        if (isAdminGroup(groupId)) {
            List<Member> li = memberRepository.getNumberUserIsAdmin(groupId);
            if (li.size() <= 1)
                return false;
        }
        Member oldMember = memberRepository.findUserGroup(userService.getCurrentLoginUserEntity().getId(), groupId);
        if (oldMember == null || !oldMember.isApproved())
            return false;
        memberRepository.removeById(oldMember.getId());
        return true;
    }

    @Override
    public boolean deleteGroup(UUID groupId) {
        Group group = groupRepository.findById(groupId).orElse(null);
        if (group == null)
            return false;
        groupRepository.delete(group);
        return true;
    }

    @Override
    public boolean isAdminGroup(UUID groupId) {
        return memberRepository.isAdminGroup(userService.getCurrentLoginUserEntity().getId(), groupId) != null;
    }

    @Override
    public Set<GroupDto> getAllJoinedGroupOfUser(UUID userId) {
        if (userId == null) return null;
        User currentUser = userService.getCurrentLoginUserEntity();
        if (currentUser == null) return null;

        List<Member> li = memberRepository.getAllJoinedGroup(userId);
        Set<GroupDto> res = new HashSet<>();
        li.stream().map(x -> {
            GroupDto groupDto = null;
            if (x.getGroup() != null)
                groupDto = new GroupDto(x.getGroup());
            if (x.getGroup().getUserJoins() != null)
                groupDto.setUserJoins(x.getGroup().getUserJoins().stream().filter(Member::isApproved).map(MemberDto::new).collect(Collectors.toSet()));
            if (x.getGroup().getPosts() != null)
                groupDto.setPosts(x.getGroup().getPosts().stream().map(PostDto::new).collect(Collectors.toSet()));
            return groupDto;
        }).forEach(res::add);

        for (GroupDto group : res) {
            Member relationship = memberRepository.getRelationshipBetweenCurrentUserAndGroup(currentUser.getId(), group.getId());
            if (relationship != null)
                group.setRelationship(new MemberDto(relationship));
        }

        return res;
    }

    @Override
    public Set<GroupDto> searchGroupByName(String name) {
        User currentUser = userService.getCurrentLoginUserEntity();
        if (currentUser == null) return null;

        List<Group> li = groupRepository.findGroupByName(name);
        Set<GroupDto> res = new HashSet<>();
        li.stream().map(x -> {
            GroupDto groupDto = new GroupDto(x);
            if (x.getUserJoins() != null)
                groupDto.setUserJoins(x.getUserJoins().stream().filter(Member::isApproved).map(MemberDto::new).collect(Collectors.toSet()));
            if (x.getPosts() != null)
                groupDto.setPosts(x.getPosts().stream().map(PostDto::new).collect(Collectors.toSet()));
            return groupDto;
        }).forEach(res::add);

        for (GroupDto group : res) {
            Member relationship = memberRepository.getRelationshipBetweenCurrentUserAndGroup(currentUser.getId(), group.getId());
            if (relationship != null)
                group.setRelationship(new MemberDto(relationship));
        }

        return res;
    }

    @Override
    public MemberDto dutyAdmin(UUID memberId) {
        Member member = memberRepository.findById(memberId).orElse(null);
        if (memberRepository.isAdminGroup(member.getUser().getId(), member.getGroup().getId()) != null || !member.isApproved())
            return null;
        MemberDto memberDto1 = new MemberDto(member);
        memberDto1.setRole(Role.ADMIN);

        return memberService.updateUserGroup(memberDto1);
    }

    @Override
    public boolean cancelDutyAdmin(UUID memberId) {
        Member member = memberRepository.findById(memberId).orElse(null);
        if (memberRepository.isAdminGroup(member.getUser().getId(), member.getGroup().getId()) == null || !member.isApproved())
            return false;
        MemberDto memberDto1 = new MemberDto(member);
        memberDto1.setRole(Role.USER);

        memberService.updateUserGroup(memberDto1);
        return true;
    }

    @Override
    public Set<MemberDto> getAllUserWaitJoinedGroup(UUID groupId) {
        List<Member> li = memberRepository.getAllUserWaitJoinedGroup(groupId);
        Set<MemberDto> res = new HashSet<>();
        li.stream().map(MemberDto::new).forEach(res::add);
        return res;
    }

    @Override
    public boolean kickUserLeaveFGroup(UUID memberId) {
        Member member = memberRepository.findById(memberId).orElse(null);
        if (member == null || memberRepository.isAdminGroup(member.getUser().getId(), member.getGroup().getId()) != null)
            return false;
        memberRepository.removeById(member.getId());
        return true;
    }

    @Override
    public GroupDto findById(UUID groupId) {
        User currentUser = userService.getCurrentLoginUserEntity();

        Group group = groupRepository.findById(groupId).orElse(null);
        if (group == null)
            return null;
        GroupDto groupDto = new GroupDto(group);
        if (group.getUserJoins() != null)
            groupDto.setUserJoins(group.getUserJoins().stream().filter(Member::isApproved).map(MemberDto::new).collect(Collectors.toSet()));
        if (group.getPosts() != null)
            groupDto.setPosts(group.getPosts().stream().map(x -> {
                PostDto postDto = new PostDto(x);
                postDto.setLikes(likeService.getListLikesOfPost(postDto.getId()));
                postDto.setComments(commentService.getParentCommentsOfPost(postDto.getId()));
                postDto.setImages(postImageService.sortImage(postDto.getId()));
                return postDto;
            }).collect(Collectors.toSet()));

        Member relationship = memberRepository.getRelationshipBetweenCurrentUserAndGroup(currentUser.getId(), groupDto.getId());
        if (relationship != null)
            groupDto.setRelationship(new MemberDto(relationship));

        return groupDto;
    }

    @Override
    public GroupDto findGroupByMember(UUID memberId) {
        Member member = (memberRepository.findById(memberId)).orElse(null);
        if (member.getGroup() == null)
            return null;
        return new GroupDto(member.getGroup());
    }

    @Override
    public boolean isJoinedGroup(UUID groupId) {
        Member member = memberRepository.isEmpty(userService.getCurrentLoginUserEntity().getId(), groupId);
        return member != null && member.isApproved();
    }

    @Override
    public Set<GroupDto> getAllGroupUserIsAdmin() {
        User currentUser = userService.getCurrentLoginUserEntity();

        List<Member> li = memberRepository.getAllGroupUserIsAdmin(userService.getCurrentLoginUserEntity().getId());
        Set<GroupDto> res = new HashSet<>();
        li.stream().map(x -> {
            GroupDto groupDto = null;
            if (x.getGroup() != null)
                groupDto = new GroupDto(x.getGroup());
            if (x.getGroup().getUserJoins() != null)
                groupDto.setUserJoins(x.getGroup().getUserJoins().stream().filter(Member::isApproved).map(MemberDto::new).collect(Collectors.toSet()));
            if (x.getGroup().getPosts() != null)
                groupDto.setPosts(x.getGroup().getPosts().stream().map(y -> {
                    PostDto postDto = new PostDto(y);
                    postDto.setLikes(likeService.getListLikesOfPost(postDto.getId()));
                    postDto.setComments(commentService.getParentCommentsOfPost(postDto.getId()));
                    postDto.setImages(postImageService.sortImage(postDto.getId()));
                    return postDto;
                }).collect(Collectors.toSet()));

            Member relationship = memberRepository.getRelationshipBetweenCurrentUserAndGroup(currentUser.getId(), groupDto.getId());
            groupDto.setRelationship(new MemberDto(relationship));

            return groupDto;
        }).forEach(res::add);

        return res;
    }

    @Override
    public Set<GroupDto> getAllGroupUserNotYetJoin() {
//        Set<GroupDto> allGroup = groupRepository.findAll().stream().map(x -> {
//            GroupDto groupDto = new GroupDto(x);
//            if (x.getUserJoins() != null)
//                groupDto.setUserJoins(x.getUserJoins().stream().filter(Member::isApproved).map(MemberDto::new).collect(Collectors.toSet()));
//            if (x.getPosts() != null)
//                groupDto.setPosts(x.getPosts().stream().map(PostDto::new).collect(Collectors.toSet()));
//            return groupDto;
//        }).collect(Collectors.toSet());
//        Set<GroupDto> resGroupSmall = getAllJoinedGroupOfUser(userService.getCurrentLoginUserEntity().getId());
//        if(!resGroupSmall.isEmpty())
//           //  return allGroup.removeAll(getAllJoinedGroupOfUser(userService.getCurrentLoginUserEntity().getId())) ? allGroup : null;
//             allGroup.removeAll(resGroupSmall);
//        return allGroup;
        User currentUser = userService.getCurrentLoginUserEntity();

        List<UUID> groupIds = getAllJoinedGroupOfUser(userService.getCurrentLoginUserEntity().getId()).stream().map(GroupDto::getId).toList();

        List<Group> li = memberRepository.getAllGroupUserNotYetJoin(groupIds);
        Set<GroupDto> groupDtos = new HashSet<>();
        li.stream().map(x -> {
            GroupDto groupDto = new GroupDto(x);
            if (x.getUserJoins() != null)
                groupDto.setUserJoins(x.getUserJoins().stream().filter(Member::isApproved).map(MemberDto::new).collect(Collectors.toSet()));
            if (x.getPosts() != null)
                groupDto.setPosts(x.getPosts().stream().map(PostDto::new).collect(Collectors.toSet()));

            Member relationship = memberRepository.getRelationshipBetweenCurrentUserAndGroup(currentUser.getId(), groupDto.getId());
            if (relationship != null)
                groupDto.setRelationship(new MemberDto(relationship));

            return groupDto;
        }).forEach(groupDtos::add);

        return groupDtos;
    }

    @Override
    public Set<MemberDto> getAllUserJoinedGroup(UUID groupId) {
        List<Member> li = memberRepository.getAllUserJoinedGroup(groupId);
        Set<MemberDto> res = new HashSet<>();
        li.stream().map(MemberDto::new).forEach(res::add);
        return res;
    }

    @Override
    public Set<PostDto> findPostInGroup(String content, UUID groupId) {
        Set<PostDto> res = findById(groupId).getPosts().stream().filter(x -> x.getContent().contains(content)).collect(Collectors.toSet());
        return res;
    }

    public String insertPercent(String word) {
        if (word == null || word.length() == 0) return "";
        StringBuilder result = new StringBuilder();

        result.append('%');

        for (int i = 0; i < word.length(); i++) {
            result.append(word.charAt(i));
            result.append('%');
        }

        return result.toString();
    }

    @Override
    public List<GroupDto> pagingByKeyword(SearchObject searchObject) {
        if (searchObject == null) return null;
        String keyword = insertPercent(searchObject.getKeyWord());

        User currentUser = userService.getCurrentLoginUserEntity();

        if (currentUser == null) return null;

        List<Group> validGroups = groupRepository.pagingGroups(keyword, PageRequest.of(searchObject.getPageIndex() - 1, searchObject.getPageSize()));
        List<GroupDto> res = new ArrayList<>();
        for (Group group : validGroups) {
            GroupDto item = new GroupDto(group);
            Member relationship = memberRepository.getRelationshipBetweenCurrentUserAndGroup(currentUser.getId(), group.getId());

            if (relationship != null) {
                MemberDto rela = new MemberDto(relationship);
                item.setRelationship(rela);
            }

            res.add(item);
        }

        return res;
    }

    @Override
    public Set<PostDto> findAllPostByGroup(UUID groupId) {
        Set<PostDto> res = groupRepository.findById(groupId).orElse(null).getPosts().stream().map(PostDto::new).collect(Collectors.toSet());
        res.forEach(x -> {
            x.setLikes(likeService.getListLikesOfPost(x.getId()));
            x.setComments(commentService.getParentCommentsOfPost(x.getId()));
            x.setImages(postImageService.sortImage(x.getId()));
        });
        return res;
    }

    @Override
    public Set<PostDto> getAllPostByAllGroup(SearchObject searchObject) {
        Set<PostDto> res = groupRepository.findAll(PageRequest.of(searchObject.getPageIndex(), searchObject.getPageSize())).stream().flatMap(x -> x.getPosts().stream().map(PostDto::new)).collect(Collectors.toSet());
        res.forEach(x -> {
            x.setLikes(likeService.getListLikesOfPost(x.getId()));
            x.setComments(commentService.getParentCommentsOfPost(x.getId()));
            x.setImages(postImageService.sortImage(x.getId()));
        });
        return res;
    }
}


