package com.group4.HaUISocialMedia_server.service;

import com.group4.HaUISocialMedia_server.dto.SearchObject;
import com.group4.HaUISocialMedia_server.dto.UserCourseDto;
import com.group4.HaUISocialMedia_server.entity.UserCourse;

import java.util.List;
import java.util.Set;
import java.util.UUID;

public interface UserCourseService {
    public UserCourseDto getUserCourseById(UUID userCourseId);

    public UserCourseDto createUserCourse(UserCourseDto dto);

    public UserCourseDto updateUserCourse(UserCourseDto dto);

    public boolean deleteUserCourseById(UUID userCourseId);

    public List<UserCourseDto> getUserCourseOfUser(UUID userId);

    public List<UserCourseDto> getUserCourseByResult(UUID userId, UUID courseResultId);

    public UserCourseDto setIsValidGiveUserCourse(UUID userCourseId);

    public Set<UserCourseDto> getAllCourseAdminAllow(UUID userId);

    public Set<UserCourseDto> getAllCourseWaitAdminAllow(UUID userId);

    public Set<UserCourseDto> getAllUserCourseNotYetAllow(SearchObject searchObject);

}
