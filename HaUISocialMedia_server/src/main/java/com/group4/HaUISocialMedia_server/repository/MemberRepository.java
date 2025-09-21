package com.group4.HaUISocialMedia_server.repository;

import com.group4.HaUISocialMedia_server.entity.Group;
import com.group4.HaUISocialMedia_server.entity.Member;
import com.group4.HaUISocialMedia_server.entity.Relationship;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.UUID;

@Repository
public interface MemberRepository extends JpaRepository<Member, UUID> {

    @Query("SELECT u FROM Member u WHERE u.user.id = :userId and u.group.id = :groupId")
    public Member findUserGroup(@Param("userId") UUID userId, @Param("groupId") UUID groupId);

    @Query("SELECT m FROM Member m WHERE m.user.id = :userId AND m.group.id = :groupId and m.role = com.group4.HaUISocialMedia_server.entity.Role.ADMIN")
    public Member isAdminGroup(@Param("userId") UUID userId, @Param("groupId") UUID groupId);

    @Query("SELECT m FROM Member m WHERE m.user.id = :userId AND m.group.id = :groupId")
    public Member isEmpty(@Param("userId") UUID userId, @Param("groupId") UUID groupId);

    //get all user joined group
//    @Query("SELECT m FROM Member m WHERE m.group.id = :groupId and m.isApproved = true and m.user.id = :userId")
//    public List<Member> getAllUserJoinedGroup(@Param("groupId")UUID groupId, @Param("userId")UUID userId);

    //get all user waiting admin approve join group
    @Query("SELECT m FROM Member m WHERE m.group.id = :groupId and m.isApproved = false")
    public List<Member> getAllUserWaitJoinedGroup(@Param("groupId") UUID groupId);

    //get all user joined group
    @Query("SELECT m FROM Member m WHERE m.group.id = :groupId and m.isApproved = true")
    public List<Member> getAllUserJoinedGroup(@Param("groupId") UUID groupId);

    //get number user is admin in group
    @Query("SELECT m FROM Member m WHERE m.group.id = :groupId and m.role = com.group4.HaUISocialMedia_server.entity.Role.ADMIN")
    public List<Member> getNumberUserIsAdmin(@Param("groupId") UUID groupId);

    //get all joined groups of user
    @Query("SELECT m FROM Member m WHERE m.user.id = :userId and m.isApproved = true")
    public List<Member> getAllJoinedGroup(@Param("userId") UUID userId);

    //get list request wait admin approve of user
    @Query("SELECT g FROM Group g WHERE g.id NOT IN (:groups)")
    public List<Group> getAllGroupUserNotYetJoin(@Param("groups") List<UUID> groups);

    @Modifying
    @Transactional
    @Query("DELETE FROM Member m WHERE m.id = :memberId")
    public void removeById(@Param("memberId") UUID memberId);

    //    @Query("select m FROM Member m WHERE m.user.id = :userId and m.group.id = :groupId and m.isApproved = TRUE")
//
    // get all Groups that users admin
    @Query("SELECT m FROM Member m WHERE m.role = com.group4.HaUISocialMedia_server.entity.Role.ADMIN and m.user.id = :userId")
    public List<Member> getAllGroupUserIsAdmin(@PathVariable("userId") UUID userId);

    @Query("select m from Member m " +
            "where (m.user.id = :currentUserId and m.group.id = :groupId)")
    public Member getRelationshipBetweenCurrentUserAndGroup(@Param("currentUserId") UUID currentUserId, @Param("groupId") UUID groupId);

}
