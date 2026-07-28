package com.osis.model;

import java.util.ArrayList;
import java.util.List;

/** Lecturer role. Inherits common identity fields from Person. */
public class Lecturer extends Person {

    private String department;
    private String title; // e.g. "Senior Lecturer", "Professor"
    private final List<Course> assignedCourses = new ArrayList<>();

    public Lecturer(String fullName, String email, String password, String department, String title) {
        super(fullName, email, password);
        this.department = department;
        this.title = title;
    }

    @Override
    public String getRole() { return Role.LECTURER.getLabel(); }

    @Override
    public String getDashboardGreeting() {
        return "Hello " + title + " " + getFullName() + ", here are your assigned courses.";
    }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public List<Course> getAssignedCourses() { return assignedCourses; }
    public void assignCourse(Course course) {
        if (!assignedCourses.contains(course)) {
            assignedCourses.add(course);
            course.setAssignedLecturer(this);
        }
    }
}
