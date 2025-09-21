package com.group4.HaUISocialMedia_server.repository;

import com.group4.HaUISocialMedia_server.dto.PostDto;
import com.group4.HaUISocialMedia_server.dto.SearchObject;
import com.group4.HaUISocialMedia_server.entity.Post;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.UUID;


@Repository
public interface PostRepository extends JpaRepository<Post, UUID> {
//    @Query(value = "SELECT new com.group4.HaUISocialMedia_server.dto.PostDto(p) FROM Post p WHERE p.owner.id IN :userIds AND p.createDate < :mileStone ORDER BY p.createDate DESC LIMIT :limit OFFSET :offset")
//    List<PostDto> findNext5PostFromMileStone(@Param("userIds") List<UUID> userIds, @Param("mileStone") Date mileStone, @Param("limit") int limit, @Param("offset") int offset);

    //Cách 1: Truyền tham số

    //@Query("SELECT p FROM Post p WHERE p.owner.id IN :userIds AND p.createDate < :mileStone ORDER BY p.createDate DESC")
    // List<PostDto> findNext5PostFromMileStone(@Param("userIds") List<UUID> userIds, @Param("mileStone") Date mileStone, Pageable pageable);


    // @Query(value = "SELECT new com.group4.HaUISocialMedia_server.dto.PostDto(p) FROM Post p WHERE p.owner.id IN :userIds AND p.createDate < :mileStone ORDER BY p.createDate desc LIMIT :limit OFFSET :offset")
    @Query(value = "SELECT new com.group4.HaUISocialMedia_server.dto.PostDto(p) " +
            "FROM Post p WHERE ((p.owner.id IN :userIds and p.group.id is null) or (p.group.id in :joinedGroupIds)) AND p.createDate < :mileStone " +
            "ORDER BY p.createDate desc")
    List<PostDto> findNextPostFromMileStone(@Param("userIds") List<UUID> userIds, @Param("joinedGroupIds") List<UUID> joinedGroupIds, @Param("mileStone") Date mileStone, Pageable pageable);

    @Query(value = "SELECT new com.group4.HaUISocialMedia_server.dto.PostDto(p) " +
            "FROM Post p WHERE (p.owner.id = :userId and p.group.id is null) AND p.createDate < :mileStone " +
            "and (p.owner.code like %:keyword% " +
            "or p.content like %:keyword%) " +
            "ORDER BY p.createDate desc")
    List<PostDto> findPostOfUser(@Param("userId") UUID userId, @Param("mileStone") Date mileStone, @Param("keyword") String keyword, Pageable pageable);

    @Query(value = "SELECT new com.group4.HaUISocialMedia_server.dto.PostDto(p) FROM Post p inner join User u on u.id = p.owner.id left join Group g on g.id = p.group.id " +
            "WHERE ((p.owner.id IN :userIds and p.group.id is null) or (g.id in :joinedGroupIds)) " +
            "AND p.createDate < :mileStone " +
            "and (p.owner.code like %:keyword% or p.owner.username like %:keyword% " +
            "or p.content like %:keyword% or p.owner.firstName like %:keyword% or p.owner.lastName like %:keyword%) " +
            "ORDER BY p.createDate desc")
    List<PostDto> findNextPostFromMileStoneWithKeyWord(@Param("userIds") List<UUID> userIds,
                                                       @Param("joinedGroupIds") List<UUID> joinedGroupIds,
                                                       @Param("mileStone") Date mileStone,
                                                       @Param("keyword") String keyword, Pageable pageable);

    @Query(value = "SELECT new com.group4.HaUISocialMedia_server.dto.PostDto(p) FROM Post p " +
            "where (p.owner.code like %:keyword% or p.owner.username like %:keyword% " +
            "or p.content like %:keyword% or p.owner.firstName like %:keyword% or p.owner.lastName like %:keyword%) " +
            "ORDER BY p.createDate desc")
    List<PostDto> adminPagingPost(@Param("keyword") String keyword, Pageable pageable);

}