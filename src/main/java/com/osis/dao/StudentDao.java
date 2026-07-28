package com.osis.dao;

import com.osis.db.DatabaseManager;
import com.osis.model.Student;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class StudentDao {

    private static final String SELECT_ALL = "SELECT id, full_name, email, department, year_level FROM students";
    private static final String INSERT_SQL = "INSERT INTO students (id, full_name, email, password, department, year_level, programme_id) VALUES (?, ?, ?, ?, ?, ?, ?)";

    public List<Student> findAll() {
        List<Student> students = new ArrayList<>();
        if (!DatabaseManager.getInstance().isHealthy()) {
            return students;
        }
        try (Connection conn = DatabaseManager.getInstance().getConnection();
             PreparedStatement stmt = conn.prepareStatement(SELECT_ALL);
             ResultSet rs = stmt.executeQuery()) {
            while (rs.next()) {
                Student student = new Student(
                        rs.getString("full_name"),
                        rs.getString("email"),
                        "hidden",
                        rs.getString("department"),
                        rs.getInt("year_level")
                );
                students.add(student);
            }
        } catch (SQLException ex) {
            // ignore and return empty list
        }
        return students;
    }

    public Optional<Student> save(Student student) {
        if (!DatabaseManager.getInstance().isHealthy()) {
            return Optional.empty();
        }
        try (Connection conn = DatabaseManager.getInstance().getConnection();
             PreparedStatement stmt = conn.prepareStatement(INSERT_SQL)) {
            stmt.setString(1, java.util.UUID.randomUUID().toString());
            stmt.setString(2, student.getFullName());
            stmt.setString(3, student.getEmail());
            stmt.setString(4, student.getPassword());
            stmt.setString(5, student.getDepartment());
            stmt.setInt(6, student.getYearLevel());
            stmt.setString(7, null);
            stmt.executeUpdate();
            return Optional.of(student);
        } catch (SQLException ex) {
            return Optional.empty();
        }
    }
}
