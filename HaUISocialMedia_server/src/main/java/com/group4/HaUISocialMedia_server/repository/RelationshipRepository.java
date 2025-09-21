package com.group4.HaUISocialMedia_server.repository;

import com.group4.HaUISocialMedia_server.entity.Like;
import com.group4.HaUISocialMedia_server.entity.Relationship;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface RelationshipRepository extends JpaRepository<Relationship, UUID> {
    @Query( "select r from Relationship r where (r.requestSender.id = :currentUserId or r.receiver.id = :currentUserId) and r.state = true order by r.lastModifyDate desc")
    List<Relationship> findAllAcceptedRelationship(@Param("currentUserId") UUID currentUserId);

    @Query( "select r from Relationship r where (r.receiver.id = :currentUserId) and r.state = false order by r.lastModifyDate desc")
    List<Relationship> findAllPendingRelationship(@Param("currentUserId") UUID currentUserId, Pageable pageable);

    @Query( "select r from Relationship r where (r.requestSender.id = :currentUserId) and r.state = false order by r.lastModifyDate desc")
    List<Relationship> findAllSentFriendRequestRelationship(@Param("currentUserId") UUID currentUserId, Pageable pageable);

    @Query("select r from Relationship r " +
            "where (r.requestSender.id = :currentUserId and r.receiver.id = :viewingUserId) " +
            "or (r.requestSender.id = :viewingUserId and r.receiver.id = :currentUserId) order by r.lastModifyDate desc")
    List<Relationship> getRelationshipBetweenCurrentUserAndViewingUser(@Param("currentUserId") UUID currentUserId, @Param("viewingUserId") UUID viewingUserId);
}
