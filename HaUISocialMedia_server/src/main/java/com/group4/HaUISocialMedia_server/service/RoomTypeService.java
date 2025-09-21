package com.group4.HaUISocialMedia_server.service;

import com.group4.HaUISocialMedia_server.dto.RoomTypeDto;
import com.group4.HaUISocialMedia_server.entity.RoomType;

import java.util.Set;
import java.util.UUID;

public interface RoomTypeService {
    public Set<RoomTypeDto> getAllRoomTypes();

    public RoomTypeDto createRoomType(RoomTypeDto dto);

    public RoomTypeDto updateRoomType(RoomTypeDto dto);

    public void deleteRoomType(UUID roomTypeId);

    public RoomTypeDto getRoomTypeById(UUID roomTypeId);

    public RoomType getRoomTypeEntityByName(String roomTypeName);

    public RoomType getRoomTypeEntityById(UUID roomTypeId);
}
