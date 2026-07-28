package com.osis.model;

/**
 * Programme entity, representing a degree or diploma track, normalized
 * separately from departments and students.
 */
public class Programme {

    private final String id;
    private String name;
    private String code;
    private Department department;

    public Programme(String name, String code, Department department) {
        this.id = java.util.UUID.randomUUID().toString();
        this.name = name;
        this.code = code;
        this.department = department;
    }

    public String getId() { return id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }
    public Department getDepartment() { return department; }
    public void setDepartment(Department department) { this.department = department; }

    @Override
    public String toString() {
        return code + " — " + name;
    }
}
