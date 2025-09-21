package com.group4.HaUISocialMedia_server.rest;

import com.group4.HaUISocialMedia_server.dto.NewGroupChat;
import com.group4.HaUISocialMedia_server.dto.RoomDto;
import com.group4.HaUISocialMedia_server.dto.SearchObject;
import com.group4.HaUISocialMedia_server.dto.UserDto;
import com.group4.HaUISocialMedia_server.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/room")
public class RoomController {
    @Autowired
    private RoomService roomService;

    @GetMapping("/{roomId}")
    public ResponseEntity<RoomDto> getRoomById(@PathVariable UUID roomId) {
        RoomDto res = roomService.getRoomById(roomId);
        if (res == null)
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<RoomDto>(res, HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<RoomDto> updateRoom(@RequestBody RoomDto dto) {
        RoomDto res = roomService.updateRoom(dto);
        if (res == null)
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<RoomDto>(res, HttpStatus.OK);
    }

    @DeleteMapping("/{roomId}")
    public ResponseEntity<Boolean> deleteRoom(@PathVariable UUID roomId) {
        boolean res = roomService.deleteRoom(roomId);
        if (res == false)
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @PostMapping("/search")
    public ResponseEntity<List<RoomDto>> searchJoinedRooms(@RequestBody SearchObject searchObject) {
        if (searchObject == null)
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        List<RoomDto> res = roomService.searchRoom(searchObject);
        if (res == null)
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<List<RoomDto>>(res, HttpStatus.OK);
    }

    @PostMapping("/group")
    public ResponseEntity<RoomDto> createGroupChat(@RequestBody NewGroupChat newGroupChat) {
        if (newGroupChat == null)
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        if (newGroupChat.getJoinUserIds().length < 2)
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        RoomDto createdRoom = roomService.createGroupChat(newGroupChat);
        if (createdRoom != null)
            return new ResponseEntity<RoomDto>(createdRoom, HttpStatus.OK);
        return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("/group/{roomId}")
    public ResponseEntity<RoomDto> unjoinAnGroupChat(@PathVariable UUID roomId) {
        RoomDto res = roomService.unjoinGroupChat(roomId);
        if (res != null)
            return new ResponseEntity<RoomDto>(res, HttpStatus.OK);
        return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/group/{roomId}")
    public ResponseEntity<RoomDto> addUsersIntoGroupChat(@PathVariable UUID roomId, @RequestBody UUID[] userIds) {
        RoomDto res = roomService.addMultipleUsersIntoGroupChat(userIds, roomId);
        if (res != null)
            return new ResponseEntity<RoomDto>(res, HttpStatus.OK);
        return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/group/not-in/{roomId}")
    public ResponseEntity<List<UserDto>> getListFriendNotInRoom(@PathVariable UUID roomId) {
        List<UserDto> res = roomService.getListFriendNotInRoom(roomId);
        if (res != null)
            return new ResponseEntity<>(res, HttpStatus.OK);
        return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/joinedRooms")
    public ResponseEntity<List<RoomDto>> getAllJoinedRooms() {
        List<RoomDto> res = roomService.getAllJoinedRooms();
        if (res != null)
            return new ResponseEntity<>(res, HttpStatus.OK);
        return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/joinedGroupRooms")
    public ResponseEntity<List<RoomDto>> getAllGroupRooms() {
        List<RoomDto> res = roomService.getAllGroupRooms();
        if (res != null)
            return new ResponseEntity<>(res, HttpStatus.OK);
        return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/joinedPrivateRooms")
    public ResponseEntity<List<RoomDto>> getAllPrivateRooms() {
        List<RoomDto> res = roomService.getAllPrivateRooms();
        if (res != null)
            return new ResponseEntity<>(res, HttpStatus.OK);
        return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }
}
