package com.osis.model;

import java.util.UUID;

/**
 * Abstract base class for all system actors (Admin, Student, Lecturer).
 * Demonstrates ENCAPSULATION (private fields + getters/setters) and
 * forms the root of the INHERITANCE hierarchy used across the system.
 */
public abstract class Person {

    private final String id;
    private String fullName;
    private String email;
    private String password;
    private String avatarInitials;

    protected Person(String fullName, String email, String password) {
        this.id = UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        this.fullName = fullName;
        this.email = email;
        this.password = password;
        this.avatarInitials = computeInitials(fullName);
    }

    private String computeInitials(String name) {
        if (name == null || name.isBlank()) return "??";
        String[] parts = name.trim().split("\\s+");
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < Math.min(2, parts.length); i++) {
            sb.append(Character.toUpperCase(parts[i].charAt(0)));
        }
        return sb.toString();
    }

    /** Polymorphic method: every role describes itself differently. */
    public abstract String getRole();

    /** Polymorphic method: each dashboard greeting differs per role. */
    public abstract String getDashboardGreeting();

    public String getId() { return id; }
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) {
        this.fullName = fullName;
        this.avatarInitials = computeInitials(fullName);
    }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getAvatarInitials() { return avatarInitials; }

    @Override
    public String toString() {
        return fullName + " (" + getRole() + ")";
    }
}
