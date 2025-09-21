package com.group4.HaUISocialMedia_server.service;

import com.group4.HaUISocialMedia_server.dto.LoginDto;
import com.group4.HaUISocialMedia_server.dto.UserDto;

public interface AuthService {
    String login(LoginDto loginDto);

    UserDto register(UserDto dto);
}
