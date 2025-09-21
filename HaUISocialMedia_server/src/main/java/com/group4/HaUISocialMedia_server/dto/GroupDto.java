package com.group4.HaUISocialMedia_server.dto;

import com.group4.HaUISocialMedia_server.entity.Group;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.Objects;
import java.util.Set;
import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class GroupDto {

    private UUID id;
    private String code;
    private String name;
    private String description;
    private String avatar;
    private String backGroundImage;
    private Date createDate;
    private UserDto user;
    private Set<MemberDto> userJoins;
    private Set<PostDto> posts;

    //this field only for display relationship between current using user and the group they're viewing
    private MemberDto relationship;

    public GroupDto(Group entity) {
        this.id = entity.getId();
        this.code = entity.getCode();
        this.name = entity.getName();
        this.description = entity.getDescription();
        this.avatar = entity.getAvatar();
        this.backGroundImage = entity.getBackGroundImage();
        this.createDate = entity.getCreateDate();
        if (entity.getUser() != null)
            this.user = new UserDto(entity.getUser());
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof GroupDto groupDto)) return false;
        return Objects.equals(getId(), groupDto.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
    }
}
