package com.group4.HaUISocialMedia_server.entity;

import com.group4.HaUISocialMedia_server.dto.UserDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.Date;
import java.util.UUID;


@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tbl_board_record")
public class BoardRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(columnDefinition = "VARCHAR(36)")
    @JdbcTypeCode(SqlTypes.VARCHAR)
    private UUID id;

    @OneToOne
    @JoinColumn(name = "userId")
    private User user;

    private Integer numsOfA;

    private Integer numsOfBPlus;

    private Integer numsOfB;

    private Integer numsOfCPlus;

    private Integer numsOfC;

    private Integer numsOfDPlus;

    private Integer numsOfD;

    private Integer numsOfF;

    private Float averageScore;

    private Date lastModifyDate;
}
