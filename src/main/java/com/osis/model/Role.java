package com.osis.model;

/** Enumerates the three supported system roles. */
public enum Role {
    ADMIN("Administrator"),
    STUDENT("Student"),
    LECTURER("Lecturer");

    private final String label;

    Role(String label) { this.label = label; }

    public String getLabel() { return label; }
}
