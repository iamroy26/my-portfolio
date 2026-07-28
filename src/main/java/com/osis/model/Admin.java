package com.osis.model;

/** Administrator role with elevated management privileges. */
public class Admin extends Person {

    private String accessLevel; // e.g. "Super Admin", "Registrar"

    public Admin(String fullName, String email, String password, String accessLevel) {
        super(fullName, email, password);
        this.accessLevel = accessLevel;
    }

    @Override
    public String getRole() { return Role.ADMIN.getLabel(); }

    @Override
    public String getDashboardGreeting() {
        return "Welcome, " + getFullName() + ". System overview is ready.";
    }

    public String getAccessLevel() { return accessLevel; }
    public void setAccessLevel(String accessLevel) { this.accessLevel = accessLevel; }
}
