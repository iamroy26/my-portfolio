package com.osis.model;

/**
 * University department entity used for program classification and course ownership.
 */
public class Department {

    private final String id;
    private String name;
    private String code;

    public Department(String name, String code) {
        this.id = java.util.UUID.randomUUID().toString();
        this.name = name;
        this.code = code;
    }

    public String getId() { return id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    @Override
    public String toString() {
        return code + " — " + name;
    }
}
