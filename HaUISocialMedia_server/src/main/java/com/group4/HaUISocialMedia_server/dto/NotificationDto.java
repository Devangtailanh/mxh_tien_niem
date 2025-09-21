package com.group4.HaUISocialMedia_server.dto;

import com.group4.HaUISocialMedia_server.entity.Notification;
import com.group4.HaUISocialMedia_server.entity.NotificationType;
import com.group4.HaUISocialMedia_server.entity.Post;
import com.group4.HaUISocialMedia_server.entity.User;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NotificationDto {
    private UUID id;
    private Date createDate;
    private String content;
    private NotificationTypeDto notificationType;
    private UserDto owner;
    private UserDto actor;
    private PostDto post;
    private GroupDto groupDto;

    public NotificationDto(Notification notification) {
        this.id = notification.getId();
        this.createDate = notification.getCreateDate();
        this.content = notification.getContent();
        if (notification.getNotificationType() != null)
            this.notificationType = new NotificationTypeDto(notification.getNotificationType());
        if (notification.getOwner() != null)
            this.owner = new UserDto(notification.getOwner());
        if(notification.getPost() != null)
            this.post = new PostDto(notification.getPost());

        if (notification.getActor() != null)
            this.actor = new UserDto(notification.getActor());

        if(notification.getGroup() != null)
            this.groupDto = new GroupDto(notification.getGroup());
    }
}
