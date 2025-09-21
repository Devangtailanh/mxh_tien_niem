package com.group4.HaUISocialMedia_server.repository;

import com.group4.HaUISocialMedia_server.entity.Like;
import com.group4.HaUISocialMedia_server.entity.Room;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface LikeRepository extends JpaRepository<Like, UUID> {

    @Query("SELECT l FROM Like l where l.post.id =:idPost order by l.post.createDate desc")
    public List<Like> findByPost(@Param("idPost") UUID idPost);

    @Transactional
    @Modifying
    @Query("DELETE FROM Like l where l.post.id =:idPost and l.userLike.id =:idUser")
    public void deleteByIdPost(@Param("idPost") UUID idPost, @Param("idUser") UUID idUser);

    @Transactional
    @Modifying
    @Query("DELETE FROM Like l where l.post.id =:idPost")
    public void deleteByPost(@Param("idPost") UUID idPost);

    @Query("SELECT l FROM Like l where l.post.id = :idPost and l.userLike.id = :idUser")
    public Like findByUserAndPost(@Param("idPost")UUID idPost, @Param("idUser")UUID idUser);
}
