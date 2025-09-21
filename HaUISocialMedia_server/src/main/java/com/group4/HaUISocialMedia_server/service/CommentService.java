package com.group4.HaUISocialMedia_server.service;

import com.group4.HaUISocialMedia_server.dto.CommentDto;

import java.util.Set;
import java.util.UUID;

public interface CommentService {
    public Set<CommentDto> getParentCommentsOfPost(UUID postId);

    public Set<CommentDto> getSubCommentOfComment(UUID commentId);

    public CommentDto getById(UUID commentId);

    public CommentDto createComment(CommentDto dto);

    public CommentDto updateComment(CommentDto dto);

    public CommentDto deleteComment(UUID commentId);

    public boolean hasAuthorityToChange(UUID commentId);

    public void deleteAllByIdPost(UUID idPost);
}
