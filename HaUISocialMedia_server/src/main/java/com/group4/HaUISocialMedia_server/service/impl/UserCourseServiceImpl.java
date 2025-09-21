package com.group4.HaUISocialMedia_server.service.impl;

import com.group4.HaUISocialMedia_server.dto.SearchObject;
import com.group4.HaUISocialMedia_server.dto.UserCourseDto;
import com.group4.HaUISocialMedia_server.dto.UserDto;
import com.group4.HaUISocialMedia_server.entity.*;
import com.group4.HaUISocialMedia_server.repository.BoardRecordRepository;
import com.group4.HaUISocialMedia_server.repository.CourseRepository;
import com.group4.HaUISocialMedia_server.repository.CourseResultRepository;
import com.group4.HaUISocialMedia_server.repository.UserCourseRepository;
import com.group4.HaUISocialMedia_server.service.UserCourseService;
import com.group4.HaUISocialMedia_server.service.UserService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Transactional
public class UserCourseServiceImpl implements UserCourseService {
    @Autowired
    private UserCourseRepository userCourseRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private CourseResultRepository courseResultRepository;

    @Autowired
    private BoardRecordRepository boardRecordRepository;

    @Override
    public UserCourseDto getUserCourseById(UUID userCourseId) {
        if (userCourseId == null) return null;
        UserCourse entity = userCourseRepository.findById(userCourseId).orElse(null);
        if (entity == null) return null;
        return new UserCourseDto(entity);
    }

    @Override
    public UserCourseDto createUserCourse(UserCourseDto dto) {
        if (dto == null) return null;
        User currentUser = userService.getCurrentLoginUserEntity();
        if (dto.getUser() != null)
            currentUser = userService.getUserEntityById(dto.getUser().getId());
        //Check if it's already in the userCourse table
        UserCourse userCourse = userCourseRepository.findUserCourseByUserAndCourse(currentUser.getId(), dto.getCourse().getId());
        //if's already, update
        if (userCourse != null) {
            dto.setId(userCourse.getId());
            return updateUserCourse(dto);
        }


        if (currentUser == null) return null;

//            BoardRecord boardRecord = boardRecordRepository.getRecordOfStudent(currentUser.getId());

        if (dto.getCourse() == null) return null;
        Course course = courseRepository.findById(dto.getCourse().getId()).orElse(null);
        if (course == null) return null;

        if (dto.getCourseResult() == null) return null;
        CourseResult courseResult = courseResultRepository.findById(dto.getCourseResult().getId()).orElse(null);

        if (courseResult == null) return null;
//            String scoreChar = dto.getCourseResult().getCode();

//        switch (scoreChar) {
//            case "A" -> boardRecord.setNumsOfA(boardRecord.getNumsOfA() + 1);
//            case "B+" -> boardRecord.setNumsOfBPlus(boardRecord.getNumsOfBPlus() + 1);
//            case "B" -> boardRecord.setNumsOfBPlus(boardRecord.getNumsOfB() + 1);
//            case "C+" -> boardRecord.setNumsOfBPlus(boardRecord.getNumsOfCPlus() + 1);
//            case "C" -> boardRecord.setNumsOfBPlus(boardRecord.getNumsOfC() + 1);
//            case "D+" -> boardRecord.setNumsOfBPlus(boardRecord.getNumsOfDPlus() + 1);
//            default -> boardRecord.setNumsOfBPlus(boardRecord.getNumsOfD() + 1);
//        }

//        boardRecordRepository.saveAndFlush(boardRecord);

        UserCourse entity = new UserCourse();
        entity.setCourse(course);
        entity.setCourseResult(courseResult);
        entity.setUser(currentUser);
        entity.setScore(dto.getScore());
        entity.setModifyDate(new Date());
        entity.setIsValidated(false);

        UserCourse savedEntity = userCourseRepository.save(entity);

        return new UserCourseDto(savedEntity);
    }

    @Override
    public UserCourseDto updateUserCourse(UserCourseDto dto) {
        if (dto == null) return null;
        User currentUser = userService.getCurrentLoginUserEntity();
        if (currentUser == null) return null;

        if (dto.getCourse() == null) return null;
        Course course = courseRepository.findById(dto.getCourse().getId()).orElse(null);
        if (course == null) return null;

        if (dto.getCourseResult() == null) return null;
        CourseResult courseResult = courseResultRepository.findById(dto.getCourseResult().getId()).orElse(null);
        if (courseResult == null) return null;

        UserCourse entity = userCourseRepository.findById(dto.getId()).orElse(null);
        if (entity == null) return null;

        BoardRecord boardRecord = boardRecordRepository.getRecordOfStudent(currentUser.getId());
        String scoreChar = entity.getCourseResult().getCode();

        if(entity.getIsValidated()){
            switch (scoreChar) {
                case "A" -> boardRecord.setNumsOfA(boardRecord.getNumsOfA() - 1);
                case "B+" -> boardRecord.setNumsOfBPlus(boardRecord.getNumsOfBPlus() - 1);
                case "B" -> boardRecord.setNumsOfBPlus(boardRecord.getNumsOfB() - 1);
                case "C+" -> boardRecord.setNumsOfBPlus(boardRecord.getNumsOfCPlus() - 1);
                case "C" -> boardRecord.setNumsOfBPlus(boardRecord.getNumsOfC() - 1);
                case "D+" -> boardRecord.setNumsOfBPlus(boardRecord.getNumsOfDPlus() - 1);
                default -> boardRecord.setNumsOfBPlus(boardRecord.getNumsOfD() - 1);
            }
        }


        boardRecord.setLastModifyDate(new Date());
        boardRecordRepository.saveAndFlush(boardRecord);

        entity.setCourse(course);
        entity.setCourseResult(courseResult);
        entity.setUser(currentUser);
        entity.setScore(dto.getScore());
        entity.setModifyDate(new Date());
        entity.setIsValidated(false);

        UserCourse savedEntity = userCourseRepository.save(entity);

        return new UserCourseDto(savedEntity);
    }

    @Override
    public boolean deleteUserCourseById(UUID userCourseId) {
        if (userCourseId == null) return false;
        UserCourse entity = userCourseRepository.findById(userCourseId).orElse(null);
        if (entity == null) return false;
        userCourseRepository.delete(entity);
        return true;
    }

    @Override
    public List<UserCourseDto> getUserCourseOfUser(UUID userId) {
        if (userId == null) return null;

        List<UserCourse> entities = userCourseRepository.getUserCourseOfUser(userId);
        if (entities == null) return null;

        List<UserCourseDto> res = new ArrayList<>();
        for (UserCourse uc : entities) {
            UserCourseDto dto = new UserCourseDto(uc);
            res.add(dto);
        }

        return res;
    }

    @Override
    public List<UserCourseDto> getUserCourseByResult(UUID userId, UUID courseResultId) {
        if (userId == null || courseResultId == null) return null;

        List<UserCourse> entities = userCourseRepository.getUserCourseByResult(userId, courseResultId);
        if (entities == null) return null;

        List<UserCourseDto> res = new ArrayList<>();
        for (UserCourse uc : entities) {
            UserCourseDto dto = new UserCourseDto(uc);
            res.add(dto);
        }

        return res;
    }

    @Override
    public UserCourseDto setIsValidGiveUserCourse(UUID userCourseId) {
        UserCourse entity = userCourseRepository.findById(userCourseId).orElse(null);
        if (entity == null)
            return null;
        if (entity.getIsValidated())
            return null;
        entity.setIsValidated(true);

        UserDto user = userService.getById(entity.getUser().getId());
        if (user == null)
            return null;
        BoardRecord boardRecord = boardRecordRepository.getRecordOfStudent(user.getId());
        if(boardRecord == null)
            return null;
        String scoreChar = entity.getCourseResult().getCode();

        switch (scoreChar) {
            case "A" -> boardRecord.setNumsOfA(boardRecord.getNumsOfA() + 1);
            case "B+" -> boardRecord.setNumsOfBPlus(boardRecord.getNumsOfBPlus() + 1);
            case "B" -> boardRecord.setNumsOfB(boardRecord.getNumsOfB() + 1);
            case "C+" -> boardRecord.setNumsOfCPlus(boardRecord.getNumsOfCPlus() + 1);
            case "C" -> boardRecord.setNumsOfC(boardRecord.getNumsOfC() + 1);
            case "D+" -> boardRecord.setNumsOfDPlus(boardRecord.getNumsOfDPlus() + 1);
            case "D" -> boardRecord.setNumsOfD(boardRecord.getNumsOfD() + 1);
            default -> boardRecord.setNumsOfF(boardRecord.getNumsOfF() == null ? 1 : boardRecord.getNumsOfF() + 1);
        }

        boardRecord.setLastModifyDate(new Date());
        boardRecordRepository.saveAndFlush(boardRecord);
        return new UserCourseDto(entity);
    }

    @Override
    public Set<UserCourseDto> getAllCourseAdminAllow(UUID userId) {
        List<UserCourse> li = userCourseRepository.getAllCourseAdminAllow(userId);
        Set<UserCourseDto> res = new HashSet<>();
        li.stream().map(UserCourseDto::new).forEach(res::add);
        return res;
    }

    @Override
    public Set<UserCourseDto> getAllCourseWaitAdminAllow(UUID userId) {
        List<UserCourse> li = userCourseRepository.getAllCourseWaitAdminAllow(userId);
        Set<UserCourseDto> res = new HashSet<>();
        li.stream().map(UserCourseDto::new).forEach(res::add);
        return res;
    }

    @Override
    public Set<UserCourseDto> getAllUserCourseNotYetAllow(SearchObject searchObject) {
        List<UserCourse> li = userCourseRepository.getAllUserCourseNotYetAllow(PageRequest.of(searchObject.getPageIndex(), searchObject.getPageSize()));
        Set<UserCourseDto> res = new TreeSet<>((uc1, uc2) -> uc1.getModifyDate().compareTo(uc2.getModifyDate()));
        li.stream().map(UserCourseDto::new).forEach(res::add);
        return res;
    }
}
