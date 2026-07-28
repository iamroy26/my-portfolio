package com.osis.ui;

import com.osis.model.Course;
import com.osis.model.Grade;
import com.osis.model.Person;
import com.osis.model.Student;
import com.osis.service.DataStore;
import com.osis.ui.components.ContentCard;
import com.osis.ui.components.StatCard;
import com.osis.util.Animations;
import javafx.collections.FXCollections;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.TableCell;
import javafx.scene.control.TableColumn;
import javafx.scene.control.TableView;
import javafx.scene.control.TextArea;
import javafx.scene.control.cell.PropertyValueFactory;
import javafx.scene.layout.GridPane;
import javafx.scene.layout.HBox;
import javafx.scene.layout.Region;
import javafx.scene.layout.VBox;

public class StudentDashboardView extends DashboardShell {

    private final Student student;
    private final DataStore store = DataStore.getInstance();

    public StudentDashboardView(Person user, Runnable onLogout) {
        super("OSIS", user,
                new String[]{"📊", "👤", "📝", "📄", "📈"},
                new String[]{"Overview", "My Profile", "Course Registration", "Registration Slip", "My Grades"},
                onLogout);
        this.student = (Student) user;
        init();
    }

    @Override
    protected Region buildPage(int index) {
        return switch (index) {
            case 1 -> buildProfilePage();
            case 2 -> buildRegistrationPage();
            case 3 -> buildSlipPage();
            case 4 -> buildGradesPage();
            default -> buildOverviewPage();
        };
    }

    private Region buildOverviewPage() {
        VBox root = new VBox(20);
        Label welcome = new Label(student.getDashboardGreeting());
        welcome.getStyleClass().add("h1-title");

        HBox stats = new HBox(18,
                new StatCard("📘", "Enrolled Courses", student.getEnrolledCourses().size(), "#4B4B4B"),
                new StatCard("📈", "Average Score", (int) student.getAverageScore(), "#FA8072"),
                new StatCard("🏛", "Study Stage", student.getYearLevel(), "#22c55e"));
        stats.setAlignment(Pos.CENTER_LEFT);

        Label stage = new Label(student.getStudyStage());
        stage.getStyleClass().add("subtitle");

        ContentCard registrationNotice = new ContentCard("Semester Enrollment Status",
                new Label(student.isEligibleForInitialRegistration()
                        ? "Eligibility: First year, first semester registration is open."
                        : "Registration currently available only for first year, first semester students."));

        root.getChildren().addAll(welcome, stage, stats, registrationNotice, buildCoursesPage());
        return root;
    }

    private Region buildProfilePage() {
        GridPane grid = new GridPane();
        grid.setHgap(14);
        grid.setVgap(14);
        grid.setPadding(new Insets(10));

        addRow(grid, 0, "Full Name", student.getFullName());
        addRow(grid, 1, "Email", student.getEmail());
        addRow(grid, 2, "Department", student.getDepartment());
        addRow(grid, 3, "Year Level", String.valueOf(student.getYearLevel()));
        addRow(grid, 4, "Student ID", student.getId());

        return new ContentCard("My Profile", grid);
    }

    private void addRow(GridPane grid, int row, String label, String value) {
        Label l = new Label(label + ":");
        l.getStyleClass().add("muted");
        Label v = new Label(value);
        v.getStyleClass().add("h2-title");
        v.setStyle("-fx-font-size: 14px;");
        grid.addRow(row, l, v);
    }

    private Region buildCoursesPage() {
        TableView<Course> table = new TableView<>(FXCollections.observableArrayList(student.getEnrolledCourses()));
        TableColumn<Course, String> codeCol = new TableColumn<>("Code");
        codeCol.setCellValueFactory(new PropertyValueFactory<>("code"));
        TableColumn<Course, String> titleCol = new TableColumn<>("Title");
        titleCol.setCellValueFactory(new PropertyValueFactory<>("title"));
        TableColumn<Course, Integer> creditCol = new TableColumn<>("Credits");
        creditCol.setCellValueFactory(new PropertyValueFactory<>("creditHours"));
        TableColumn<Course, String> lecturerCol = new TableColumn<>("Lecturer");
        lecturerCol.setCellValueFactory(new PropertyValueFactory<>("lecturerName"));
        table.getColumns().addAll(codeCol, titleCol, creditCol, lecturerCol);
        table.setPrefHeight(260);

        return new ContentCard("My Enrolled Courses", table);
    }

    private Region buildRegistrationPage() {
        VBox root = new VBox(18);
        root.setSpacing(18);

        Label heading = new Label("Course Registration Center");
        heading.getStyleClass().add("h1-title");
        Label hint = new Label(student.isEligibleForInitialRegistration()
                ? "Choose up to 5 core courses to register for Semester 1."
                : "Registration is reserved for first year, first semester students only.");
        hint.getStyleClass().add("subtitle");

        Label capacity = new Label("Registered " + student.getEnrolledCourses().size() + " of 5 allowed courses.");
        capacity.getStyleClass().add("muted");

        TableView<Course> table = new TableView<>(FXCollections.observableArrayList(store.getCourses()));
        TableColumn<Course, String> codeCol = new TableColumn<>("Code");
        codeCol.setCellValueFactory(new PropertyValueFactory<>("code"));
        TableColumn<Course, String> titleCol = new TableColumn<>("Title");
        titleCol.setCellValueFactory(new PropertyValueFactory<>("title"));
        TableColumn<Course, Integer> creditCol = new TableColumn<>("Credits");
        creditCol.setCellValueFactory(new PropertyValueFactory<>("creditHours"));
        TableColumn<Course, String> lecturerCol = new TableColumn<>("Lecturer");
        lecturerCol.setCellValueFactory(new PropertyValueFactory<>("lecturerName"));
        TableColumn<Course, Void> actionCol = new TableColumn<>("Action");
        actionCol.setCellFactory(col -> new TableCell<>() {
            private final Button button = new Button("Register");
            {
                button.getStyleClass().add("btn-primary");
                button.setOnAction(e -> {
                    Course course = getTableView().getItems().get(getIndex());
                    if (!student.isEligibleForInitialRegistration()) {
                        return;
                    }
                    if (student.isCourseRegistered(course)) {
                        button.setText("Added");
                        return;
                    }
                    if (!student.canRegisterMoreCourses()) {
                        button.setText("Limit reached");
                        button.setDisable(true);
                        return;
                    }
                    student.addCourse(course);
                    button.setText("Added");
                    button.setDisable(true);
                    capacity.setText("Registered " + student.getEnrolledCourses().size() + " of " + Student.MAX_INITIAL_REGISTRATION_COURSES + " allowed courses.");
                    getTableView().refresh();
                });
            }
            @Override
            protected void updateItem(Void item, boolean empty) {
                super.updateItem(item, empty);
                if (empty) {
                    setGraphic(null);
                } else {
                    Course course = getTableView().getItems().get(getIndex());
                    if (course == null) {
                        setGraphic(null);
                        return;
                    }
                    if (!student.isEligibleForInitialRegistration()) {
                        button.setText("Register");
                        button.setDisable(true);
                    } else if (student.isCourseRegistered(course)) {
                        button.setText("Added");
                        button.setDisable(true);
                    } else if (!student.canRegisterMoreCourses()) {
                        button.setText("Limit reached");
                        button.setDisable(true);
                    } else {
                        button.setText("Register");
                        button.setDisable(false);
                    }
                    setGraphic(button);
                }
            }
        });
        table.getColumns().addAll(codeCol, titleCol, creditCol, lecturerCol, actionCol);
        table.setPrefHeight(320);

        root.getChildren().addAll(heading, hint, capacity, table);
        return new ContentCard("First Year Semester 1 Registration", root);
    }

    private Region buildSlipPage() {
        VBox root = new VBox(18);
        root.setSpacing(18);

        Label heading = new Label("Course Registration Slip");
        heading.getStyleClass().add("h1-title");

        TextArea slip = new TextArea(buildSlipText());
        slip.setEditable(false);
        slip.setWrapText(true);
        slip.setPrefHeight(320);
        slip.getStyleClass().add("text-area");

        Button refresh = new Button("Refresh Slip");
        refresh.getStyleClass().add("btn-secondary");
        Animations.attachHoverScale(refresh, 1.04);
        refresh.setOnAction(e -> slip.setText(buildSlipText()));

        root.getChildren().addAll(heading, slip, refresh);
        return new ContentCard("Registration Slip", root);
    }

    private Region buildGradesPage() {
        TableView<Grade> table = new TableView<>(FXCollections.observableArrayList(student.getGrades()));
        TableColumn<Grade, String> courseCol = new TableColumn<>("Course");
        courseCol.setCellValueFactory(new PropertyValueFactory<>("courseName"));
        TableColumn<Grade, Integer> scoreCol = new TableColumn<>("Score");
        scoreCol.setCellValueFactory(new PropertyValueFactory<>("score"));
        TableColumn<Grade, String> remarkCol = new TableColumn<>("Remark");
        remarkCol.setCellValueFactory(new PropertyValueFactory<>("remark"));
        table.getColumns().addAll(courseCol, scoreCol, remarkCol);
        table.setPrefHeight(320);

        return new ContentCard("Grade Report", table);
    }

    private String buildSlipText() {
        StringBuilder builder = new StringBuilder();
        builder.append("University: OSIS Academic Center\n");
        builder.append("Student: ").append(student.getFullName()).append("\n");
        builder.append("Student ID: ").append(student.getId()).append("\n");
        builder.append("Department: ").append(student.getDepartment()).append("\n");
        builder.append("Semester: ").append(student.getStudyStage()).append("\n");
        builder.append("Status: ").append(student.isEligibleForInitialRegistration() ? "Registration Open" : "View Only").append("\n\n");
        builder.append("Courses Registered:\n");
        if (student.getEnrolledCourses().isEmpty()) {
            builder.append("- No courses registered yet.\n");
        } else {
            int totalCredits = 0;
            for (Course course : student.getEnrolledCourses()) {
                builder.append("- ").append(course.getCode()).append(" ").append(course.getTitle()).append(" (")
                        .append(course.getCreditHours()).append(" credits)\n");
                totalCredits += course.getCreditHours();
            }
            builder.append("\nTotal Credits: ").append(totalCredits).append("\n");
        }
        builder.append("\nPlease retain this slip for departmental verification and registration audit.");
        return builder.toString();
    }
}
