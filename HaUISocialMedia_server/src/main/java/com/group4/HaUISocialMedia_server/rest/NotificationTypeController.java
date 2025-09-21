package com.group4.HaUISocialMedia_server.rest;

import com.group4.HaUISocialMedia_server.dto.NotificationTypeDto;
import com.group4.HaUISocialMedia_server.dto.SearchObject;
import com.group4.HaUISocialMedia_server.service.NotificationTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/notification_type")
public class NotificationTypeController {

    @Autowired
    private NotificationTypeService notificationTypeService;

    @GetMapping("/all")
    public ResponseEntity<Set<NotificationTypeDto>> getAllNotification(){
        Set<NotificationTypeDto> se = notificationTypeService.findAll();
        if(se == null)
            return new ResponseEntity<>(se, HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(se, HttpStatus.OK);
    }

    @PostMapping("/save")
    public ResponseEntity<NotificationTypeDto> saveNotification(@RequestBody NotificationTypeDto notificationTypeDto){
        NotificationTypeDto notificationTypeDto1 = notificationTypeService.save(notificationTypeDto);
        if(notificationTypeDto1 == null)
            return new ResponseEntity<>(notificationTypeDto1, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(notificationTypeDto1, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<NotificationTypeDto> updateNotification(@RequestBody NotificationTypeDto notificationTypeDto){
        NotificationTypeDto notificationTypeDto1 = notificationTypeService.update(notificationTypeDto);
        if(notificationTypeDto1 == null)
            return new ResponseEntity<>(notificationTypeDto1, HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(notificationTypeDto1, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Boolean> deleteNotificatioin(@PathVariable("id")UUID id){
        Boolean result = notificationTypeService.delete(id);
        if(!result)
            return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping("/paging")
    @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity<Set<NotificationTypeDto>> pagingNotificatioin(@RequestBody SearchObject searchObject){
        Set<NotificationTypeDto> se = notificationTypeService.getAnyNotificationType(searchObject);
        if(se == null)
            return new ResponseEntity<>(se, HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(se, HttpStatus.OK);
    }

}
