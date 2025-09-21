package com.group4.HaUISocialMedia_server.dto;

import com.group4.HaUISocialMedia_server.entity.BoardRecord;
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
public class BoardRecordDto {
    private UUID id;

    private UserDto user;

    private Integer numsOfA;

    private Integer numsOfBPlus;

    private Integer numsOfB;

    private Integer numsOfCPlus;

    private Integer numsOfC;

    private Integer numsOfDPlus;

    private Integer numsOfD;

    private Integer numsOfF;

    private Float averageScore;

    private Integer totalObject;

    private Date lastModifyDate;

    public BoardRecordDto(BoardRecord entity) {
        if (entity != null) {
            this.id = entity.getId();
            if (entity.getUser() != null) this.user = new UserDto(entity.getUser());
            this.numsOfA = entity.getNumsOfA();
            this.numsOfB = entity.getNumsOfB();
            this.numsOfBPlus = entity.getNumsOfBPlus();
            this.numsOfC = entity.getNumsOfC();
            this.numsOfCPlus = entity.getNumsOfCPlus();
            this.numsOfD = entity.getNumsOfC();
            this.numsOfDPlus = entity.getNumsOfCPlus();
            this.numsOfF = entity.getNumsOfF();
            this.averageScore = entity.getAverageScore();
            this.lastModifyDate = entity.getLastModifyDate();
        }
    }
}
