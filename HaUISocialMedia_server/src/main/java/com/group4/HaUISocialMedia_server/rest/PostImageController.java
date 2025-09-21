package com.group4.HaUISocialMedia_server.rest;

import com.group4.HaUISocialMedia_server.dto.PostImageDTO;
import com.group4.HaUISocialMedia_server.service.PostImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Set;
import java.util.UUID;

@Controller
@RequestMapping("/api/postImage")
public class PostImageController {

    @Autowired
    private PostImageService postImageService;

    @PostMapping("")
    public ResponseEntity<PostImageDTO> createImage(@RequestBody PostImageDTO postImageDTO){
        PostImageDTO postImageDTO1 = postImageService.createPostImage(postImageDTO);
        if(postImageDTO1 == null)
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(postImageDTO1, HttpStatus.OK);
    }

    @PutMapping("")
    public ResponseEntity<PostImageDTO> updateImage(@RequestBody PostImageDTO postImageDTO){
        PostImageDTO postImageDTO1 = postImageService.updatePostImage(postImageDTO);
        if(postImageDTO1 == null)
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(postImageDTO1, HttpStatus.OK);
    }

    @DeleteMapping("/{idImage}")
    public ResponseEntity<Boolean> deleteImage(@PathVariable("idImage")UUID idImage){
        if(postImageService.deletePostImage(idImage))
            return new ResponseEntity<>(true, HttpStatus.OK);
        return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/sort/{idPost}")
    public ResponseEntity<Set<PostImageDTO>> pagingSortImage(@PathVariable("idPost")UUID idPost){
        Set<PostImageDTO> res = postImageService.sortImage(idPost);
        if(res.isEmpty())
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }
}
