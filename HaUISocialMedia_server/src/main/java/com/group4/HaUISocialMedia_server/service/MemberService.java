package com.group4.HaUISocialMedia_server.service;

import com.group4.HaUISocialMedia_server.dto.MemberDto;

import java.util.UUID;

public interface MemberService {

    public MemberDto createUserGroup(MemberDto memberDto);

    public MemberDto updateUserGroup(MemberDto memberDto);

    public boolean deleteUserGroup(UUID userGroupId);

}
