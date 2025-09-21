package com.group4.HaUISocialMedia_server.dto;

import com.group4.HaUISocialMedia_server.entity.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private UUID id;
    private String code;
    private String firstName;
    private String lastName;
    private String email;
    private String username;
    private String password;
    private String address;
    private boolean gender;
    private Date birthDate;
    private String avatar;
    private String background;
    private String role;
    private String phoneNumber;
    private Boolean disable;
    private ClassroomDto classroomDto;
    private RelationshipDto relationshipDto;
    private Set<MemberDto> groups;
    private List<UserDto> mutualFriends;

//    private Set<UserCourse> userCourses;
//    private Set<Message> messages;
//    private Set<UserRoom> userRooms;
//    private Set<Relationship> requestSenders;
//    private Set<Relationship> receivers;
//    private Set<Notification> notifications;
//    private Set<Like> likes;
//    private Set<Comment> comments;

    public UserDto(User entity) {
        this.id = entity.getId();
        this.code = entity.getCode();
        this.firstName = entity.getFirstName();
        this.lastName = entity.getLastName();
        this.username = entity.getUsername();
        this.role = entity.getRole();
        this.email =entity.getEmail();
        this.phoneNumber = entity.getPhoneNumber();
        this.address = entity.getAddress();
        this.birthDate = entity.getBirthDate();
        this.gender = entity.isGender();
        this.avatar = entity.getAvatar();
        this.background = entity.getBackground();
        this.disable = entity.isDisable();
        if (entity.getClassroom() != null)
            this.classroomDto = new ClassroomDto(entity.getClassroom());
    }
}
