package com.group4.HaUISocialMedia_server.rest;

import com.group4.HaUISocialMedia_server.dto.CommentDto;
import com.group4.HaUISocialMedia_server.service.CommentService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;
import java.util.UUID;

@AllArgsConstructor
@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/comment")
public class CommentController {
    @Autowired
    private CommentService commentService;

    @GetMapping("/children/{commentId}")
    public ResponseEntity<Set<CommentDto>> getSubComments(@PathVariable("commentId") UUID commentId) {
        Set<CommentDto> res = commentService.getSubCommentOfComment(commentId);
        if (res == null) return new ResponseEntity<>(res, HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @GetMapping("/forPost/{postId}")
    public ResponseEntity<Set<CommentDto>> getParentCommentOfPost(@PathVariable("postId") UUID postId) {
        Set<CommentDto> res = commentService.getParentCommentsOfPost(postId);
        if (res == null) return new ResponseEntity<>(res, HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @GetMapping("/getById/{commentId}")
    public ResponseEntity<CommentDto> getById(@PathVariable("commentId") UUID id) {
        CommentDto commentDto = commentService.getById(id);
        if(commentDto == null)
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(commentDto, HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<CommentDto> createComment(@RequestBody CommentDto dto) {
        CommentDto commentDto = commentService.createComment(dto);
        if(commentDto == null)
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(commentDto, HttpStatus.OK);
    }

    @PutMapping()
    public ResponseEntity<CommentDto> updateComment(@RequestBody CommentDto dto) {

        CommentDto commentDto = commentService.updateComment(dto);
        if(commentDto == null)
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(commentDto, HttpStatus.OK);    }

    @DeleteMapping("/deleteById/{commentId}")
    public ResponseEntity<CommentDto> deleteComment(@PathVariable("commentId") UUID commentId) {
        CommentDto commentDto = commentService.deleteComment(commentId);
        if(commentDto == null)
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(commentDto, HttpStatus.OK);
    }
}
