package com.group4.HaUISocialMedia_server.dto;

import com.group4.HaUISocialMedia_server.entity.Comment;
import com.group4.HaUISocialMedia_server.entity.Like;
import com.group4.HaUISocialMedia_server.entity.Post;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PostDto {
    private UUID id;
    private Date createDate;
    private String content;
    private UserDto creator;
    private Set<LikeDto> likes;
    private Set<CommentDto> comments;
    private Set<PostImageDTO> images;
    private GroupDto group;

    public PostDto(Post entity) {
        this.id = entity.getId();
        this.createDate = entity.getCreateDate();
        this.content = entity.getContent();
        if (entity.getOwner() != null) {
            this.creator = new UserDto(entity.getOwner());
        }

        if(entity.getGroup() != null)
            this.group = new GroupDto(entity.getGroup());

//        if (entity.getLikes() != null && !entity.getLikes().isEmpty()) {
//            this.likes = new HashSet<>();
//            for (Like likeEntity : entity.getLikes()) {
//                this.likes.add(new LikeDto(likeEntity));
//            }
//        }

//        if (entity.getComments() != null && entity.getComments().size() > 0) {
//            this.comments = new HashSet<>();
//            for (Comment commentEntity : entity.getComments()) {
//                this.comments.add(new CommentDto(commentEntity));
//            }
//        }
    }
}
