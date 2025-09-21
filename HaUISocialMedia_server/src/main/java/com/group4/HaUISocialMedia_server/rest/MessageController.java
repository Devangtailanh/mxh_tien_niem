package com.group4.HaUISocialMedia_server.rest;

import com.group4.HaUISocialMedia_server.dto.MessageDto;
import com.group4.HaUISocialMedia_server.dto.SearchObject;
import com.group4.HaUISocialMedia_server.service.MessageService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/message")
public class MessageController {
    @Autowired
    private MessageService messageService;

    @PostMapping("/pre20Message")
    public ResponseEntity<List<MessageDto>> findTop20PreviousByMileStone(@RequestBody SearchObject searchObject) {
        List<MessageDto> res = messageService.findTop20PreviousByMileStone(searchObject);
        if (res == null) return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @GetMapping("/latest20Message/{roomId}")
    public ResponseEntity<List<MessageDto>> get20LatestMessagesByRoomId(@PathVariable UUID roomId) {
        List<MessageDto> res = messageService.get20LatestMessagesByRoomId(roomId);
        if (res == null) return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<MessageDto> sendMessage(@RequestBody MessageDto message) {
        MessageDto res = messageService.sendMessage(message);
        if (res == null) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<MessageDto>(res, HttpStatus.OK);
    }
}
