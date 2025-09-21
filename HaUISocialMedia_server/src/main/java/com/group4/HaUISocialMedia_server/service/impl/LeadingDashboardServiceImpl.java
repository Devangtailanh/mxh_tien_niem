package com.group4.HaUISocialMedia_server.service.impl;

import com.group4.HaUISocialMedia_server.dto.BoardRecordDto;
import com.group4.HaUISocialMedia_server.dto.PageResult;
import com.group4.HaUISocialMedia_server.dto.SearchDashboardDto;
import com.group4.HaUISocialMedia_server.entity.BoardRecord;
import com.group4.HaUISocialMedia_server.entity.User;
import com.group4.HaUISocialMedia_server.repository.BoardRecordRepository;
import com.group4.HaUISocialMedia_server.repository.UserRepository;
import com.group4.HaUISocialMedia_server.service.LeadingDashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class LeadingDashboardServiceImpl implements LeadingDashboardService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BoardRecordRepository boardRecordRepository;

    @Override
    public PageResult pagingLeadingDashboard(SearchDashboardDto searchObject) {
        if (searchObject == null) return null;

        String kw = "";
        if (searchObject.getKeyWord() != null) kw = insertPercent(searchObject.getKeyWord());

        Page<BoardRecord> topDashboard = boardRecordRepository.getLeadingDashboard(kw,
                PageRequest.of(searchObject.getPageIndex() - 1, searchObject.getPageSize()));
        List<BoardRecordDto> res = new ArrayList<>();

        for (BoardRecord record : topDashboard) {
            int total = record.getNumsOfA() + record.getNumsOfBPlus() + record.getNumsOfB() + record.getNumsOfCPlus() + record.getNumsOfC() + record.getNumsOfDPlus() + record.getNumsOfD();
            if (total == 0) {
                record.setAverageScore(0f);
            } else {
                double sum =
                        record.getNumsOfA()     * 4.0 +
                                record.getNumsOfBPlus() * 3.5 +
                                record.getNumsOfB()     * 3.0 +
                                record.getNumsOfCPlus() * 2.5 +
                                record.getNumsOfC()     * 2.0 +
                                record.getNumsOfDPlus() * 1.5 +
                                record.getNumsOfD()     * 1.0;

                double avg = sum / total;
                double rounded = Math.round(avg * 100.0) / 100.0; // 2 chữ số
                record.setAverageScore((float) rounded);
            }
            BoardRecordDto boardRecordDto = new BoardRecordDto(record);
            boardRecordDto.setTotalObject(total);
            res.add(boardRecordDto);
        }

        PageResult pageResult = new PageResult();
        pageResult.setTotalElements(topDashboard.getTotalElements());
        pageResult.setPageSize((long) searchObject.getPageSize());
        pageResult.setPageIndex((long) searchObject.getPageIndex());
        pageResult.setData(res);
        pageResult.setTotalPages(topDashboard.getTotalPages());
        pageResult.setKeyword(searchObject.getKeyWord());

        return pageResult;
    }

    @Override
    public BoardRecordDto getDashboardOfStudent(UUID userId) {
        if (userId == null) return null;

        User student = userRepository.findById(userId).orElse(null);
        if (student == null || !student.getRole().equals("USER")) return null;

        BoardRecord record = boardRecordRepository.getRecordOfStudent(userId);

        return new BoardRecordDto(record);
    }

    public String insertPercent(String word) {
        if (word == null || word.length() == 0) return "";
        StringBuilder result = new StringBuilder();

        result.append('%');

        for (int i = 0; i < word.length(); i++) {
            result.append(word.charAt(i));
            result.append('%');
        }

        return result.toString();
    }
}
