package com.osis.model;

import java.time.LocalDateTime;

/**
 * Join entity representing a student course registration for a semester.
 */
public class Enrollment {

    private final String id;
    private final Student student;
    private final Course course;
    private final Semester semester;
    private final LocalDateTime registeredAt;
    private String status;

    public Enrollment(Student student, Course course, Semester semester) {
        this.id = java.util.UUID.randomUUID().toString();
        this.student = student;
        this.course = course;
        this.semester = semester;
        this.registeredAt = LocalDateTime.now();
        this.status = "ENROLLED";
    }

    public String getId() { return id; }
    public Student getStudent() { return student; }
    public Course getCourse() { return course; }
    public Semester getSemester() { return semester; }
    public LocalDateTime getRegisteredAt() { return registeredAt; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
