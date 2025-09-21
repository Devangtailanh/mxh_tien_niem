package com.group4.HaUISocialMedia_server.dto;

import com.group4.HaUISocialMedia_server.entity.Course;
import com.group4.HaUISocialMedia_server.entity.CourseResult;
import com.group4.HaUISocialMedia_server.entity.User;
import com.group4.HaUISocialMedia_server.entity.UserCourse;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserCourseDto {
    private UUID id;
    private UserDto user;
    private CourseDto course;
    private CourseResultDto courseResult;
    private Double score;
    private Date modifyDate;
    private Boolean isValidated;

        public UserCourseDto(UserCourse entity) {
             if (entity != null) {
                 this.id = entity.getId();
            if (entity.getUser() != null)
                this.user = new UserDto(entity.getUser());
            if (entity.getCourseResult() != null)
                this.courseResult = new CourseResultDto(entity.getCourseResult());
            if (entity.getCourse() != null)
                this.course = new CourseDto(entity.getCourse());
            this.score = entity.getScore();
            this.modifyDate = entity.getModifyDate();
            this.isValidated = entity.getIsValidated();
        }
    }
}
