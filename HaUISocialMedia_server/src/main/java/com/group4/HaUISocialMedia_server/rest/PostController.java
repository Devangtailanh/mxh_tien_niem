package com.group4.HaUISocialMedia_server.rest;

import com.group4.HaUISocialMedia_server.dto.MessageTypeDto;
import com.group4.HaUISocialMedia_server.dto.PostDto;
import com.group4.HaUISocialMedia_server.dto.SearchObject;
import com.group4.HaUISocialMedia_server.entity.Post;
import com.group4.HaUISocialMedia_server.service.PostService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@AllArgsConstructor
@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/post")
public class PostController {
    @Autowired
    private PostService postService;

    @PostMapping("/newsfeed")
    public ResponseEntity<List<PostDto>> pagingNewsFeed(@RequestBody SearchObject searchObject) {
        List<PostDto> res = postService.getNewsFeed(searchObject);
        if (res == null) return new ResponseEntity<>(res, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @PostMapping("/newsfeed/{userId}")
    public ResponseEntity<Set<PostDto>> getPostsOfUser(@PathVariable("userId") UUID userId, @RequestBody SearchObject searchObject) {
        Set<PostDto> res = postService.getPostsOfUser(userId, searchObject);
        if (res == null) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @GetMapping("/{postId}")
    public ResponseEntity<PostDto> getById(@PathVariable UUID postId) {
        PostDto res = postService.getById(postId);
        if (res == null) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<PostDto> createPost(@RequestBody PostDto dto) {
        PostDto res = postService.createPost(dto);
        if (res == null) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<PostDto>(res, HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<PostDto> updatePost(@RequestBody PostDto dto) {
        if (!postService.hasAuthorityToChange(dto.getId())) return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);

        PostDto res = postService.updatePost(dto);

        if (res == null) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<PostDto>(res, HttpStatus.OK);
    }

    @DeleteMapping("/{postId}")
    @Transactional
    public ResponseEntity<Boolean> deletePost(@PathVariable("postId") UUID postId) {
        if (postService.isAdmin()) {
            boolean res = postService.deletePost(postId);
            if (!res) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
            return new ResponseEntity<Boolean>(res, HttpStatus.OK);
        }
        if (!postService.hasAuthorityToChange(postId)) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);

        boolean res = postService.deletePost(postId);

        if (!res) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<Boolean>(res, HttpStatus.OK);
    }

//    @PostMapping("/BackgroundImage")
//    public ResponseEntity<PostDto> updateBackground(@RequestParam String backgroundImage) {
//        PostDto res = postService.updateBackgroundImage(backgroundImage);
//        if (!postService.hasAuthorityToChange(res.getId())) return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
//        if (res == null) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
//        return new ResponseEntity<PostDto>(res, HttpStatus.OK);
//    }
//
//    @PostMapping("/profileImage")
//    public ResponseEntity<PostDto> updateProfile(@RequestParam String profileImage) {
//        PostDto res = postService.updateProfileImage(profileImage);
//        if (!postService.hasAuthorityToChange(res.getId())) return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
//        if (res == null) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
//        return new ResponseEntity<PostDto>(res, HttpStatus.OK);
//    }

    @PostMapping("/admin/posts")
    public ResponseEntity<List<PostDto>> adminPagingPost(@RequestBody SearchObject searchObject) {
//        if (!postService.isAdmin())
//            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        List<PostDto> res = postService.adminPagingPost(searchObject);
        return res == null ? new ResponseEntity<>(res, HttpStatus.BAD_REQUEST) : new ResponseEntity<>(res, HttpStatus.OK);
    }

}
