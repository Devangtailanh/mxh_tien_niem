package com.group4.HaUISocialMedia_server.dto;

import com.group4.HaUISocialMedia_server.entity.MessageType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MessageTypeDto {
    private UUID id;
    private String code;
    private String name;
    private String description;

    public MessageTypeDto(MessageType entity) {
        this.id = entity.getId();
        this.code = entity.getCode();
        this.name = entity.getName();
        this.description = entity.getDescription();
    }

}
