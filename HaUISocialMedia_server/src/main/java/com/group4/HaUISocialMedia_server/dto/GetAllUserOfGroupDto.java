package com.group4.HaUISocialMedia_server.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GetAllUserOfGroupDto {

    private Set<MemberDto> getAllUserJoined;

    private Set<MemberDto> getAllUserWaiting;

}
