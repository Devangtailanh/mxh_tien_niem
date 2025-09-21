package com.group4.HaUISocialMedia_server.service;

import com.group4.HaUISocialMedia_server.dto.CourseResultDto;
import com.group4.HaUISocialMedia_server.dto.SearchObject;

import java.util.List;
import java.util.Set;
import java.util.UUID;

public interface CourseResultService {
    public Set<CourseResultDto> pagingCourseResult(SearchObject searchObject);

    public CourseResultDto addOne(CourseResultDto courseResultDto);

    public CourseResultDto findById(UUID id);

    public void deleteById(UUID id);

    public CourseResultDto update(CourseResultDto courseResultDto);

    public List<CourseResultDto> getAllCourseResult();
}
