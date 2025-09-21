package com.group4.HaUISocialMedia_server.dto;

import com.group4.HaUISocialMedia_server.entity.Course;
import com.group4.HaUISocialMedia_server.entity.UserCourse;
import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CourseDto {

    private UUID id;
    private String code;
    private String name;
    private String description;
    private Set<UserCourseDto> userCourses;

    public CourseDto(Course course){
        this.id = course.getId();
        this.code = course.getCode();
        this.name = course.getName();
        this.description = course.getDescription();
//        if(course.getUserCourses() != null && !course.getUserCourses().isEmpty()){
//            this.userCourses = new HashSet<>();
//            course.getUserCourses().stream().map(UserCourseDto::new).forEach(this.userCourses::add);
//        }
    }
}
