package com.group4.HaUISocialMedia_server.repository;

import com.group4.HaUISocialMedia_server.dto.SearchObject;
import com.group4.HaUISocialMedia_server.entity.Classroom;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.UUID;


@Repository
public interface ClassroomRepository extends JpaRepository<Classroom, UUID> {

   // @Modifying
    //Modifying là có tác dụng cho phép các câu lệnh JPQL không chỉ
    //Select mà còn nếu muốn viết update hay delete đều đc
    //Ở trường hợp này viết cho thừa để chắc chắn
//    @Query("SELECT p FROM Classroom p")
//    public List<Classroom> findAnyClass(@RequestBody SearchObject searchObject);

    // Cách 2 của phân trang
//    @Query(value = "SELECT * FROM tbl_class LIMIT :limit OFFSET :offset",
//            nativeQuery = true)
//    List<Classroom> findAnyClassroom(@Param("limit") int limit, @Param("offset") int offset);
    //Nhưng offset ở đây là số đối tượng bỏ qua ở đầu

    @Query("SELECT c FROM Classroom c order by c.code")
    public List<Classroom> getAllSortByCode();

    @Query("SELECT c FROM Classroom c order by c.code")
    public List<Classroom> getPagingClassroom(Pageable pageable);

    public Classroom findByName(String name);
}
