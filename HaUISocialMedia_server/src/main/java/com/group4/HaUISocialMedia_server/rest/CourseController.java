package com.group4.HaUISocialMedia_server.rest;

import com.group4.HaUISocialMedia_server.dto.CourseDto;
import com.group4.HaUISocialMedia_server.dto.SearchObject;
import com.group4.HaUISocialMedia_server.service.CourseService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/course")
public class CourseController {

    @Autowired
    private CourseService courseService;

    @GetMapping("/all")
    public ResponseEntity<Set<CourseDto>> getAllCourses(){
        Set<CourseDto> se = courseService.findAll();
        if(se == null)
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(se, HttpStatus.OK);
    }

    @PostMapping("/add")
    @Transactional
    public ResponseEntity<CourseDto> addCourse(@RequestBody CourseDto courseDto){
        CourseDto courseDto1 = courseService.save(courseDto);
        if(courseDto1 == null)
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(courseDto1, HttpStatus.OK);
    }

    @PutMapping("/update")
    @Transactional
    public ResponseEntity<CourseDto> updateCourse(@RequestBody CourseDto courseDto){
        CourseDto reposeDto = courseService.update(courseDto);
        if(reposeDto == null)
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(reposeDto, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    @Transactional
    public ResponseEntity<Boolean> deleteById(@PathVariable("id")UUID id){
        if(courseService.getById(id) == null)
            return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
        courseService.deleteById(id);
        return new ResponseEntity<>(true, HttpStatus.OK);
    }

    @PostMapping("/paging")
    public ResponseEntity<Set<CourseDto>> pagingCourse(@RequestBody SearchObject searchObject){
        Set<CourseDto> se = courseService.pagingCourses(searchObject);
        if(se == null)
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(se, HttpStatus.OK);
    }
}
