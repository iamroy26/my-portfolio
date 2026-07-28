package com.osis.model;

/** Represents a grade/result awarded to a Student for a given Course. */
public class Grade {

    private final Student student;
    private final Course course;
    private double score; // 0 - 100
    private String letter;

    public Grade(Student student, Course course, double score) {
        this.student = student;
        this.course = course;
        setScore(score);
    }

    public void setScore(double score) {
        this.score = score;
        this.letter = computeLetter(score);
    }

    private String computeLetter(double s) {
        if (s >= 90) return "A";
        if (s >= 80) return "B";
        if (s >= 70) return "C";
        if (s >= 60) return "D";
        return "F";
    }

    public Student getStudent() { return student; }
    public Course getCourse() { return course; }
    public double getScore() { return score; }
    public String getLetter() { return letter; }
}
