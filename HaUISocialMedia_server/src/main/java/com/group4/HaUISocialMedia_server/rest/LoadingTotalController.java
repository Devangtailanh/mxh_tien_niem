package com.group4.HaUISocialMedia_server.rest;

import com.group4.HaUISocialMedia_server.dto.GroupDto;
import com.group4.HaUISocialMedia_server.dto.PostDto;
import com.group4.HaUISocialMedia_server.dto.SearchObject;
import com.group4.HaUISocialMedia_server.dto.UserDto;
import com.group4.HaUISocialMedia_server.service.GroupService;
import com.group4.HaUISocialMedia_server.service.PostService;
import com.group4.HaUISocialMedia_server.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@AllArgsConstructor
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/loadingTotal")
public class LoadingTotalController {
    @Autowired
    private PostService postService;

    @Autowired
    private UserService userService;

    @Autowired
    private GroupService groupService;

    //search post for current login user
    @PostMapping("/search-post")
    public ResponseEntity<List<PostDto>> pagingPostByKeyword(@RequestBody SearchObject searchObject) {
        List<PostDto> res = postService.pagingByKeyword(searchObject);
        if (res == null) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @PostMapping("/search-user")
    public ResponseEntity<List<UserDto>> pagingUserByKeyword(@RequestBody SearchObject searchObject) {
        List<UserDto> res = userService.pagingByKeyword(searchObject);
        if (res == null) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @PostMapping("/search-group")
    public ResponseEntity<List<GroupDto>> pagingGroupByKeyword(@RequestBody SearchObject searchObject) {
        List<GroupDto> res = groupService.pagingByKeyword(searchObject);
        if (res == null) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @PostMapping("/search-total")
    public ResponseEntity<Object> pagingTotalByKeyword(@RequestBody SearchObject searchObject) {
        SearchObject initialSO = new SearchObject();
        initialSO.setPageSize(5);
        initialSO.setPageIndex(1);
        initialSO.setKeyWord(searchObject.getKeyWord());

        List<PostDto> resPost = postService.pagingByKeyword(initialSO);
        List<UserDto> resUser = userService.pagingByKeyword(initialSO);
        List<GroupDto> resUGroup = groupService.pagingByKeyword(initialSO);

        Map<String, Object> res = new HashMap<>();
        res.put("posts", resPost);
        res.put("users", resUser);
        res.put("groups", resUGroup);

        if (res == null) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }
}
