
package com.osis.ui;

import com.osis.model.*;
import com.osis.service.DataStore;
import com.osis.ui.components.ContentCard;
import com.osis.ui.components.StatCard;
import com.osis.util.Animations;
import javafx.collections.FXCollections;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.control.*;
import javafx.scene.control.cell.PropertyValueFactory;
import javafx.scene.layout.*;
import javafx.util.Duration;

public class AdminDashboardView extends DashboardShell {

    private final DataStore store = DataStore.getInstance();

    public AdminDashboardView(Person user, Runnable onLogout) {
        super("OSIS", user,
                new String[]{"📊", "🎓", "👨‍🏫", "📘"},
                new String[]{"Overview", "Manage Students", "Manage Lecturers", "Manage Courses"},
                onLogout);
        init();
    }

    @Override
    protected Region buildPage(int index) {
        return switch (index) {
            case 1 -> buildStudentsPage();
            case 2 -> buildLecturersPage();
            case 3 -> buildCoursesPage();
            default -> buildOverviewPage();
        };
    }

    // ---------------- Overview ----------------
    private Region buildOverviewPage() {
        VBox root = new VBox(20);

        Label welcome = new Label(user.getDashboardGreeting());
        welcome.getStyleClass().add("h1-title");

        HBox stats = new HBox(18,
                new StatCard("🎓", "Total Students", store.getStudents().size(), "#22D3EE"),
                new StatCard("👨‍🏫", "Total Lecturers", store.getLecturers().size(), "#FA8072"),
                new StatCard("📘", "Total Courses", store.getCourses().size(), "#22c55e"),
                new StatCard("✅", "Active Enrollments", countEnrollments(), "#f59e0b"));
        stats.setAlignment(Pos.CENTER_LEFT);

        TableView<Course> table = new TableView<>(FXCollections.observableArrayList(store.getCourses()));
        TableColumn<Course, String> codeCol = new TableColumn<>("Code");
        codeCol.setCellValueFactory(new PropertyValueFactory<>("code"));
        TableColumn<Course, String> titleCol = new TableColumn<>("Title");
        titleCol.setCellValueFactory(new PropertyValueFactory<>("title"));
        TableColumn<Course, String> lecturerCol = new TableColumn<>("Lecturer");
        lecturerCol.setCellValueFactory(new PropertyValueFactory<>("lecturerName"));
        table.getColumns().addAll(codeCol, titleCol, lecturerCol);
        table.setPrefHeight(260);

        ContentCard recentCard = new ContentCard("Course Directory", table);

        root.getChildren().addAll(welcome, stats, recentCard);
        return root;
    }

    private int countEnrollments() {
        int total = 0;
        for (Student s : store.getStudents()) total += s.getEnrolledCourses().size();
        return total;
    }

    // ---------------- Manage Students ----------------
    private Region buildStudentsPage() {
        VBox root = new VBox(18);

        TableView<Student> table = new TableView<>(FXCollections.observableArrayList(store.getStudents()));
        TableColumn<Student, String> nameCol = new TableColumn<>("Name");
        nameCol.setCellValueFactory(new PropertyValueFactory<>("fullName"));
        TableColumn<Student, String> emailCol = new TableColumn<>("Email");
        emailCol.setCellValueFactory(new PropertyValueFactory<>("email"));
        TableColumn<Student, String> deptCol = new TableColumn<>("Department");
        deptCol.setCellValueFactory(new PropertyValueFactory<>("department"));
        TableColumn<Student, Integer> yearCol = new TableColumn<>("Year");
        yearCol.setCellValueFactory(new PropertyValueFactory<>("yearLevel"));
        TableColumn<Student, Void> actionCol = buildDeleteColumn(s -> {
            store.removeStudent(s);
            table.getItems().remove(s);
        });
        table.getColumns().addAll(nameCol, emailCol, deptCol, yearCol, actionCol);
        table.setPrefHeight(320);

        // Add form
        TextField nameField = new TextField(); nameField.setPromptText("Full name");
        TextField emailField = new TextField(); emailField.setPromptText("Email");
        TextField deptField = new TextField(); deptField.setPromptText("Department");
        TextField yearField = new TextField(); yearField.setPromptText("Year (1-4)");
        Button addBtn = new Button("+ Add Student");
        addBtn.getStyleClass().add("btn-primary");
        Animations.attachHoverScale(addBtn, 1.04);
        addBtn.setOnAction(e -> {
            if (nameField.getText().isBlank() || emailField.getText().isBlank()) return;
            int year = 1;
            try { year = Integer.parseInt(yearField.getText().trim()); } catch (Exception ignored) {}
            Student s = new Student(nameField.getText().trim(), emailField.getText().trim(),
                    "stud123", deptField.getText().trim(), year);
            store.addStudent(s);
            table.getItems().add(s);
            nameField.clear(); emailField.clear(); deptField.clear(); yearField.clear();
        });

        HBox form = new HBox(10, nameField, emailField, deptField, yearField, addBtn);
        form.setAlignment(Pos.CENTER_LEFT);

        ContentCard formCard = new ContentCard("Add New Student", form);
        ContentCard tableCard = new ContentCard("All Students", table);

        root.getChildren().addAll(formCard, tableCard);
        return root;
    }

    // ---------------- Manage Lecturers ----------------
    private Region buildLecturersPage() {
        VBox root = new VBox(18);

        TableView<Lecturer> table = new TableView<>(FXCollections.observableArrayList(store.getLecturers()));
        TableColumn<Lecturer, String> nameCol = new TableColumn<>("Name");
        nameCol.setCellValueFactory(new PropertyValueFactory<>("fullName"));
        TableColumn<Lecturer, String> emailCol = new TableColumn<>("Email");
        emailCol.setCellValueFactory(new PropertyValueFactory<>("email"));
        TableColumn<Lecturer, String> deptCol = new TableColumn<>("Department");
        deptCol.setCellValueFactory(new PropertyValueFactory<>("department"));
        TableColumn<Lecturer, String> titleCol = new TableColumn<>("Title");
        titleCol.setCellValueFactory(new PropertyValueFactory<>("title"));
        TableColumn<Lecturer, Void> actionCol = buildDeleteColumn(l -> {
            store.removeLecturer(l);
            table.getItems().remove(l);
        });
        table.getColumns().addAll(nameCol, emailCol, deptCol, titleCol, actionCol);
        table.setPrefHeight(280);

        TextField nameField = new TextField(); nameField.setPromptText("Full name");
        TextField emailField = new TextField(); emailField.setPromptText("Email");
        TextField deptField = new TextField(); deptField.setPromptText("Department");
        TextField titleField = new TextField(); titleField.setPromptText("Title (e.g. Lecturer)");
        Button addBtn = new Button("+ Add Lecturer");
        addBtn.getStyleClass().add("btn-primary");
        Animations.attachHoverScale(addBtn, 1.04);
        addBtn.setOnAction(e -> {
            if (nameField.getText().isBlank() || emailField.getText().isBlank()) return;
            Lecturer l = new Lecturer(nameField.getText().trim(), emailField.getText().trim(),
                    "lect123", deptField.getText().trim(), titleField.getText().trim());
            store.addLecturer(l);
            table.getItems().add(l);
            nameField.clear(); emailField.clear(); deptField.clear(); titleField.clear();
        });

        HBox form = new HBox(10, nameField, emailField, deptField, titleField, addBtn);
        form.setAlignment(Pos.CENTER_LEFT);

        ContentCard formCard = new ContentCard("Add New Lecturer", form);
        ContentCard tableCard = new ContentCard("All Lecturers", table);

        // Assign course section
        ComboBox<Lecturer> lecturerCombo = new ComboBox<>(FXCollections.observableArrayList(store.getLecturers()));
        lecturerCombo.setPromptText("Select Lecturer");
        ComboBox<Course> courseCombo = new ComboBox<>(FXCollections.observableArrayList(store.getCourses()));
        courseCombo.setPromptText("Select Course");
        Button assignBtn = new Button("Assign Course");
        assignBtn.getStyleClass().add("btn-secondary");
        Animations.attachHoverScale(assignBtn, 1.04);
        Label assignStatus = new Label();
        assignStatus.getStyleClass().add("muted");
        assignBtn.setOnAction(e -> {
            Lecturer l = lecturerCombo.getValue();
            Course c = courseCombo.getValue();
            if (l != null && c != null) {
                l.assignCourse(c);
                assignStatus.setText("✔ " + c.getCode() + " assigned to " + l.getFullName());
            }
        });
        HBox assignBox = new HBox(10, lecturerCombo, courseCombo, assignBtn, assignStatus);
        assignBox.setAlignment(Pos.CENTER_LEFT);
        ContentCard assignCard = new ContentCard("Assign Course to Lecturer", assignBox);

        root.getChildren().addAll(formCard, assignCard, tableCard);
        return root;
    }

    // ---------------- Manage Courses ----------------
    private Region buildCoursesPage() {
        VBox root = new VBox(18);

        TableView<Course> table = new TableView<>(FXCollections.observableArrayList(store.getCourses()));
        TableColumn<Course, String> codeCol = new TableColumn<>("Code");
        codeCol.setCellValueFactory(new PropertyValueFactory<>("code"));
        TableColumn<Course, String> titleCol = new TableColumn<>("Title");
        titleCol.setCellValueFactory(new PropertyValueFactory<>("title"));
        TableColumn<Course, Integer> creditCol = new TableColumn<>("Credits");
        creditCol.setCellValueFactory(new PropertyValueFactory<>("creditHours"));
        TableColumn<Course, String> lecturerCol = new TableColumn<>("Lecturer");
        lecturerCol.setCellValueFactory(new PropertyValueFactory<>("lecturerName"));
        TableColumn<Course, Void> actionCol = buildDeleteColumn(c -> {
            store.removeCourse(c);
            table.getItems().remove(c);
        });
        table.getColumns().addAll(codeCol, titleCol, creditCol, lecturerCol, actionCol);
        table.setPrefHeight(320);

        TextField codeField = new TextField(); codeField.setPromptText("Course code");
        TextField titleField = new TextField(); titleField.setPromptText("Course title");
        TextField creditField = new TextField(); creditField.setPromptText("Credit hours");
        Button addBtn = new Button("+ Add Course");
        addBtn.getStyleClass().add("btn-primary");
        Animations.attachHoverScale(addBtn, 1.04);
        addBtn.setOnAction(e -> {
            if (codeField.getText().isBlank() || titleField.getText().isBlank()) return;
            int credits = 3;
            try { credits = Integer.parseInt(creditField.getText().trim()); } catch (Exception ignored) {}
            Course c = new Course(codeField.getText().trim(), titleField.getText().trim(), credits);
            store.addCourse(c);
            table.getItems().add(c);
            codeField.clear(); titleField.clear(); creditField.clear();
        });

        HBox form = new HBox(10, codeField, titleField, creditField, addBtn);
        form.setAlignment(Pos.CENTER_LEFT);

        ContentCard formCard = new ContentCard("Add New Course", form);
        ContentCard tableCard = new ContentCard("All Courses", table);

        root.getChildren().addAll(formCard, tableCard);
        return root;
    }

    /** Builds a reusable "Delete" action column for any table type. */
    private <T> TableColumn<T, Void> buildDeleteColumn(java.util.function.Consumer<T> onDelete) {
        TableColumn<T, Void> col = new TableColumn<>("Action");
        col.setCellFactory(c -> new TableCell<>() {
            private final Button btn = new Button("Delete");
            {
                btn.getStyleClass().add("btn-danger");
                btn.setOnAction(e -> onDelete.accept(getTableView().getItems().get(getIndex())));
            }
            @Override
            protected void updateItem(Void item, boolean empty) {
                super.updateItem(item, empty);
                setGraphic(empty ? null : btn);
            }
        });
        return col;
    }
}
