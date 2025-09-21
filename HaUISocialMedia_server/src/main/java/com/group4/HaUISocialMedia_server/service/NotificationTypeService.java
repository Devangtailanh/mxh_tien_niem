package com.group4.HaUISocialMedia_server.service;


import com.group4.HaUISocialMedia_server.dto.NotificationTypeDto;
import com.group4.HaUISocialMedia_server.dto.SearchObject;
import com.group4.HaUISocialMedia_server.entity.NotificationType;

import java.util.Set;
import java.util.UUID;

public interface NotificationTypeService {

    public Set<NotificationTypeDto> findAll();

    public NotificationTypeDto save(NotificationTypeDto notificationTypeDto);

    public NotificationTypeDto update(NotificationTypeDto notificationTypeDto);

    public Boolean delete(UUID id);

    public Set<NotificationTypeDto> getAnyNotificationType(SearchObject searchObject);

    public NotificationTypeDto getNotificationTypeDtoEntityByName(String name);

    public NotificationType getNotificationTypeEntityByName(String name);
}
