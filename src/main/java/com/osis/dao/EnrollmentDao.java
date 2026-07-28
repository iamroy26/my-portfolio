package com.osis.dao;

import com.osis.db.DatabaseManager;
import com.osis.model.Enrollment;
import com.osis.model.Semester;
import com.osis.model.Student;
import com.osis.model.Course;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * JDBC DAO responsible for persistence of enrollment records.
 */
public class EnrollmentDao {

    private static final String INSERT_SQL = "INSERT INTO enrollments (student_id, course_id, semester_id, registered_at, status) VALUES (?, ?, ?, ?, ?)";
    private static final String SELECT_BY_STUDENT = "SELECT e.id, e.registered_at, e.status, c.id AS course_id, c.code AS course_code, c.title AS course_title, c.credit_hours, s.id AS semester_id, s.name AS semester_name, s.start_date, s.end_date, s.active FROM enrollments e JOIN courses c ON e.course_id = c.id JOIN semesters s ON e.semester_id = s.id WHERE e.student_id = ?";

    public Optional<Enrollment> save(Enrollment enrollment) {
        if (!DatabaseManager.getInstance().isHealthy()) {
            return Optional.empty();
        }
        try (Connection conn = DatabaseManager.getInstance().getConnection();
             PreparedStatement stmt = conn.prepareStatement(INSERT_SQL, PreparedStatement.RETURN_GENERATED_KEYS)) {
            stmt.setString(1, enrollment.getStudent().getId());
            stmt.setString(2, enrollment.getCourse().getCode());
            stmt.setString(3, enrollment.getSemester().getId());
            stmt.setObject(4, enrollment.getRegisteredAt());
            stmt.setString(5, enrollment.getStatus());
            stmt.executeUpdate();
            return Optional.of(enrollment);
        } catch (SQLException ex) {
            return Optional.empty();
        }
    }

    public List<Enrollment> findByStudent(Student student) {
        List<Enrollment> enrollments = new ArrayList<>();
        if (!DatabaseManager.getInstance().isHealthy()) {
            return enrollments;
        }
        try (Connection conn = DatabaseManager.getInstance().getConnection();
             PreparedStatement stmt = conn.prepareStatement(SELECT_BY_STUDENT)) {
            stmt.setString(1, student.getId());
            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    Course course = new Course(rs.getString("course_code"), rs.getString("course_title"), rs.getInt("credit_hours"));
                    Semester semester = new Semester(rs.getString("semester_name"), rs.getDate("start_date").toLocalDate(), rs.getDate("end_date").toLocalDate(), rs.getBoolean("active"));
                    Enrollment enrollment = new Enrollment(student, course, semester);
                    enrollment.setStatus(rs.getString("status"));
                    enrollments.add(enrollment);
                }
            }
        } catch (SQLException ex) {
            // fallback to empty list
        }
        return enrollments;
    }
}
