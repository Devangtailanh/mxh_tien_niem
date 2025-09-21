package com.group4.HaUISocialMedia_server.service.impl;

import com.group4.HaUISocialMedia_server.dto.MessageTypeDto;
import com.group4.HaUISocialMedia_server.entity.MessageType;
import com.group4.HaUISocialMedia_server.repository.MessageTypeRepository;
import com.group4.HaUISocialMedia_server.service.MessageTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class MessageTypeServiceImpl implements MessageTypeService {
    @Autowired
    private MessageTypeRepository messageTypeRepository;

    @Override
    public Set<MessageTypeDto> getAllMessageTypes() {
        List<MessageType> entities = (ArrayList<MessageType>) messageTypeRepository.findAll();
        Set<MessageTypeDto> res = new HashSet<>();
        for (MessageType entity : entities) {
            res.add(new MessageTypeDto(entity));
        }
        return res;
    }

    @Override
    public MessageTypeDto createMessageType(MessageTypeDto dto) {
        if (dto == null)
            return null;
        MessageType entity = new MessageType();

        entity.setCode(dto.getCode());
        entity.setName(dto.getName());
        entity.setDescription(dto.getDescription());

        MessageType responseEntity = messageTypeRepository.save(entity);
        if (responseEntity == null) return null;
        return new MessageTypeDto(responseEntity);
    }

    @Override
    public MessageTypeDto updateMessageType(MessageTypeDto dto) {
        if (dto == null)
            return null;

        MessageType entity = messageTypeRepository.findById(dto.getId()).orElse(null);
        if (entity == null) return null;

        entity.setCode(dto.getCode());
        entity.setName(dto.getName());
        entity.setDescription(dto.getDescription());

        MessageType responseEntity = messageTypeRepository.save(entity);
        if (responseEntity == null) return null;
        return new MessageTypeDto(responseEntity);
    }

    @Override
    public void deleteMessageType(UUID MessageTypeId) {
        MessageType entity = messageTypeRepository.findById(MessageTypeId).orElse(null);
        if (entity == null) return;
        messageTypeRepository.delete(entity);
    }

    @Override
    public MessageTypeDto getMessageTypeById(UUID MessageTypeId) {
        MessageType entity = messageTypeRepository.findById(MessageTypeId).orElse(null);
        if (entity == null) return null;
        return new MessageTypeDto(entity);
    }

    @Override
    public MessageType getMessageTypeEntityByName(String messageTypeName) {
        return messageTypeRepository.findByName(messageTypeName);
    }

    @Override
    public MessageTypeDto getMessageTypeByName(String messageTypeName) {
        return new MessageTypeDto(getMessageTypeEntityByName(messageTypeName));
    }
}
