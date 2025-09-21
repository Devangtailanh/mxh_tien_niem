package com.group4.HaUISocialMedia_server.service.impl;

import com.group4.HaUISocialMedia_server.dto.RoomTypeDto;
import com.group4.HaUISocialMedia_server.entity.RoomType;
import com.group4.HaUISocialMedia_server.repository.RoomTypeRepository;
import com.group4.HaUISocialMedia_server.service.RoomTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class RoomTypeServiceImpl implements RoomTypeService {
    @Autowired
    private RoomTypeRepository roomTypeRepository;

    @Override
    public Set<RoomTypeDto> getAllRoomTypes() {
        List<RoomType> entities = (ArrayList<RoomType>) roomTypeRepository.findAll();
        Set<RoomTypeDto> res = new HashSet<>();
        for (RoomType entity : entities) {
            res.add(new RoomTypeDto(entity));
        }
        return res;
    }

    @Override
    public RoomTypeDto createRoomType(RoomTypeDto dto) {
        if (dto == null)
            return null;
        RoomType entity = new RoomType();

        entity.setCode(dto.getCode());
        entity.setName(dto.getName());
        entity.setDescription(dto.getDescription());

        RoomType responseEntity = roomTypeRepository.save(entity);
        if (responseEntity == null) return null;
        return new RoomTypeDto(responseEntity);
    }

    @Override
    public RoomTypeDto updateRoomType(RoomTypeDto dto) {
        if (dto == null)
            return null;

        RoomType entity = roomTypeRepository.findById(dto.getId()).orElse(null);
        if (entity == null) return null;

        entity.setCode(dto.getCode());
        entity.setName(dto.getName());
        entity.setDescription(dto.getDescription());

        RoomType responseEntity = roomTypeRepository.save(entity);
        if (responseEntity == null) return null;
        return new RoomTypeDto(responseEntity);
    }

    @Override
    public void deleteRoomType(UUID roomTypeId) {
        RoomType entity = roomTypeRepository.findById(roomTypeId).orElse(null);
        if (entity == null) return;
        roomTypeRepository.delete(entity);
    }

    @Override
    public RoomTypeDto getRoomTypeById(UUID roomTypeId) {
        RoomType entity = roomTypeRepository.findById(roomTypeId).orElse(null);
        if (entity == null) return null;
        return new RoomTypeDto(entity);
    }

    @Override
    public RoomType getRoomTypeEntityByName(String roomTypeName) {
        return roomTypeRepository.findByName(roomTypeName);
    }

    @Override
    public RoomType getRoomTypeEntityById(UUID roomTypeId) {
        return roomTypeRepository.findById(roomTypeId).orElse(null);
    }
}
