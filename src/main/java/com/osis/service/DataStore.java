package com.osis.service;

import com.osis.db.DatabaseManager;
import com.osis.model.*;
import com.osis.util.ActionLogger;

import java.util.ArrayList;
import java.util.List;

/**
 * Singleton in-memory data store. Acts as the "Service Layer" backing for
 * all dashboards. In a real system this would be replaced by a database
 * access layer / repository pattern without changing the UI code.
 */
public class DataStore {

    private static final DataStore INSTANCE = new DataStore();

    private final List<Admin> admins = new ArrayList<>();
    private final List<Student> students = new ArrayList<>();
    private final List<Lecturer> lecturers = new ArrayList<>();
    private final List<Course> courses = new ArrayList<>();

    private Person currentUser;

    private DataStore() {
        seed();
    }

    public static DataStore getInstance() { return INSTANCE; }

    private void seed() {
        admins.add(new Admin("Grace Mensah", "admin@osis.edu", "admin123", "Super Admin"));

        Lecturer l1 = new Lecturer("Dr. Kwame Asante", "kasante@osis.edu", "lect123", "Computer Science", "Senior Lecturer");
        Lecturer l2 = new Lecturer("Dr. Ama Owusu", "aowusu@osis.edu", "lect123", "Mathematics", "Professor");
        lecturers.add(l1);
        lecturers.add(l2);

        Course c1 = new Course("CSC101", "Introduction to Programming", 3);
        Course c2 = new Course("CSC202", "Data Structures & Algorithms", 4);
        Course c3 = new Course("MTH150", "Calculus I", 3);
        Course c4 = new Course("CSC305", "Database Systems", 3);
        courses.add(c1); courses.add(c2); courses.add(c3); courses.add(c4);

        l1.assignCourse(c1);
        l1.assignCourse(c2);
        l1.assignCourse(c4);
        l2.assignCourse(c3);

        Student s1 = new Student("John Doe", "jdoe@osis.edu", "stud123", "Computer Science", 2, 2);
        Student s2 = new Student("Mary Johnson", "mjohnson@osis.edu", "stud123", "Computer Science", 2, 2);
        Student s3 = new Student("Kojo Boateng", "kboateng@osis.edu", "stud123", "Mathematics", 1, 1);
        students.add(s1); students.add(s2); students.add(s3);

        s1.addCourse(c1); s1.addCourse(c2);
        s2.addCourse(c1); s2.addCourse(c4);
        s3.addCourse(c3);

        s1.addGrade(new Grade(s1, c1, 88));
        s1.addGrade(new Grade(s1, c2, 76));
        s2.addGrade(new Grade(s2, c1, 92));
        s3.addGrade(new Grade(s3, c3, 81));
    }

    // ----- Authentication -----
    public Person authenticate(String email, String password, Role role) {
        List<? extends Person> pool = switch (role) {
            case ADMIN -> admins;
            case STUDENT -> students;
            case LECTURER -> lecturers;
        };
        for (Person p : pool) {
            if (p.getEmail().equalsIgnoreCase(email) && p.getPassword().equals(password)) {
                currentUser = p;
                return p;
            }
        }
        return null;
    }

    public Person getCurrentUser() { return currentUser; }
    public void logout() { currentUser = null; }

    public void initDatabase() {
        DatabaseManager.getInstance().initialize();
        ActionLogger.info("db:init", "Fallback data store requested database initialization.");
    }

    // ----- Accessors -----
    public List<Admin> getAdmins() { return admins; }
    public List<Student> getStudents() { return students; }
    public List<Lecturer> getLecturers() { return lecturers; }
    public List<Course> getCourses() { return courses; }

    // ----- Mutations -----
    public void addStudent(Student s) { students.add(s); }
    public void removeStudent(Student s) { students.remove(s); }

    public void addLecturer(Lecturer l) { lecturers.add(l); }
    public void removeLecturer(Lecturer l) { lecturers.remove(l); }

    public void addCourse(Course c) { courses.add(c); }
    public void removeCourse(Course c) { courses.remove(c); }

    public Course findCourseByCode(String code) {
        return courses.stream().filter(c -> c.getCode().equalsIgnoreCase(code)).findFirst().orElse(null);
    }
}
