package com.group4.HaUISocialMedia_server.service;

import com.group4.HaUISocialMedia_server.dto.CourseDto;
import com.group4.HaUISocialMedia_server.dto.SearchObject;

import java.util.Set;
import java.util.UUID;

public interface CourseService {

    public Set<CourseDto> findAll();

    public CourseDto save(CourseDto courseDto);

    public CourseDto update(CourseDto courseDto);

    public void deleteById(UUID id);

    public Set<CourseDto> pagingCourses(SearchObject searchObject);

    public CourseDto getById(UUID id);
}
