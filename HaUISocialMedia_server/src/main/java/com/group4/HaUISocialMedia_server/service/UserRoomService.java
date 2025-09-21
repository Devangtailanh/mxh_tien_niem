package com.group4.HaUISocialMedia_server.service;

import com.group4.HaUISocialMedia_server.dto.UserRoomDto;
import com.group4.HaUISocialMedia_server.entity.UserRoom;

import java.util.UUID;

public interface UserRoomService {
    public UserRoomDto createUserRoom(UserRoomDto dto);

    public UserRoom createUserRoomEntity(UserRoomDto dto);

    public UserRoomDto updateUserRoom(UserRoomDto dto);

    public void deleteUserRoom(UUID userRoomId);
}
