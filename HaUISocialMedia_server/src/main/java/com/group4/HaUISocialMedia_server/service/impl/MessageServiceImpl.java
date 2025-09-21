package com.group4.HaUISocialMedia_server.service.impl;

import com.group4.HaUISocialMedia_server.dto.*;
import com.group4.HaUISocialMedia_server.entity.*;
import com.group4.HaUISocialMedia_server.repository.MessageRepository;
import com.group4.HaUISocialMedia_server.repository.RoomRepository;
import com.group4.HaUISocialMedia_server.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.security.interfaces.RSAKey;
import java.util.*;

@Service
public class MessageServiceImpl implements MessageService {
    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private MessageRepository messageRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private MessageTypeService messageTypeService;
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;
    @Autowired
    private RoomService roomService;

    @Autowired
    private NotificationTypeService notificationTypeService;

    @Override
    public List<MessageDto> findTop20PreviousByMileStone(SearchObject searchObject) {
        if (searchObject == null) return null;
        if (searchObject.getMileStoneId() == null) return null;

        Message mileStone = messageRepository.findById(searchObject.getMileStoneId()).orElse(null);
        if (mileStone == null) return null;

        List<MessageDto> data = messageRepository.findTop10ByRoomAndSendDateBeforeOrderBySendDateDesc(mileStone.getRoom().getId(), mileStone.getSendDate(), PageRequest.of(0, 20));
        List<MessageDto> res = new ArrayList<>();
        for (int i = data.size() - 1; i >= 0; i--) {
            res.add(data.get(i));
        }
        return res;
    }

    @Override
    public Set<MessageDto> getAllMessagesByRoomId(UUID roomId) {
        return messageRepository.getAllMessagesByRoomId(roomId);
    }

    @Override
    public List<MessageDto> get20LatestMessagesByRoomId(UUID roomId) {
        List<MessageDto> data = messageRepository.get20LatestMessagesByRoomId(roomId, PageRequest.of(0, 20));
        List<MessageDto> res = new ArrayList<>();
        for (int i = data.size() - 1; i >= 0; i--) {
            res.add(data.get(i));
        }
        return res;
    }

    @Override
    public boolean isInRoomChat(MessageDto messageDTO) {
        if (messageDTO.getUser() == null) return false;
        User currentUser = userService.getUserEntityById(messageDTO.getUser().getId());

        Room roomEntity = roomRepository.findById(messageDTO.getRoom().getId()).orElse(null);
        if (roomEntity == null) return false;

        for (UserRoom userRoom : roomEntity.getUserRooms()) {
            if (userRoom.getUser().getId().equals(currentUser.getId())) return true;
        }

        return false;
    }

    @Override
    public MessageDto sendMessage(MessageDto dto) {
        if (!isInRoomChat(dto)) return null;

        //create new message entity first
        Message entity = new Message();
        entity.setContent(dto.getContent());

        if (dto.getMessageType() == null) {
            MessageType messageType = messageTypeService.getMessageTypeEntityByName("chat");
            entity.setMessageType(messageType);
        } else {
            MessageType messageType = messageTypeService.getMessageTypeEntityByName(dto.getMessageType().getName());
            entity.setMessageType(messageType);
        }

        Room room = roomRepository.findById(dto.getRoom().getId()).orElse(null);
        if (room == null) return null;
        entity.setRoom(room);

        User currentUser = userService.getUserEntityById(dto.getUser().getId());
        if (currentUser == null) return null;
        entity.setUser(currentUser);

        entity.setSendDate(new Date());

        Message savedMessage = messageRepository.save(entity);
        if (savedMessage == null) return null;

        List<UserDto> userInRooms = roomService.getAllJoinedUsersByRoomId(savedMessage.getRoom().getId());

        //send message for all users
        MessageDto messageDto = new MessageDto(savedMessage);
        for (UserDto userDto : userInRooms) {
            simpMessagingTemplate.convertAndSendToUser(userDto.getId().toString(), "/privateMessage", messageDto);
        }

        //send notification for all users that they've received new message in messenger module
        NotificationDto notification = new NotificationDto();
        notification.setActor(new UserDto(currentUser));
        notification.setCreateDate(new Date());
        NotificationType messageNotiType = notificationTypeService.getNotificationTypeEntityByName("Chat");
        if (messageNotiType != null) {
            notification.setNotificationType(new NotificationTypeDto(messageNotiType));
        }

        for (UserDto userDto : userInRooms) {

            notification.setContent(currentUser.getUsername() + " đã gửi một tin nhắn");

            if (userInRooms.size() == 2) notification.setContent(notification.getContent() + " cho bạn");
            else notification.setContent(notification.getContent() + " đến cuộc hội thoại nhóm");

            simpMessagingTemplate.convertAndSendToUser(userDto.getId().toString(), "/notification", notification);
        }

        return messageDto;
    }
}
