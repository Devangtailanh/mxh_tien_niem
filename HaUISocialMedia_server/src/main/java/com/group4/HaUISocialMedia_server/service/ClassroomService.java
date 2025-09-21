package com.group4.HaUISocialMedia_server.service;


import com.group4.HaUISocialMedia_server.dto.ClassroomDto;
import com.group4.HaUISocialMedia_server.dto.SearchObject;
import com.group4.HaUISocialMedia_server.entity.User;

import java.util.Set;
import java.util.UUID;

public interface ClassroomService {

    public Set<ClassroomDto> getAllClassroom();

    public ClassroomDto save(ClassroomDto classroomDto);

    public ClassroomDto update(ClassroomDto classroomDto);

    public void deleteById(UUID id);

    public Set<ClassroomDto> pagingClassroom(SearchObject searchObject);

    public ClassroomDto getById(UUID id);

}
