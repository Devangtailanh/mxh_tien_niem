package com.group4.HaUISocialMedia_server.dto;

import com.group4.HaUISocialMedia_server.entity.Relationship;
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
public class RelationshipDto {

    private UUID id;

    private UserDto requestSender;

    private UserDto receiver;

    private Date lastModifyDate;

    private Boolean state; // 0 - is not friend yet, 1 - is friend

    private RoomDto room;

    public RelationshipDto(Relationship entity) {
        this.id = entity.getId();
        if (entity.getRequestSender() != null)
            this.requestSender = new UserDto(entity.getRequestSender());
        if (entity.getReceiver() != null)
            this.receiver = new UserDto(entity.getReceiver());
        this.lastModifyDate = entity.getLastModifyDate();
        this.state = entity.isState();
        if (entity.getRoom() != null)
            this.room = new RoomDto(entity.getRoom());
    }
}
