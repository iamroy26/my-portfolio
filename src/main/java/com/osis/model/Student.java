package com.osis.model;

import java.util.ArrayList;
import java.util.List;

/** Student role. Inherits common identity fields from Person. */
public class Student extends Person {

    private String department;
    private int yearLevel;
    private int currentSemester;
    private final List<Course> enrolledCourses = new ArrayList<>();
    private final List<Grade> grades = new ArrayList<>();
    public static final int MAX_INITIAL_REGISTRATION_COURSES = 5;

    public Student(String fullName, String email, String password, String department, int yearLevel) {
        this(fullName, email, password, department, yearLevel, 1);
    }

    public Student(String fullName, String email, String password, String department, int yearLevel, int currentSemester) {
        super(fullName, email, password);
        this.department = department;
        this.yearLevel = yearLevel;
        this.currentSemester = currentSemester;
    }

    @Override
    public String getRole() { return Role.STUDENT.getLabel(); }

    @Override
    public String getDashboardGreeting() {
        return "Welcome back, " + getFullName() + "! Here is your academic overview.";
    }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }
    public int getYearLevel() { return yearLevel; }
    public void setYearLevel(int yearLevel) { this.yearLevel = yearLevel; }
    public int getCurrentSemester() { return currentSemester; }
    public void setCurrentSemester(int currentSemester) { this.currentSemester = currentSemester; }

    public boolean isEligibleForInitialRegistration() {
        return yearLevel == 1 && currentSemester == 1;
    }

    public String getStudyStage() {
        return "Year " + yearLevel + " · Semester " + currentSemester;
    }

    public List<Course> getEnrolledCourses() { return enrolledCourses; }

    public boolean canRegisterMoreCourses() {
        return enrolledCourses.size() < MAX_INITIAL_REGISTRATION_COURSES;
    }

    public boolean isCourseRegistered(Course course) {
        return enrolledCourses.contains(course);
    }

    public void addCourse(Course course) {
        if (!enrolledCourses.contains(course) && canRegisterMoreCourses()) {
            enrolledCourses.add(course);
            course.enroll(this);
        }
    }

    public List<Grade> getGrades() { return grades; }
    public void addGrade(Grade grade) { grades.add(grade); }

    /** Computes a simple GPA-like average across all recorded grades. */
    public double getAverageScore() {
        if (grades.isEmpty()) return 0;
        double total = 0;
        for (Grade g : grades) total += g.getScore();
        return total / grades.size();
    }
}
