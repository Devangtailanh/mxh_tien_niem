package com.group4.HaUISocialMedia_server.rest;

import com.group4.HaUISocialMedia_server.dto.BoardRecordDto;
import com.group4.HaUISocialMedia_server.dto.MessageDto;
import com.group4.HaUISocialMedia_server.dto.PageResult;
import com.group4.HaUISocialMedia_server.dto.SearchDashboardDto;
import com.group4.HaUISocialMedia_server.entity.BoardRecord;
import com.group4.HaUISocialMedia_server.service.LeadingDashboardService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/leadingDashboard")
public class LeadingDashBoardController {
    @Autowired
    private LeadingDashboardService leadingDashboardService;

    @PostMapping(value = "")
    public ResponseEntity<PageResult> getLeadingDashBoard(@RequestBody SearchDashboardDto searchDashboardDto) {
        PageResult res = leadingDashboardService.pagingLeadingDashboard(searchDashboardDto);
        if (res == null) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @GetMapping(value = "/{userId}")
    public ResponseEntity<BoardRecordDto> getLeadingDashBoard(@PathVariable("userId") UUID userId) {
        BoardRecordDto res = leadingDashboardService.getDashboardOfStudent(userId);
        if (res == null) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }
}
