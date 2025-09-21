package com.group4.HaUISocialMedia_server.service;


import com.group4.HaUISocialMedia_server.dto.LikeDto;

import java.util.Set;
import java.util.UUID;

public interface LikeService {
    public LikeDto likeAPost(UUID postId);

    public Set<LikeDto> getListLikesOfPost(UUID postId);

    public boolean dislikeAPost(UUID postId);
}
