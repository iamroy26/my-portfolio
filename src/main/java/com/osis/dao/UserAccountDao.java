package com.osis.dao;

import com.osis.db.DatabaseManager;
import com.osis.model.UserAccount;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Optional;

/**
 * DAO for user accounts used in authentication and role-based access.
 */
public class UserAccountDao {

    private static final String SELECT_BY_EMAIL_ROLE = "SELECT id, full_name, email, password, role, created_at FROM users WHERE LOWER(email) = LOWER(?) AND role = ?";
    private static final String INSERT_SQL = "INSERT INTO users (id, full_name, email, password, role, created_at) VALUES (?, ?, ?, ?, ?, ?)";

    public Optional<UserAccount> findByEmailAndRole(String email, String role) {
        if (!DatabaseManager.getInstance().isHealthy()) {
            return Optional.empty();
        }
        try (Connection conn = DatabaseManager.getInstance().getConnection();
             PreparedStatement stmt = conn.prepareStatement(SELECT_BY_EMAIL_ROLE)) {
            stmt.setString(1, email.trim());
            stmt.setString(2, role);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    return Optional.of(mapRow(rs));
                }
            }
        } catch (SQLException ex) {
            return Optional.empty();
        }
        return Optional.empty();
    }

    public Optional<UserAccount> save(UserAccount account) {
        if (!DatabaseManager.getInstance().isHealthy()) {
            return Optional.empty();
        }
        try (Connection conn = DatabaseManager.getInstance().getConnection();
             PreparedStatement stmt = conn.prepareStatement(INSERT_SQL)) {
            stmt.setString(1, account.getId());
            stmt.setString(2, account.getFullName());
            stmt.setString(3, account.getEmail());
            stmt.setString(4, account.getPassword());
            stmt.setString(5, account.getRole());
            stmt.setTimestamp(6, Timestamp.valueOf(account.getCreatedAt()));
            stmt.executeUpdate();
            return Optional.of(account);
        } catch (SQLException ex) {
            return Optional.empty();
        }
    }

    private UserAccount mapRow(ResultSet rs) throws SQLException {
        return new UserAccount(
                rs.getString("id"),
                rs.getString("full_name"),
                rs.getString("email"),
                rs.getString("password"),
                rs.getString("role"),
                rs.getTimestamp("created_at").toLocalDateTime()
        );
    }
}
