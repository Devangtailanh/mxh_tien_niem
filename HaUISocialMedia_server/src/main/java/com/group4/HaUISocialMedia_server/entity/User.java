package com.group4.HaUISocialMedia_server.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;
import java.util.UUID;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tbl_user")
public class User implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(columnDefinition = "VARCHAR(36)")
    @JdbcTypeCode(SqlTypes.VARCHAR)
    private UUID id;

    @Column
    private String code;

    @Column
    private String firstName;

    @Column
    private String lastName;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    private boolean gender;

    @Column(columnDefinition = "longtext")
    private String address;

    private Date birthDate;

    private String phoneNumber;

    private String role;

    private String avatar;

    private String background;

    private boolean disable;

    @ManyToOne
    @JoinColumn(name = "class_id")
    @JsonIgnore
    private Classroom classroom;

    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER)
    private Set<UserCourse> userCourses;

    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER)
    private Set<Message> messages;

    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER)
    @JsonIgnore
    private Set<UserRoom> userRooms;

    @OneToMany(mappedBy = "requestSender")
    @JsonIgnore
    private Set<Relationship> requestSenders;

    @OneToMany(mappedBy = "receiver")
    @JsonIgnore
    private Set<Relationship> receivers;

    @OneToMany(mappedBy = "userLike")
    private Set<Like> likes;

    @OneToMany(mappedBy = "owner")
    private Set<Comment> comments;

    @OneToMany(mappedBy = "actor")
    private Set<Notification> createdNotifications;

    @OneToMany(mappedBy = "owner")
    private Set<Notification> notifications;

    @OneToOne(mappedBy = "user", cascade = CascadeType.REMOVE)
    private BoardRecord boardRecord;

    //    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
//    @JoinTable(name = "users_roles",
//            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
//            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id")
//    )
//    private Set<Role> roles;

    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER)
    @JsonIgnore
    private Set<Group> groupCreated;

    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER)
    @JsonIgnore
    private Set<Member> groups;
}
