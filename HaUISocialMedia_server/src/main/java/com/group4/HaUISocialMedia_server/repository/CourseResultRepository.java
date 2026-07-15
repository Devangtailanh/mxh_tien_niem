package com.group4.HaUISocialMedia_server.repository;

import com.group4.HaUISocialMedia_server.entity.CourseResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CourseResultRepository extends JpaRepository<CourseResult, UUID> {
    //public CourseResult findById(UUID id);

    List<CourseResult> findAllByName(String name);

    default CourseResult findByName(String name) {
        return findAllByName(name).stream().findFirst().orElse(null);
    }


    @Query("SELECT c FROM CourseResult c")
    public List<CourseResult> findAllResults();

}
