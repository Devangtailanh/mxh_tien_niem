package com.group4.HaUISocialMedia_server.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SearchObject {
    private int pageSize;
    private int pageIndex;
    private String keyWord;
    private UUID mileStoneId;
    private int type;
}
