package com.group4.HaUISocialMedia_server.repository;

import com.group4.HaUISocialMedia_server.entity.Classroom;
import com.group4.HaUISocialMedia_server.entity.RoomType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.UUID;


@Repository
public interface RoomTypeRepository extends JpaRepository<RoomType, UUID> {
    @Query("from RoomType entity where entity.name = ?1")
    public RoomType findByName(String name);
}
