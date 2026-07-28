package com.osis.ui;

import com.osis.model.*;
import com.osis.ui.components.ContentCard;
import com.osis.ui.components.StatCard;
import com.osis.util.Animations;
import javafx.collections.FXCollections;
import javafx.geometry.Pos;
import javafx.scene.control.*;
import javafx.scene.control.cell.PropertyValueFactory;
import javafx.scene.layout.HBox;
import javafx.scene.layout.Region;
import javafx.scene.layout.VBox;

public class LecturerDashboardView extends DashboardShell {

    private final Lecturer lecturer;

    public LecturerDashboardView(Person user, Runnable onLogout) {
        super("OSIS", user,
                new String[]{"📊", "📘", "🎓", "📝"},
                new String[]{"Overview", "My Courses", "My Students", "Assign Grades"},
                onLogout);
        this.lecturer = (Lecturer) user;
        init();
    }

    @Override
    protected Region buildPage(int index) {
        return switch (index) {
            case 1 -> buildCoursesPage();
            case 2 -> buildStudentsPage();
            case 3 -> buildGradesPage();
            default -> buildOverviewPage();
        };
    }

    private Region buildOverviewPage() {
        VBox root = new VBox(20);
        Label welcome = new Label(lecturer.getDashboardGreeting());
        welcome.getStyleClass().add("h1-title");

        HBox stats = new HBox(18,
                new StatCard("📘", "Assigned Courses", lecturer.getAssignedCourses().size(), "#22D3EE"),
                new StatCard("🎓", "Total Students", countTotalStudents(), "#FA8072"),
                new StatCard("📝", "Pending Grades", 0, "#f59e0b"));
        stats.setAlignment(Pos.CENTER_LEFT);

        root.getChildren().addAll(welcome, stats, buildCoursesPage());
        return root;
    }

    private int countTotalStudents() {
        int total = 0;
        for (Course c : lecturer.getAssignedCourses()) total += c.getEnrolledStudents().size();
        return total;
    }

    private Region buildCoursesPage() {
        TableView<Course> table = new TableView<>(FXCollections.observableArrayList(lecturer.getAssignedCourses()));
        TableColumn<Course, String> codeCol = new TableColumn<>("Code");
        codeCol.setCellValueFactory(new PropertyValueFactory<>("code"));
        TableColumn<Course, String> titleCol = new TableColumn<>("Title");
        titleCol.setCellValueFactory(new PropertyValueFactory<>("title"));
        TableColumn<Course, Integer> creditCol = new TableColumn<>("Credits");
        creditCol.setCellValueFactory(new PropertyValueFactory<>("creditHours"));
        TableColumn<Course, Integer> enrolledCol = new TableColumn<>("Enrolled");
        enrolledCol.setCellValueFactory(c -> new javafx.beans.property.SimpleIntegerProperty(
                c.getValue().getEnrolledStudents().size()).asObject());
        table.getColumns().addAll(codeCol, titleCol, creditCol, enrolledCol);
        table.setPrefHeight(260);

        return new ContentCard("My Assigned Courses", table);
    }

    private Region buildStudentsPage() {
        ComboBox<Course> courseCombo = new ComboBox<>(FXCollections.observableArrayList(lecturer.getAssignedCourses()));
        courseCombo.setPromptText("Select a course");

        TableView<Student> table = new TableView<>();
        TableColumn<Student, String> nameCol = new TableColumn<>("Name");
        nameCol.setCellValueFactory(new PropertyValueFactory<>("fullName"));
        TableColumn<Student, String> emailCol = new TableColumn<>("Email");
        emailCol.setCellValueFactory(new PropertyValueFactory<>("email"));
        TableColumn<Student, String> deptCol = new TableColumn<>("Department");
        deptCol.setCellValueFactory(new PropertyValueFactory<>("department"));
        table.getColumns().addAll(nameCol, emailCol, deptCol);
        table.setPrefHeight(260);

        courseCombo.setOnAction(e -> {
            Course c = courseCombo.getValue();
            if (c != null) table.setItems(FXCollections.observableArrayList(c.getEnrolledStudents()));
        });

        VBox box = new VBox(14, courseCombo, table);
        return new ContentCard("Students By Course", box);
    }

    private Region buildGradesPage() {
        ComboBox<Course> courseCombo = new ComboBox<>(FXCollections.observableArrayList(lecturer.getAssignedCourses()));
        courseCombo.setPromptText("Select course");
        ComboBox<Student> studentCombo = new ComboBox<>();
        studentCombo.setPromptText("Select student");
        TextField scoreField = new TextField();
        scoreField.setPromptText("Score (0-100)");
        Button assignBtn = new Button("Save Grade");
        assignBtn.getStyleClass().add("btn-primary");
        Animations.attachHoverScale(assignBtn, 1.04);
        Label status = new Label();
        status.getStyleClass().add("muted");

        courseCombo.setOnAction(e -> {
            Course c = courseCombo.getValue();
            if (c != null) studentCombo.setItems(FXCollections.observableArrayList(c.getEnrolledStudents()));
        });

        assignBtn.setOnAction(e -> {
            Course c = courseCombo.getValue();
            Student s = studentCombo.getValue();
            if (c == null || s == null) { status.setText("Please select course and student."); return; }
            try {
                double score = Double.parseDouble(scoreField.getText().trim());
                Grade g = new Grade(s, c, score);
                s.addGrade(g);
                status.setText("✔ Saved " + g.getLetter() + " (" + score + ") for " + s.getFullName());
            } catch (NumberFormatException ex) {
                status.setText("Enter a valid numeric score.");
            }
        });

        HBox form = new HBox(10, courseCombo, studentCombo, scoreField, assignBtn);
        form.setAlignment(Pos.CENTER_LEFT);

        VBox box = new VBox(14, form, status);
        return new ContentCard("Assign / Upload Grades", box);
    }
}
