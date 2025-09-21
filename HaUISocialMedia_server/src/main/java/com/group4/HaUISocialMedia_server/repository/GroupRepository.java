package com.group4.HaUISocialMedia_server.repository;

import com.group4.HaUISocialMedia_server.entity.Group;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface GroupRepository extends JpaRepository<Group, UUID> {

//    @Query("SELECT a FROM Group a WHERE a.id = :id and a.user.id = :userId")
//    public Group findAdmin(@Param("id")UUID idGroup, @Param("userId")UUID userId);

    @Query("SELECT g FROM Group g WHERE g.name LIKE %:name%")
    public List<Group> findGroupByName(@Param("name") String name);

    @Query("select g from Group g " +
            "where " +
            " g.name like %:keyword%" +
            "")
    public List<Group> pagingGroups(@Param("keyword") String keyword, Pageable pageable);
}
