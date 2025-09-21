package com.group4.HaUISocialMedia_server.rest;

import com.group4.HaUISocialMedia_server.dto.*;
import com.group4.HaUISocialMedia_server.entity.Group;
import com.group4.HaUISocialMedia_server.entity.Member;
import com.group4.HaUISocialMedia_server.service.GroupService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.Set;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/group")
public class GroupController {

    @Autowired
    private GroupService groupService;

    @PostMapping("")
    public ResponseEntity<GroupDto> createNewGroup(@RequestBody GroupDto newGroup){
        GroupDto groupDto = groupService.createGroup(newGroup);
        if(groupDto == null)
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(groupDto, HttpStatus.OK);
    }

    @GetMapping("/{groupId}")
    public ResponseEntity<GroupDto> findById(@PathVariable UUID groupId){
        GroupDto groupDto = groupService.findById(groupId);
        if(groupDto == null)
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(groupDto, HttpStatus.OK);
    }

    @PutMapping("")
    @Transactional
    public ResponseEntity<GroupDto> updateGroup(@RequestBody GroupDto groupDto){
        if(!groupService.isAdminGroup(groupDto.getId()))
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        GroupDto groupDto1 = groupService.updateGroup(groupDto);
        if(groupDto1 == null)
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(groupDto1, HttpStatus.OK);
    }

    @DeleteMapping("/{groupId}")
    @Transactional
    public ResponseEntity<Boolean> deleteGroup(@PathVariable UUID groupId){
        return !groupService.isAdminGroup(groupId) ? new ResponseEntity<>(false, HttpStatus.UNAUTHORIZED)
                : (groupService.deleteGroup(groupId) ? new ResponseEntity<>(true, HttpStatus.OK)
                : new ResponseEntity<>(false, HttpStatus.BAD_REQUEST));
    }

    @GetMapping("/join-request/{groupId}")
    public ResponseEntity<MemberDto> joinGroupRequest(@PathVariable UUID groupId){
        MemberDto memberDto = groupService.joinGroupRequest(groupId);
        if(memberDto == null)
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(memberDto, HttpStatus.OK);
    }

    @GetMapping("/approve-request-join/{memberId}")
    public ResponseEntity<MemberDto> approveRequestJoin(@PathVariable UUID memberId){
        GroupDto group = groupService.findGroupByMember(memberId);
        if(!groupService.isAdminGroup(group.getId()))
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        MemberDto memberDto = groupService.approvedJoinGroupRequest(memberId);
        if(memberDto != null)
            return new ResponseEntity<>(memberDto, HttpStatus.OK);
        return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("/cancel-request-join/{memberId}")
    public ResponseEntity<Boolean> cancelRequestJoin(@PathVariable("memberId") UUID memberId){
        GroupDto groupDto = groupService.findGroupByMember(memberId);
        if(!groupService.isAdminGroup(groupDto.getId()))
            return new ResponseEntity<>(false, HttpStatus.UNAUTHORIZED);
        return groupService.cancelJoinGroupRequest(memberId) ? new ResponseEntity<>(true, HttpStatus.OK) : new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("/leave-group/{groupId}")
    public ResponseEntity<Boolean> leaveGroup(@PathVariable("groupId") UUID groupId){
        if(groupService.leaveGroup(groupId))
            return new ResponseEntity<>(true, HttpStatus.OK);
        return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/get-all-joined-group/{userId}")
    public ResponseEntity<Set<GroupDto>> getAllJoinedGroupOfUser(@PathVariable UUID userId){
        Set<GroupDto> res = groupService.getAllJoinedGroupOfUser(userId);
//        if(res.isEmpty())
//            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @GetMapping("/search-name/{name}")
    public ResponseEntity<Set<GroupDto>> searchByName(@PathVariable("name") String name){
        Set<GroupDto> res = groupService.searchGroupByName(name);
//        if(res.isEmpty())
//            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @GetMapping("/duty-admin/{memberId}")
    public ResponseEntity<MemberDto> dutyAdmin(@PathVariable UUID memberId){
        if(!groupService.isAdminGroup(groupService.findGroupByMember(memberId).getId()))
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        MemberDto memberDto = groupService.dutyAdmin(memberId);
//        if(memberDto == null)
//            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(memberDto, HttpStatus.OK);
    }

    @GetMapping("/cancel-duty-admin/{memberId}")
    public ResponseEntity<Boolean> cancelDutyAdmin(@PathVariable UUID memberId){
        if(!groupService.isAdminGroup(groupService.findGroupByMember(memberId).getId()))
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        if(groupService.cancelDutyAdmin(memberId))
            return new ResponseEntity<>(true, HttpStatus.OK);
        return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/get-all-wait/{groupId}")
    public ResponseEntity<Set<MemberDto>> getAllWaitRequest(@PathVariable UUID groupId){
        if(!groupService.isAdminGroup(groupId))
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        Set<MemberDto> res = groupService.getAllUserWaitJoinedGroup(groupId);
//        if(res.isEmpty())
//            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @DeleteMapping("/delete-member/{memberId}")
    public ResponseEntity<Boolean> kickMember(@PathVariable UUID memberId){
        GroupDto group = groupService.findGroupByMember(memberId);
        if(!groupService.isAdminGroup(group.getId()))
            return new ResponseEntity<>(false, HttpStatus.UNAUTHORIZED);
        return groupService.kickUserLeaveFGroup(memberId) ? new ResponseEntity<>(true, HttpStatus.OK) : new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/check-user-join-group/{groupId}")
    public ResponseEntity<Boolean> isJoinGroup(@PathVariable UUID groupId){
        return groupService.isJoinedGroup(groupId) ? new ResponseEntity<>(true, HttpStatus.OK) : new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/get-all-group-user-is-admin")
    public ResponseEntity<Set<GroupDto>> getAllGroupUserIsAdmin(){
        Set<GroupDto> res = groupService.getAllGroupUserIsAdmin();
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @GetMapping("/get-all-group-user-not-yet-join")
    public ResponseEntity<Set<GroupDto>> getAllGroupUserNotYeJoin(){
        Set<GroupDto> res = groupService.getAllGroupUserNotYetJoin();
        return res == null ? new ResponseEntity<>(null, HttpStatus.BAD_REQUEST) : new ResponseEntity<>(res, HttpStatus.OK);
    }

    @GetMapping("/get-all-user-of-group/{groupId}")
    public ResponseEntity<GetAllUserOfGroupDto> getAllUserOfGroup(@PathVariable("groupId")UUID id){
        if(!groupService.isAdminGroup(id))
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        Set<MemberDto> getAllUserJoined = groupService.getAllUserJoinedGroup(id);
        Set<MemberDto> getAllUserWaitJoin = groupService.getAllUserWaitJoinedGroup(id);

        GetAllUserOfGroupDto newGetAllUserOfGroupDto = new GetAllUserOfGroupDto(getAllUserJoined, getAllUserWaitJoin);
        return new ResponseEntity<>(newGetAllUserOfGroupDto, HttpStatus.OK);
    }

    @GetMapping("/find-post-in-group/{groupId}/{content}")
    public ResponseEntity<Set<PostDto>> findPostInGroup(@PathVariable("groupId")UUID groupId, @PathVariable("content")String content){
        Set<PostDto> res = groupService.findPostInGroup(content, groupId);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @GetMapping("/get-all-post-in-group/{groupId}")
    public ResponseEntity<Set<PostDto>> getAllPostInGroup(@PathVariable UUID groupId){
        return new ResponseEntity<>(groupService.findAllPostByGroup(groupId), HttpStatus.OK);
    }

    @PostMapping("/get-all-post-of-all-group")
    public ResponseEntity<Set<PostDto>> getAllPostOfAllGroup(@RequestBody SearchObject searchObject){
        return new ResponseEntity<>(groupService.getAllPostByAllGroup(searchObject), HttpStatus.OK);
    }
}
