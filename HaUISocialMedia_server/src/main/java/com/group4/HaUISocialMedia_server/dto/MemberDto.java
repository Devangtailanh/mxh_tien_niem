package com.group4.HaUISocialMedia_server.dto;

import com.group4.HaUISocialMedia_server.entity.Member;
import com.group4.HaUISocialMedia_server.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MemberDto {

    private UUID id;
    private Date joinDate;
    private Role role;
    private boolean isApproved;
    private UserDto user;
    private GroupDto group;

    public MemberDto(Member entity){
        this.id = entity.getId();
        this.joinDate = entity.getJoinDate();
        this.role = entity.getRole();
        this.isApproved = entity.isApproved();
        if(entity.getUser() != null)
            this.user = new UserDto(entity.getUser());
        if(entity.getGroup() != null)
            this.group = new GroupDto(entity.getGroup());
    }
}
