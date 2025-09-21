package com.group4.HaUISocialMedia_server.dto;

import com.group4.HaUISocialMedia_server.entity.UserRoom;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.UUID;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserRoomDto {
    private UUID id;
    private UserDto user;
    private RoomDto room;
    private String role;
    private String nickName;
    private Date joinDate;

    public UserRoomDto(UserRoom entity) {
        this.id = entity.getId();
        if (entity.getUser() != null)
            this.user = new UserDto(entity.getUser());
        if (entity.getRoom() != null)
            this.room = new RoomDto(entity.getRoom());
        this.role = entity.getRole();
        this.nickName = entity.getNickName();
        this.joinDate = entity.getJoinDate();
    }
}
