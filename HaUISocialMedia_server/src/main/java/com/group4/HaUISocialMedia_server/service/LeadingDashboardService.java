package com.group4.HaUISocialMedia_server.service;

import com.group4.HaUISocialMedia_server.dto.BoardRecordDto;
import com.group4.HaUISocialMedia_server.dto.PageResult;
import com.group4.HaUISocialMedia_server.dto.SearchDashboardDto;
import com.group4.HaUISocialMedia_server.entity.BoardRecord;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.UUID;

public interface LeadingDashboardService {
    public PageResult pagingLeadingDashboard(SearchDashboardDto searchObject);

    public BoardRecordDto getDashboardOfStudent(UUID userId);
}
