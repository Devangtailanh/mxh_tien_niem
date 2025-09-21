package com.group4.HaUISocialMedia_server.repository;

import com.group4.HaUISocialMedia_server.entity.Comment;
import com.group4.HaUISocialMedia_server.entity.Post;
import com.group4.HaUISocialMedia_server.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@Repository
public interface CommentRepository extends JpaRepository<Comment, UUID> {

    @Query("SELECT p FROM Comment p where p.post.id =:postId and p.repliedComment IS null order by p.createDate desc")
    public List<Comment> findAllByPost(@Param("postId") UUID postId);
//    public Set<Comment> findAllByPost( @Param("id")UUID id);

    @Modifying
    @Query("DELETE From Comment c where c.repliedComment.id =:commentParent")
    public void deleteAllByRepliedComment(@Param("commentParent")UUID commentParent);

    @Modifying
    @Query("DELETE From Comment c where c.post.id =:idPost")
    public void deleteAllByIdPost(@Param("idPost")UUID idPost);

    void deleteAllByPostId(UUID postId);
    List<Comment> findAllByPostId(UUID postId); // nếu muốn query thẳng theo id


}
