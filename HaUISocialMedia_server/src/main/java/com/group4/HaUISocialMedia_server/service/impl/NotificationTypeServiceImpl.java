package com.group4.HaUISocialMedia_server.service.impl;

import com.group4.HaUISocialMedia_server.dto.NotificationDto;
import com.group4.HaUISocialMedia_server.dto.NotificationTypeDto;
import com.group4.HaUISocialMedia_server.dto.SearchObject;
import com.group4.HaUISocialMedia_server.entity.NotificationType;
import com.group4.HaUISocialMedia_server.repository.NotificationTypeRepository;
import com.group4.HaUISocialMedia_server.service.NotificationTypeService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class NotificationTypeServiceImpl implements NotificationTypeService {

    @Autowired
    private NotificationTypeRepository notificationTypeRepository;

    @Override
    public Set<NotificationTypeDto> findAll() {
        Set<NotificationTypeDto> se = new HashSet<>();
        List<NotificationType> li = notificationTypeRepository.findAll();
        li.stream().map(x -> {
            NotificationTypeDto notificationTypeDto = new NotificationTypeDto(x);
            notificationTypeDto.setNotificationsDto(x.getNotifications().stream().map(NotificationDto::new).collect(Collectors.toSet()));
            return notificationTypeDto;
        }).forEach(se::add);
        return se;
    }

    @Override
    @Transactional
    public NotificationTypeDto save(NotificationTypeDto notificationTypeDto) {
        if(notificationTypeDto == null)
            return null;
        NotificationType notificationType = new NotificationType();

        notificationType.setCode(notificationTypeDto.getCode());
        notificationType.setName(notificationTypeDto.getName());
        notificationType.setDescription(notificationTypeDto.getDescription());

        //if(notificationTypeDto.getNotificationsDto() != null)
        //notificationType.setNotifications();
        return new NotificationTypeDto(notificationTypeRepository.save(notificationType));
    }

    @Override
    @Transactional
    public NotificationTypeDto update(NotificationTypeDto notificationTypeDto) {
        NotificationType notificationType = notificationTypeRepository.findById(notificationTypeDto.getId()).orElse(null);
        if(notificationType == null)
            return null;

        notificationType.setCode(notificationTypeDto.getCode());
        notificationType.setName(notificationTypeDto.getName());
        notificationType.setDescription(notificationTypeDto.getDescription());
//              if(notificationTypeDto.getNotificationsDto() != null)
//        notificationType.setNotifications(notificationTypeDto.getNotificationsDto().stream().map(NotificationDto::new));
        return new NotificationTypeDto(notificationTypeRepository.saveAndFlush(notificationType));
    }

    @Override
    @Transactional
    public Boolean delete(UUID id) {
        NotificationType notificationType = notificationTypeRepository.findById(id).orElse(null);
        if(notificationType == null)
            return false;
        notificationTypeRepository.delete(notificationType);
        return true;
    }

    @Override
    public Set<NotificationTypeDto> getAnyNotificationType(SearchObject searchObject) {
        Set<NotificationTypeDto> se = new HashSet<>();

        Page<NotificationType> li = notificationTypeRepository.findAll(PageRequest.of(searchObject.getPageIndex()-1, searchObject.getPageSize()));
        li.stream().map(NotificationTypeDto::new).forEach(se::add);
        return se;
    }

    @Override
    public NotificationTypeDto getNotificationTypeDtoEntityByName(String name) {
        return new NotificationTypeDto(notificationTypeRepository.findByName(name));
    }

    @Override
    public NotificationType getNotificationTypeEntityByName(String name) {
        return notificationTypeRepository.findByName(name);
    }
}
