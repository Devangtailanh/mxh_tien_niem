package com.group4.HaUISocialMedia_server.dto;

import com.group4.HaUISocialMedia_server.entity.Room;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class RoomDto {
    private UUID id;
    private String code;
    private String name;
    private String description;
    private Date createDate;
    private String avatar;
    private String color;
    private RoomTypeDto roomType;
    private List<UserDto> participants;
    private List<MessageDto> messages;

    public RoomDto(Room entity) {
        this.id = entity.getId();
        this.code = entity.getCode();
        this.name = entity.getName();
        this.description = entity.getDescription();
        this.createDate = entity.getCreateDate();
        this.avatar = entity.getAvatar();
        this.color = entity.getColor();
        if (entity.getRoomType() != null)
            this.roomType = new RoomTypeDto(entity.getRoomType());
    }
}
