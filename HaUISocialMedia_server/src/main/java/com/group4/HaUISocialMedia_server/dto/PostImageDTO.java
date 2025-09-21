package com.group4.HaUISocialMedia_server.dto;

import com.group4.HaUISocialMedia_server.entity.Post;
import com.group4.HaUISocialMedia_server.entity.PostImage;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PostImageDTO {

    private UUID id;
    private String image;
    private String description;
    private Date createDate;
    private PostDto post;

    public PostImageDTO(PostImage entity){
        this.id = entity.getId();
        if(entity.getPost() != null)
            this.post = new PostDto(entity.getPost());
        this.image = entity.getImage();
        this.description = entity.getDescription();
        this.createDate = entity.getCreateDate();
    }
}
