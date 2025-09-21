package com.group4.HaUISocialMedia_server.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.io.Serializable;
import java.util.Date;
import java.util.UUID;

@Entity
@Data
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tbl_relationship")
public class Relationship implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(columnDefinition = "VARCHAR(36)")
    @JdbcTypeCode(SqlTypes.VARCHAR)
    private UUID id;

    @Column
    private Date lastModifyDate;

    @Column
    private boolean state; // 0 - is not friend yet, 1 - is friend

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "requestSenderId")
    private User requestSender;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "receiverId")
    private User receiver;

    @OneToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "roomId")
    private Room room;

}
