package com.group4.HaUISocialMedia_server.dto;

import com.group4.HaUISocialMedia_server.entity.RoomType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class RoomTypeDto {
    private UUID id;
    private String code;
    private String name;
    private String description;

    public RoomTypeDto(RoomType entity) {
        this.id = entity.getId();
        this.code = entity.getCode();
        this.description = entity.getDescription();
        this.name = entity.getName();
    }
}
