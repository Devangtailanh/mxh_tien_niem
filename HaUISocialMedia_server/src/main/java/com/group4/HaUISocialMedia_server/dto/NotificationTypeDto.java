package com.group4.HaUISocialMedia_server.dto;

import com.group4.HaUISocialMedia_server.entity.Notification;
import com.group4.HaUISocialMedia_server.entity.NotificationType;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NotificationTypeDto {
    private UUID id;
    private String code;
    private String name;
    private String description;
    private Set<NotificationDto> notificationsDto;

    public NotificationTypeDto(NotificationType notificationType) {
        if (notificationType != null) {
            this.id = notificationType.getId();
            this.code = notificationType.getCode();
            this.name = notificationType.getName();
            this.description = notificationType.getDescription();
        }
    }
}
