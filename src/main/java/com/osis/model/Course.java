package com.osis.model;

import java.util.ArrayList;
import java.util.List;

/**
 * Represents a course offered by the institution.
 * A course may be assigned to one Lecturer and have many enrolled Students.
 */
public class Course {

    private final String id;
    private final String code;
    private String title;
    private int creditHours;
    private Lecturer assignedLecturer; // may be null (unassigned)
    private final List<Student> enrolledStudents = new ArrayList<>();

    public Course(String code, String title, int creditHours) {
        this.id = java.util.UUID.randomUUID().toString();
        this.code = code;
        this.title = title;
        this.creditHours = creditHours;
    }

    public String getId() { return id; }
    public String getCode() { return code; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public int getCreditHours() { return creditHours; }
    public void setCreditHours(int creditHours) { this.creditHours = creditHours; }

    public Lecturer getAssignedLecturer() { return assignedLecturer; }
    public void setAssignedLecturer(Lecturer lecturer) { this.assignedLecturer = lecturer; }

    public List<Student> getEnrolledStudents() { return enrolledStudents; }

    public void enroll(Student student) {
        if (!enrolledStudents.contains(student)) {
            enrolledStudents.add(student);
        }
    }

    public void unenroll(Student student) {
        enrolledStudents.remove(student);
    }

    public String getLecturerName() {
        return assignedLecturer == null ? "Unassigned" : assignedLecturer.getFullName();
    }

    @Override
    public String toString() {
        return code + " - " + title;
    }
}
