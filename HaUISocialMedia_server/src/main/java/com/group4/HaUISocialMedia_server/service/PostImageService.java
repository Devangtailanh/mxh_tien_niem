package com.group4.HaUISocialMedia_server.service;

import com.group4.HaUISocialMedia_server.dto.PostImageDTO;

import java.util.Set;
import java.util.UUID;

public interface PostImageService {

    public PostImageDTO createPostImage(PostImageDTO postImageDTO);

    public PostImageDTO updatePostImage(PostImageDTO postImageDTO);

    public boolean deletePostImage(UUID idImage);

    public Set<PostImageDTO> sortImage(UUID idPost);
}
