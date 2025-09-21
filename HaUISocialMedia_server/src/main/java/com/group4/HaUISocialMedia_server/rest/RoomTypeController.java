package com.group4.HaUISocialMedia_server.rest;

import com.group4.HaUISocialMedia_server.dto.RoomTypeDto;
import com.group4.HaUISocialMedia_server.service.RoomTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/roomType")
public class RoomTypeController {
    @Autowired
    private RoomTypeService roomTypeService;

    @GetMapping("/{roomTypeId}")
    @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity<RoomTypeDto> getRoomTypeById(@PathVariable UUID roomTypeId) {
        RoomTypeDto res = roomTypeService.getRoomTypeById(roomTypeId);
        if (res == null) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<RoomTypeDto>(res, HttpStatus.OK);
    }

    @GetMapping("/all")
    @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity<Set<RoomTypeDto>> getAllRoomType() {
        Set<RoomTypeDto> res = roomTypeService.getAllRoomTypes();
        if (res == null) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<Set<RoomTypeDto>>(res, HttpStatus.OK);
    }

    @PostMapping
    @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity<RoomTypeDto> createRoomType(@RequestBody RoomTypeDto dto) {
        RoomTypeDto res = roomTypeService.createRoomType(dto);
        if (res == null) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<RoomTypeDto>(res, HttpStatus.OK);
    }

    @PutMapping
    @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity<RoomTypeDto> updateRoomType(@RequestBody RoomTypeDto dto) {
        RoomTypeDto res = roomTypeService.updateRoomType(dto);
        if (res == null) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<RoomTypeDto>(res, HttpStatus.OK);
    }

    @DeleteMapping("/{roomTypeId}")
    @CrossOrigin(origins = "http://localhost:5173")
    public void deleteRoomType(@PathVariable UUID roomTypeId){
        roomTypeService.deleteRoomType(roomTypeId);
    }
}
