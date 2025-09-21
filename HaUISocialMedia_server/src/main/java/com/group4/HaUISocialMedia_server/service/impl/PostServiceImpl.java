package com.group4.HaUISocialMedia_server.service.impl;

import com.group4.HaUISocialMedia_server.dto.*;
import com.group4.HaUISocialMedia_server.entity.*;
import com.group4.HaUISocialMedia_server.repository.*;
import com.group4.HaUISocialMedia_server.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class PostServiceImpl implements PostService {
    @Autowired
    private PostImageRepository postImageRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private RelationshipRepository relationshipRepository;

    @Autowired
    private PostImageService postImageService;

    @Autowired
    private UserService userService;

    @Autowired
    private RelationshipService relationshipService;

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private NotificationTypeRepository notificationTypeRepository;

    @Autowired
    private LikeService likeService;

    @Autowired
    private CommentService commentService;

    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Override
    public List<PostDto> getNewsFeed(SearchObject searchObject) {
        if (searchObject == null) return null;
        String keyword = insertPercent(searchObject.getKeyWord());

        User currentUser = userService.getCurrentLoginUserEntity();

        if (currentUser == null || searchObject == null) return null;

        Post entity = null;
        if (searchObject.getMileStoneId() != null)
            entity = postRepository.findById(searchObject.getMileStoneId()).orElse(null);

        Date mileStoneDate = new Date();
        if (entity != null) mileStoneDate = entity.getCreateDate();

        Set<UUID> userIds = new HashSet<>();
        userIds.add(currentUser.getId());
        List<Relationship> acceptedRelationships = relationshipRepository.findAllAcceptedRelationship(currentUser.getId());
        for (Relationship relationship : acceptedRelationships) {
            userIds.add(relationship.getReceiver().getId());
            userIds.add(relationship.getRequestSender().getId());
        }

        List<UUID> joinedGroupIds = new ArrayList<>();
        List<Member> joinedGroups = memberRepository.getAllJoinedGroup(currentUser.getId());
        for (Member member : joinedGroups) {
            joinedGroupIds.add((member.getId()));
        }

        List<PostDto> res = postRepository.findNextPostFromMileStoneWithKeyWord(new ArrayList<>(userIds), joinedGroupIds, mileStoneDate, keyword, PageRequest.of(0, searchObject.getPageSize()));

        for (PostDto postDto : res) {
            postDto.setLikes(likeService.getListLikesOfPost(postDto.getId()));
            postDto.setComments(commentService.getParentCommentsOfPost(postDto.getId()));
            postDto.setImages(postImageService.sortImage(postDto.getId()));
        }

        return res;
    }

    @Override
    public boolean hasAuthorityToChange(UUID postId) {
        Post entity = postRepository.findById(postId).orElse(null);
        if (entity == null) return false;

        User currentUser = userService.getCurrentLoginUserEntity();
        if (!entity.getOwner().getId().equals(currentUser.getId())) return false;

        return true;
    }


    @Override
    public PostDto createPost(PostDto dto) {
        User currentUser = userService.getCurrentLoginUserEntity();
        if (currentUser == null || dto == null) return null;

        Post entity = new Post();
        entity.setCreateDate(new Date());
        entity.setContent(dto.getContent());
        entity.setOwner(currentUser);
        if (dto.getGroup() != null)
            entity.setGroup(groupRepository.findById(dto.getGroup().getId()).orElse(null));

        Post savedEntity = postRepository.save(entity);
        if (!dto.getImages().isEmpty()) {
            entity.setPostImages(dto.getImages().stream().map(x -> {
                PostImage postImage = new PostImage();
                // postImage.setId(x.getId());
                //if(x.getPost() != null)
                postImage.setPost(postRepository.findById(savedEntity.getId()).orElse(null));
                postImage.setDescription(x.getDescription());
                postImage.setImage(x.getImage());
                postImage.setCreateDate(new Date());
                postImageRepository.save(postImage);
                return postImage;
            }).collect(Collectors.toSet()));
        }
        //alert all friends that this user has created new post
        SearchObject so = new SearchObject();
        so.setPageIndex(1);
        so.setPageSize(5000);
        List<UserDto> listFriends = relationshipService.getCurrentFriends(so);
        for (UserDto friend : listFriends) {
            Notification noti = new Notification();
            noti.setActor(currentUser);
            noti.setCreateDate(new Date());
            noti.setContent(currentUser.getUsername() + " đã tạo một bài viết mới: " + savedEntity.getContent());
            noti.setOwner(userService.getUserEntityById(friend.getId()));
            noti.setNotificationType(notificationTypeRepository.findByName("Post"));

            //postId now is referenceId in notification
            noti.setPost(savedEntity);
            Notification savedNoti = notificationRepository.save(noti);

            //send this noti via socket
            simpMessagingTemplate.convertAndSendToUser(friend.getId().toString(), "/notification", new NotificationDto(savedNoti));
        }

        PostDto responseDto = new PostDto(savedEntity);

        if (savedEntity.getPostImages() != null && savedEntity.getPostImages().size() != 0)
            responseDto.setImages(savedEntity.getPostImages().stream().map(PostImageDTO::new).collect(Collectors.toSet()));

        return responseDto;
    }

//    @Override
//    public PostDto createPostInGroup(PostDto dto, UUID groupId) {
//        User currentUser = userService.getCurrentLoginUserEntity();
//        if (currentUser == null || dto == null) return null;
//
//        Post entity = new Post();
//        entity.setCreateDate(new Date());
//        entity.setContent(dto.getContent());
//        entity.setOwner(currentUser);
//        if(dto.)
//        entity.setGroup();
//
//        Post savedEntity = postRepository.save(entity);
//        if (!dto.getImages().isEmpty()) {
//            entity.setPostImages(dto.getImages().stream().map(x -> {
//                PostImage postImage = new PostImage();
//                // postImage.setId(x.getId());
//                //if(x.getPost() != null)
//                postImage.setPost(postRepository.findById(savedEntity.getId()).orElse(null));
//                postImage.setDescription(x.getDescription());
//                postImage.setImage(x.getImage());
//                postImage.setCreateDate(new Date());
//                postImageRepository.save(postImage);
//                return postImage;
//            }).collect(Collectors.toSet()));
//        }
//        //alert all friends that this user has created new post
//        SearchObject so = new SearchObject();
//        so.setPageIndex(1);
//        so.setPageSize(5000);
//        List<UserDto> listFriends = relationshipService.getCurrentFriends(so);
//        for (UserDto friend : listFriends) {
//            Notification noti = new Notification();
//            noti.setActor(currentUser);
//            noti.setCreateDate(new Date());
//            noti.setContent(currentUser.getUsername() + " đã tạo một bài viết mới: " + savedEntity.getContent());
//            noti.setOwner(userService.getUserEntityById(friend.getId()));
//            noti.setNotificationType(notificationTypeRepository.findByName("Post"));
//
//            //postId now is referenceId in notification
//            noti.setPost(savedEntity);
//            Notification savedNoti = notificationRepository.save(noti);
//
//            //send this noti via socket
//            simpMessagingTemplate.convertAndSendToUser(friend.getId().toString(), "/notification", new NotificationDto(savedNoti));
//        }
//
//        PostDto responseDto = new PostDto(savedEntity);
//        responseDto.setImages(savedEntity.getPostImages().stream().map(PostImageDTO::new).collect(Collectors.toSet()));
//        return responseDto;
//    }


    @Override
    public PostDto updatePost(PostDto dto) {
        if (dto == null) return null;

        Post entity = postRepository.findById(dto.getId()).orElse(null);
        if (entity == null) return null;
        entity.setContent(dto.getContent());
        Post savedEntity = postRepository.save(entity);
        PostDto responseDto = new PostDto(savedEntity);
        responseDto.setLikes(likeService.getListLikesOfPost(responseDto.getId()));
        responseDto.setComments(commentService.getParentCommentsOfPost(responseDto.getId()));
        return responseDto;
    }

    @Override
    @Transactional
    public boolean deletePost(UUID postId) {
        Post entity = postRepository.findById(postId).orElse(null);
        if (entity == null) return false;
        postRepository.delete(entity);

        //Delete all comment, like by id
        //commentService.deleteAllByIdPost(postId);
        // likeService.deleteByAllByPost(postId);
        notificationRepository.deleteNotificationByIdPost(postId);
        return true;
    }

    @Override
    public Set<PostDto> getPostsOfUser(UUID userId, SearchObject searchObject) {
        User currentUser = userService.getCurrentLoginUserEntity();

        if (currentUser == null || searchObject == null) return null;
        String keyword = insertPercent(searchObject.getKeyWord());
        Post entity = null;
        if (searchObject.getMileStoneId() != null)
            entity = postRepository.findById(searchObject.getMileStoneId()).orElse(null);

        Date mileStoneDate = new Date();
        if (entity != null) mileStoneDate = entity.getCreateDate();

        List<PostDto> newsFeed = postRepository.findPostOfUser(userId, mileStoneDate, keyword, PageRequest.of(0, searchObject.getPageSize()));

        Set<PostDto> res = new TreeSet<>((post1, post2) -> post2.getCreateDate().compareTo(post1.getCreateDate()));
        res.addAll(newsFeed);
        for (PostDto postDto : res) {
            postDto.setLikes(likeService.getListLikesOfPost(postDto.getId()));
            postDto.setComments(commentService.getParentCommentsOfPost(postDto.getId()));
            postDto.setImages(postImageService.sortImage(postDto.getId()));
        }

        return res;
    }

    @Override
    public PostDto getById(UUID postId) {
        Post entity = postRepository.findById(postId).orElse(null);
        if (entity == null) return null;

        PostDto responseDto = new PostDto(entity);
        responseDto.setLikes(likeService.getListLikesOfPost(responseDto.getId()));
        responseDto.setComments(commentService.getParentCommentsOfPost(responseDto.getId()));
//        responseDto.setImages(entity.getPostImages().stream().map(PostImageDTO::new).collect(Collectors.toSet()));
        responseDto.setImages(postImageService.sortImage(entity.getId()));
        return responseDto;
    }


    @Override
    public PostDto updateBackgroundImage(String image) {
        User currentUser = userService.getCurrentLoginUserEntity();
        if (currentUser == null) return null;

        Post entity = new Post();
        entity.setCreateDate(new Date());
        entity.setOwner(currentUser);
        entity.setContent(currentUser.getUsername() + " đã cập nhật ảnh bìa của anh ấy");
        postRepository.save(entity);

        PostImage postImage = new PostImage();
        postImage.setPost(entity);
        postImage.setImage(image);
        postImage.setDescription("backgroundImage");
        postImage.setCreateDate(new Date());

        postImageRepository.save(postImage);
        Post savedEntity = postRepository.save(entity);


        //alert all friends that this user has created new post
        SearchObject so = new SearchObject();
        so.setPageIndex(1);
        so.setPageSize(5000);
        List<UserDto> listFriends = relationshipService.getCurrentFriends(so);
        for (UserDto friend : listFriends) {
            Notification noti = new Notification();
            noti.setActor(currentUser);
            noti.setCreateDate(new Date());
            noti.setContent(currentUser.getUsername() + " đã cập nhật mới một ảnh bìa: " + savedEntity.getContent());
            noti.setOwner(userService.getUserEntityById(friend.getId()));
            noti.setNotificationType(notificationTypeRepository.findByName("Post"));

            //postId now is referenceId in notification
            noti.setPost(savedEntity);
            Notification savedNoti = notificationRepository.save(noti);

            //send this noti via socket
            simpMessagingTemplate.convertAndSendToUser(friend.getId().toString(), "/notification", new NotificationDto(savedNoti));
        }
        UserDto userDto = new UserDto(entity.getOwner());
        userDto.setBackground(image);
        PostDto responseDto = new PostDto(savedEntity);
        responseDto.setCreator(userDto);
//        PostDto responseDto = new PostDto(savedEntity);
//        responseDto.setImages(savedEntity.getPostImages().stream().map(PostImageDTO::new).collect(Collectors.toSet()));
        return responseDto;
    }

    @Override
    public PostDto updateProfileImage(String image) {
        User currentUser = userService.getCurrentLoginUserEntity();
        if (currentUser == null) return null;

        Post entity = new Post();
        entity.setCreateDate(new Date());
        entity.setOwner(currentUser);
        entity.setContent(currentUser.getUsername() + " đã cập nhật ảnh đại diện của anh ấy");
        postRepository.save(entity);

        PostImage postImage = new PostImage();
        postImage.setPost(entity);
        postImage.setImage(image);
        postImage.setDescription("profileImage");
        postImage.setCreateDate(new Date());
        postImageRepository.save(postImage);
        Post savedEntity = postRepository.save(entity);

        //alert all friends that this user has created new post
        SearchObject so = new SearchObject();
        so.setPageIndex(1);
        so.setPageSize(5000);
        List<UserDto> listFriends = relationshipService.getCurrentFriends(so);
        for (UserDto friend : listFriends) {
            Notification noti = new Notification();
            noti.setActor(currentUser);
            noti.setCreateDate(new Date());
            noti.setContent(currentUser.getUsername() + " đã cập nhật mới ảnh đại diện: " + savedEntity.getContent());
            noti.setOwner(userService.getUserEntityById(friend.getId()));
            noti.setNotificationType(notificationTypeRepository.findByName("Post"));

            //postId now is referenceId in notification
            noti.setPost(savedEntity);
            Notification savedNoti = notificationRepository.save(noti);

            //send this noti via socket
            simpMessagingTemplate.convertAndSendToUser(friend.getId().toString(), "/notification", new NotificationDto(savedNoti));
        }

//        responseDto.setImages(savedEntity.getPostImages().stream().map(PostImageDTO::new).collect(Collectors.toSet()));
        UserDto userDto = new UserDto(entity.getOwner());
        userDto.setAvatar(image);
        PostDto responseDto = new PostDto(savedEntity);
        responseDto.setCreator(userDto);
        return responseDto;
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
    public List<PostDto> pagingByKeyword(SearchObject searchObject) {
        if (searchObject == null) return null;
        String keyword = insertPercent(searchObject.getKeyWord());

        User currentUser = userService.getCurrentLoginUserEntity();

        if (currentUser == null || searchObject == null) return null;

        Post entity = null;
        if (searchObject.getMileStoneId() != null)
            entity = postRepository.findById(searchObject.getMileStoneId()).orElse(null);

        Date mileStoneDate = new Date();
        if (entity != null) mileStoneDate = entity.getCreateDate();

        Set<UUID> userIds = new HashSet<>();
        userIds.add(currentUser.getId());
        List<Relationship> acceptedRelationships = relationshipRepository.findAllAcceptedRelationship(currentUser.getId());
        for (Relationship relationship : acceptedRelationships) {
            userIds.add(relationship.getReceiver().getId());
            userIds.add(relationship.getRequestSender().getId());
        }

        List<UUID> joinedGroupIds = new ArrayList<>();
        List<Member> joinedGroups = memberRepository.getAllJoinedGroup(currentUser.getId());
        for (Member member : joinedGroups) {
            joinedGroupIds.add((member.getId()));
        }

        List<PostDto> res = postRepository.findNextPostFromMileStoneWithKeyWord(new ArrayList<>(userIds), joinedGroupIds, mileStoneDate, keyword, PageRequest.of(0, searchObject.getPageSize()));

        for (PostDto postDto : res) {
            postDto.setLikes(likeService.getListLikesOfPost(postDto.getId()));
            postDto.setComments(commentService.getParentCommentsOfPost(postDto.getId()));
            postDto.setImages(postImageService.sortImage(postDto.getId()));
        }

        return res;
    }

    @Override
    public List<PostDto> adminPagingPost(SearchObject searchObject) {
        if (searchObject == null) return null;
        String keyword = insertPercent(searchObject.getKeyWord());

        List<PostDto> res = postRepository.adminPagingPost(keyword, PageRequest.of(searchObject.getPageIndex() - 1, searchObject.getPageSize()));

        for (PostDto postDto : res) {
            postDto.setLikes(likeService.getListLikesOfPost(postDto.getId()));
            postDto.setComments(commentService.getParentCommentsOfPost(postDto.getId()));
            postDto.setImages(postImageService.sortImage(postDto.getId()));
        }

        return res;
    }

    @Override
    public boolean isAdmin() {
        return userService.getCurrentLoginUserEntity().getUsername().equals("admin");
    }
}
