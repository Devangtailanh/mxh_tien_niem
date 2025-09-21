package com.group4.HaUISocialMedia_server.service.impl;

import com.group4.HaUISocialMedia_server.dto.PostImageDTO;
import com.group4.HaUISocialMedia_server.entity.Post;
import com.group4.HaUISocialMedia_server.entity.PostImage;
import com.group4.HaUISocialMedia_server.repository.PostImageRepository;
import com.group4.HaUISocialMedia_server.repository.PostRepository;
import com.group4.HaUISocialMedia_server.service.PostImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class PostImageServiceImpl implements PostImageService {

    @Autowired
    private PostImageRepository postImageRepository;

    @Autowired
    private PostRepository postRepository;

    @Override
    public PostImageDTO createPostImage(PostImageDTO postImageDTO) {
        PostImage newImage = new PostImage();
        newImage.setImage(postImageDTO.getImage());
        Post post = postRepository.findById(postImageDTO.getPost().getId()).orElse(null);
        if(post != null)
            newImage.setPost(post);
        newImage.setCreateDate(new Date());
        newImage.setDescription(postImageDTO.getDescription());
        return new PostImageDTO(postImageRepository.save(newImage));
    }

    @Override
    public PostImageDTO updatePostImage(PostImageDTO postImageDTO) {
        PostImage oldImage = postImageRepository.findById(postImageDTO.getId()).orElse(null);
        if(oldImage == null)
            return null;
        oldImage.setImage(postImageDTO.getImage());
        oldImage.setCreateDate(new Date());
        oldImage.setDescription(postImageDTO.getDescription());
        return new PostImageDTO(postImageRepository.save(oldImage));
    }

    @Override
    public boolean deletePostImage(UUID idImage) {
        PostImage oldImage = postImageRepository.findById(idImage).orElse(null);
        if(oldImage == null)
            return false;
        postImageRepository.delete(oldImage);
        return true;
    }

    @Override
    public Set<PostImageDTO> sortImage(UUID idPost) {
        List<PostImage> li = postImageRepository.pagingSortImage(idPost);
        Set<PostImageDTO> res = new TreeSet<>((i1, i2) -> i2.getCreateDate().compareTo(i1.getCreateDate()));
        li.stream().map(PostImageDTO::new).forEach(res::add);
        return res;
    }
}
