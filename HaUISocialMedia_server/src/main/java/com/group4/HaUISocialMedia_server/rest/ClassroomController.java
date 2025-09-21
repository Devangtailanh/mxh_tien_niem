package com.group4.HaUISocialMedia_server.rest;

import com.group4.HaUISocialMedia_server.dto.ClassroomDto;
import com.group4.HaUISocialMedia_server.dto.SearchObject;
import com.group4.HaUISocialMedia_server.service.ClassroomService;
import jakarta.transaction.Transactional;
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
@RequestMapping("/api/classroom")
public class ClassroomController {

    @Autowired
    private ClassroomService classroomService;

    @GetMapping("/all")
    public ResponseEntity<Set<ClassroomDto>> getAllClassroom(){
        Set<ClassroomDto> li = classroomService.getAllClassroom();
        if(li.isEmpty()) return new ResponseEntity<>(li, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(li, HttpStatus.OK);
    }

    @PostMapping("/save")
    @Transactional
    public ResponseEntity<ClassroomDto> save(@RequestBody ClassroomDto classroomDto){
        ClassroomDto classroomDto1 = classroomService.save(classroomDto);
        if(classroomDto1 == null) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(classroomDto1, HttpStatus.OK);
    }

    @PutMapping("/update")
    @Transactional
    public ResponseEntity<ClassroomDto> update(@RequestBody ClassroomDto classroomDto){
        ClassroomDto responseDto = classroomService.update(classroomDto);
        if(responseDto == null) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity<ClassroomDto> getById(@PathVariable("id") UUID id){
        ClassroomDto classroomDto1 = classroomService.getById(id);
        if(classroomDto1 == null) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(classroomDto1, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    @Transactional
    public ResponseEntity<Boolean> deleteById(@PathVariable("id")UUID id){
        ClassroomDto classroomDto = classroomService.getById(id);
        if(classroomDto == null) return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        classroomService.deleteById(id);
        return new ResponseEntity<>(true, HttpStatus.OK);
    }

    @PostMapping("/paging")
    public ResponseEntity<Set<ClassroomDto>> pagingClass(@RequestBody SearchObject searchObject){
        Set<ClassroomDto> li = classroomService.pagingClassroom(searchObject);
//        if(li == null) return new ResponseEntity<>(li, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(li, HttpStatus.OK);
    }

}
