package com.group4.HaUISocialMedia_server.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ErrorDto {
    private int statusCode;
    private String message;
    private Boolean data;
    private String code;
}
