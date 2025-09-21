package com.group4.HaUISocialMedia_server.repository;

import com.group4.HaUISocialMedia_server.entity.BoardRecord;
import com.group4.HaUISocialMedia_server.entity.Classroom;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;


@Repository
public interface BoardRecordRepository extends JpaRepository<BoardRecord, UUID> {
    @Query("SELECT r from BoardRecord r where r.user.id = :userId")
    BoardRecord getRecordOfStudent(@Param("userId") UUID userId);

    @Query("""
SELECT r
FROM BoardRecord r
WHERE (:keyword IS NULL OR :keyword = '' 
       OR lower(r.user.code)      LIKE lower(concat('%', :keyword, '%'))
       OR lower(r.user.username)  LIKE lower(concat('%', :keyword, '%'))
       OR lower(r.user.firstName) LIKE lower(concat('%', :keyword, '%')))
ORDER BY
  CASE 
    WHEN (r.numsOfA + r.numsOfBPlus + r.numsOfB + r.numsOfCPlus 
          + r.numsOfC + r.numsOfDPlus + r.numsOfD) = 0
    THEN 0.0
    ELSE (
      ( r.numsOfA * 4.0 + r.numsOfBPlus * 3.5 + r.numsOfB * 3.0 
        + r.numsOfCPlus * 2.5 + r.numsOfC * 2.0 
        + r.numsOfDPlus * 1.5 + r.numsOfD * 1.0 )
      / ( r.numsOfA + r.numsOfBPlus + r.numsOfB + r.numsOfCPlus 
          + r.numsOfC + r.numsOfDPlus + r.numsOfD )
    )
  END DESC,
  (r.numsOfA + r.numsOfBPlus + r.numsOfB + r.numsOfCPlus 
   + r.numsOfC + r.numsOfDPlus + r.numsOfD) DESC
""")
    Page<BoardRecord> getLeadingDashboard(@Param("keyword") String keyword, Pageable pageable);

}
