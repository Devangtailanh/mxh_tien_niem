package com.group4.HaUISocialMedia_server.repository;

import com.group4.HaUISocialMedia_server.entity.Classroom;
import com.group4.HaUISocialMedia_server.entity.UserCourse;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;
import java.util.UUID;


@Repository
public interface UserCourseRepository extends JpaRepository<UserCourse, UUID> {
    @Query("select uc from UserCourse uc where uc.user.id = :userId order by uc.courseResult.name, uc.course.name")
    List<UserCourse> getUserCourseOfUser(@Param("userId") UUID userId);

    @Query("SELECT uc FROM UserCourse uc WHERE uc.user.id = :userId and uc.isValidated = true")
    public List<UserCourse> getAllCourseAdminAllow(@Param("userId")UUID userId);

    @Query("SELECT uc FROM UserCourse uc WHERE uc.user.id = :userId and uc.isValidated = false")
    public List<UserCourse> getAllCourseWaitAdminAllow(@Param("userId")UUID userId);

    @Query("SELECT uc FROM UserCourse uc WHERE uc.user.id = :userId and uc.course.id = :courseId")
    public UserCourse findUserCourseByUserAndCourse(@Param("userId")UUID userId, @Param("courseId")UUID courseId);

    @Query("select uc from UserCourse uc where uc.user.id = :userId and uc.courseResult.id = :courseResultId " +
            "order by uc.course.name")
    List<UserCourse> getUserCourseByResult(@Param("userId") UUID userId, @Param("courseResultId") UUID courseResultId);

    @Query("SELECT uc FROM UserCourse uc WHERE uc.isValidated = false ORDER BY uc.modifyDate")
    public List<UserCourse> getAllUserCourseNotYetAllow(PageRequest pageRequest);
}
