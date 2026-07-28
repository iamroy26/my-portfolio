package com.osis.dao;

import com.osis.db.DatabaseManager;
import com.osis.model.Lecturer;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class LecturerDao {

    private static final String SELECT_ALL = "SELECT id, full_name, email, department, title FROM lecturers";
    private static final String INSERT_SQL = "INSERT INTO lecturers (id, full_name, email, password, department, title, programme_id) VALUES (?, ?, ?, ?, ?, ?, ?)";

    public List<Lecturer> findAll() {
        List<Lecturer> lecturers = new ArrayList<>();
        if (!DatabaseManager.getInstance().isHealthy()) {
            return lecturers;
        }
        try (Connection conn = DatabaseManager.getInstance().getConnection();
             PreparedStatement stmt = conn.prepareStatement(SELECT_ALL);
             ResultSet rs = stmt.executeQuery()) {
            while (rs.next()) {
                Lecturer lecturer = new Lecturer(
                        rs.getString("full_name"),
                        rs.getString("email"),
                        "hidden",
                        rs.getString("department"),
                        rs.getString("title")
                );
                lecturers.add(lecturer);
            }
        } catch (SQLException ex) {
            // ignore and return empty list
        }
        return lecturers;
    }

    public Optional<Lecturer> save(Lecturer lecturer) {
        if (!DatabaseManager.getInstance().isHealthy()) {
            return Optional.empty();
        }
        try (Connection conn = DatabaseManager.getInstance().getConnection();
             PreparedStatement stmt = conn.prepareStatement(INSERT_SQL)) {
            stmt.setString(1, java.util.UUID.randomUUID().toString());
            stmt.setString(2, lecturer.getFullName());
            stmt.setString(3, lecturer.getEmail());
            stmt.setString(4, lecturer.getPassword());
            stmt.setString(5, lecturer.getDepartment());
            stmt.setString(6, lecturer.getTitle());
            stmt.setString(7, null);
            stmt.executeUpdate();
            return Optional.of(lecturer);
        } catch (SQLException ex) {
            return Optional.empty();
        }
    }
}
