package com.group4.HaUISocialMedia_server.dto;

import com.group4.HaUISocialMedia_server.entity.CourseResult;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;
import java.util.UUID;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CourseResultDto {
    private UUID id;
    private String code;
    private String name;
    private String description;

    public CourseResultDto(CourseResult entity) {
        this.id = entity.getId();
        this.code = entity.getCode();
        this.name = entity.getName();
        this.description = entity.getDescription();
    }

}
