package com.osis.model;

import java.time.LocalDateTime;

/**
 * Authentication record for the OSIS system. Separate from role-specific
 * domain entities to keep user management normalized and secure.
 */
public class UserAccount {

    private final String id;
    private final String fullName;
    private final String email;
    private final String password;
    private final String role;
    private final LocalDateTime createdAt;

    public UserAccount(String id, String fullName, String email, String password, String role, LocalDateTime createdAt) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.password = password;
        this.role = role;
        this.createdAt = createdAt;
    }

    public UserAccount(String fullName, String email, String password, String role) {
        this(java.util.UUID.randomUUID().toString(), fullName, email, password, role, LocalDateTime.now());
    }

    public String getId() { return id; }
    public String getFullName() { return fullName; }
    public String getEmail() { return email; }
    public String getPassword() { return password; }
    public String getRole() { return role; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}
