package com.group4.HaUISocialMedia_server.service;

import com.group4.HaUISocialMedia_server.dto.MessageTypeDto;
import com.group4.HaUISocialMedia_server.entity.MessageType;

import java.util.Set;
import java.util.UUID;

public interface MessageTypeService {
    public Set<MessageTypeDto> getAllMessageTypes();

    public MessageTypeDto createMessageType(MessageTypeDto dto);

    public MessageTypeDto updateMessageType(MessageTypeDto dto);

    public void deleteMessageType(UUID MessageTypeId);

    public MessageTypeDto getMessageTypeById(UUID MessageTypeId);

    public MessageType getMessageTypeEntityByName(String messageTypeName);

    public MessageTypeDto getMessageTypeByName(String messageTypeName);
}
