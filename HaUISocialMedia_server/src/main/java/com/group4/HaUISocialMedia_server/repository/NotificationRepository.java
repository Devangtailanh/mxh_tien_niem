package com.group4.HaUISocialMedia_server.repository;

import com.group4.HaUISocialMedia_server.entity.Notification;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, UUID> {

    @Query("SELECT n FROM Notification n where n.owner.id =:idOwner order by n.createDate desc")
    public List<Notification> findAllByUser(@Param("idOwner") UUID id);

    @Query("SELECT n FROM Notification n where n.owner.id =:idOwner order by n.createDate desc")
    public List<Notification> pagingNotificationByUserId(@Param("idOwner") UUID id, Pageable pageable);

    @Query("select n from Notification n where n.owner.id = :currentUserId and n.notificationType.name like 'Post' and n.post.id = :postId")
    public List<Notification> getOldLikeNotification(@Param("currentUserId") UUID currentUserId, @Param("postId") UUID postId);

    @Modifying
    @Transactional
    @Query("DELETE FROM Notification n WHERE n.post.id =:idPost")
    public void deleteNotificationByIdPost(@Param("idPost") UUID idPost);

    @Modifying
    @Transactional
    @Query("DELETE FROM Notification n WHERE  n.notificationType.code like '002' AND  n.owner.id = :OwnerId AND n.actor.id = :ActorId")
    public void deleteNotificationAddFriendByIdUser(@Param("OwnerId") UUID OwnerId, @Param("ActorId") UUID ActorId);

    @Modifying
    @Transactional
    @Query("DELETE FROM Notification n WHERE n.notificationType.code like '002' AND n.owner.id = :OwnerId AND n.actor.id = :ActorId")
    public void deleteNotificationAcceptFriendByIdUser(@Param("OwnerId") UUID OwnerId, @Param("ActorId") UUID ActorId);

}
