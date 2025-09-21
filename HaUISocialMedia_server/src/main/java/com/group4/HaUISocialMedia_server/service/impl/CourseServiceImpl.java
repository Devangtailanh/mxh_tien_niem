package com.group4.HaUISocialMedia_server.service.impl;

import com.group4.HaUISocialMedia_server.dto.CourseDto;
import com.group4.HaUISocialMedia_server.dto.SearchObject;
import com.group4.HaUISocialMedia_server.dto.UserCourseDto;
import com.group4.HaUISocialMedia_server.entity.Course;
import com.group4.HaUISocialMedia_server.repository.CourseRepository;
import com.group4.HaUISocialMedia_server.service.CourseService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class CourseServiceImpl implements CourseService {

    @Autowired
    private CourseRepository courseRepository;

    @Override
    public Set<CourseDto> findAll() {
        List<Course> li = courseRepository.findAll();
        Set<CourseDto> se = new HashSet<>();
        li.stream().map(x -> {
            CourseDto newCourse = new CourseDto(x);
            if(x.getUserCourses() != null)
                newCourse.setUserCourses(x.getUserCourses().stream().map(UserCourseDto::new).collect(Collectors.toSet()));
            return newCourse;
        }).forEach(se::add);

        return se;
    }

    @Override
    @Transactional
    public CourseDto save(CourseDto courseDto) {
        if(courseDto == null)
            return null;
        Course course = new Course();

        course.setCode(courseDto.getCode());
        course.setName(courseDto.getName());
        course.setDescription(courseDto.getDescription());

        Course course1 = courseRepository.save(course);
        return new CourseDto(course1);
    }

    @Override
    @Transactional
    public CourseDto update(CourseDto courseDto) {
        Course course = courseRepository.findById(courseDto.getId()).orElse(null);
        if(course == null)
            return null;

        course.setCode(courseDto.getCode());
        course.setName(courseDto.getName());
        course.setDescription(courseDto.getDescription());

        return new CourseDto(courseRepository.saveAndFlush(course));
    }

    @Override
    @Transactional
    public void deleteById(UUID id) {
        Course course = courseRepository.findById(id).orElse(null);
        if(course == null)
            return;
        courseRepository.delete(course);
    }

    @Override
    public Set<CourseDto> pagingCourses(SearchObject searchObject) {
        Set<CourseDto> se = new HashSet<>();
        Page<Course> li = courseRepository.findAll(PageRequest.of(searchObject.getPageIndex()-1, searchObject.getPageSize()));
        li.stream().map(CourseDto::new).forEach(se::add);
        return se;
    }

    @Override
    public CourseDto getById(UUID id) {
        return new CourseDto(Objects.requireNonNull(courseRepository.findById(id).orElse(null)));
    }
}
