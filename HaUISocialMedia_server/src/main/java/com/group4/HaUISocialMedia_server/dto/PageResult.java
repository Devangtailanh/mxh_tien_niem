package com.group4.HaUISocialMedia_server.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PageResult {
    private Long totalElements;
    private List<? extends Object> data;
    private Long pageIndex;
    private Long pageSize;
    private Integer totalPages;
    private String keyword;

}

