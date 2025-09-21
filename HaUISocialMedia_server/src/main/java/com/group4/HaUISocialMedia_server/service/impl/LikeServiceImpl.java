package com.group4.HaUISocialMedia_server.service.impl;

import com.group4.HaUISocialMedia_server.dto.LikeDto;
import com.group4.HaUISocialMedia_server.dto.NotificationDto;
import com.group4.HaUISocialMedia_server.dto.NotificationTypeDto;
import com.group4.HaUISocialMedia_server.entity.*;
import com.group4.HaUISocialMedia_server.repository.LikeRepository;
import com.group4.HaUISocialMedia_server.repository.NotificationRepository;
import com.group4.HaUISocialMedia_server.repository.PostRepository;
import com.group4.HaUISocialMedia_server.service.LikeService;
import com.group4.HaUISocialMedia_server.service.NotificationService;
import com.group4.HaUISocialMedia_server.service.NotificationTypeService;
import com.group4.HaUISocialMedia_server.service.UserService;
import jakarta.transaction.Transactional;
import org.aspectj.weaver.ast.Not;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.*;

@Service
public class LikeServiceImpl implements LikeService {
    @Autowired
    private LikeRepository likeRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private NotificationTypeService notificationTypeService;

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @Override
    @Transactional
    public LikeDto likeAPost(UUID postId) {

        User user = userService.getCurrentLoginUserEntity();
        Post post = postRepository.getById(postId);

        Like like = new Like();
        like.setCreateDate(new Date());
        like.setUserLike(user);
        like.setPost(post);

        if (likeRepository.findByUserAndPost(postId, user.getId()) != null)
            return null;

        //Get the recipient notification
        //first check whether that notification for this post is existed or not
        User receiverUser = post.getOwner();
        if (!receiverUser.getId().equals(user.getId())) {
            List<Notification> oldNotifications = notificationRepository.getOldLikeNotification(receiverUser.getId(), postId);
            Notification oldNotification = null;
            if (oldNotifications != null && oldNotifications.size() > 0) oldNotification = oldNotifications.get(0);

            if (oldNotification == null) {
                //handle if this is the first person liking this post
                NotificationType notificationType = notificationTypeService.getNotificationTypeEntityByName("Post");

                Notification notification = new Notification();
                notification.setCreateDate(new Date());
                notification.setContent(user.getUsername() + " đã thích bài viết của bạn");
                notification.setActor(user);
                notification.setPost(post);
                notification.setOwner(receiverUser);
                notification.setNotificationType(notificationType);

                Notification savedNotiEntity = notificationRepository.save(notification);
                NotificationDto noti = new NotificationDto(savedNotiEntity);
                //send this noti via socket
                simpMessagingTemplate.convertAndSendToUser(receiverUser.getId().toString(), "/notification", noti);
            } else {
                //handle case notification announcing this post has been liked by other users before
                oldNotification.setActor(user);
                int numsOfOldLikes = getListLikesOfPost(postId).size();
                oldNotification.setContent(user.getUsername() + " và " + numsOfOldLikes + " người khác đã thích bài viết của bạn: " + post.getContent());
                oldNotification.setCreateDate(new Date());

                Notification savedNotiEntity = notificationRepository.save(oldNotification);
                NotificationDto noti = new NotificationDto(savedNotiEntity);
                //send this noti via socket
                simpMessagingTemplate.convertAndSendToUser(receiverUser.getId().toString(), "/notification", noti);
            }
        }


        return new LikeDto(likeRepository.save(like));
    }

    @Override
    public Set<LikeDto> getListLikesOfPost(UUID postId) {
        Set<LikeDto> res = new HashSet<>();
        List<Like> li = likeRepository.findByPost(postId);
        li.stream().map(LikeDto::new).forEach(res::add);
        return res;
    }

    @Override
    @Transactional
    @Modifying
    public boolean dislikeAPost(UUID postId) {
        User user = userService.getCurrentLoginUserEntity();
        Post post = postRepository.findById(postId).orElse(null);
        if (post == null)
            return false;

        if (likeRepository.findByUserAndPost(postId, user.getId()) == null)
            return false;

        likeRepository.deleteByIdPost(postId, user.getId());

        List<Notification> oldNotifications = notificationRepository.getOldLikeNotification(post.getOwner().getId(), postId);
        Notification oldNotification = null;
        if (oldNotifications != null && oldNotifications.size() > 0) oldNotification = oldNotifications.get(0);

        if (oldNotification != null) {
            //handling for notification
            int numsOfOldLikes = getListLikesOfPost(postId).size();
            if (numsOfOldLikes == 0) {

                // only one person likes this post, this person dislikes the post, then the notification for this post of owner will be deleted
                notificationRepository.delete(oldNotification);
            } else {
                // update content of old notification, just -1 numsOfLikes for the post
                oldNotification.setCreateDate(new Date());
                List<Like> likesOfPost = likeRepository.findByPost(postId);
                // but we have to find who is the latest user like the post for updating the noti content
                if (!likesOfPost.isEmpty()) {
                    oldNotification.setContent(likesOfPost.get(0).getUserLike().getUsername() + " và " + (likesOfPost.size() - 1)
                            + " người khác đã thích bài viết của bạn: " + post.getContent());

                    //handle for case only 1 remaining person like this post
                    if (likesOfPost.size() - 1 == 0) {
                        oldNotification.setContent(likesOfPost.get(0).getUserLike().getUsername()
                                + " đã thích bài viết của bạn: " + post.getContent());
                    }
                    oldNotification.setActor(likesOfPost.get(0).getUserLike());

                    notificationRepository.save(oldNotification);
                }

            }
        }

        return true;
    }
}
