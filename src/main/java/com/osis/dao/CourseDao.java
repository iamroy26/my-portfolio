package com.osis.dao;

import com.osis.db.DatabaseManager;
import com.osis.model.Course;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class CourseDao {

    private static final String SELECT_ALL = "SELECT id, code, title, credit_hours FROM courses";
    private static final String INSERT_SQL = "INSERT INTO courses (id, code, title, credit_hours, department_id, programme_id) VALUES (?, ?, ?, ?, ?, ?)";

    public List<Course> findAll() {
        List<Course> courses = new ArrayList<>();
        if (!DatabaseManager.getInstance().isHealthy()) {
            return courses;
        }
        try (Connection conn = DatabaseManager.getInstance().getConnection();
             PreparedStatement stmt = conn.prepareStatement(SELECT_ALL);
             ResultSet rs = stmt.executeQuery()) {
            while (rs.next()) {
                Course course = new Course(
                        rs.getString("code"),
                        rs.getString("title"),
                        rs.getInt("credit_hours")
                );
                courses.add(course);
            }
        } catch (SQLException ex) {
            // ignore and return empty list
        }
        return courses;
    }

    public Optional<Course> save(Course course) {
        if (!DatabaseManager.getInstance().isHealthy()) {
            return Optional.empty();
        }
        try (Connection conn = DatabaseManager.getInstance().getConnection();
             PreparedStatement stmt = conn.prepareStatement(INSERT_SQL)) {
            stmt.setString(1, course.getId());
            stmt.setString(2, course.getCode());
            stmt.setString(3, course.getTitle());
            stmt.setInt(4, course.getCreditHours());
            stmt.setString(5, null);
            stmt.setString(6, null);
            stmt.executeUpdate();
            return Optional.of(course);
        } catch (SQLException ex) {
            return Optional.empty();
        }
    }
}
