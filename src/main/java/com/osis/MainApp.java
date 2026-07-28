package com.osis;

import com.osis.db.DatabaseManager;
import com.osis.model.Role;
import com.osis.service.AuthService;
import com.osis.ui.*;
import com.osis.util.ThemeManager;
import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.layout.StackPane;
import javafx.stage.Stage;

/**
 * Application entry point. Wires together: LoadingScreen -> LoginView ->
 * role-specific DashboardShell, all hosted inside a single resizable Scene
 * to satisfy the "fully responsive" requirement.
 */
public class MainApp extends Application {

    private Stage stage;
    private Scene scene;

    @Override
    public void start(Stage primaryStage) {
        this.stage = primaryStage;
        stage.setTitle("OSIS — Online Student Information System");
        stage.setMinWidth(1000);
        stage.setMinHeight(640);

        StackPane root = new StackPane();
        scene = new Scene(root, 1180, 740);
        ThemeManager.apply(scene);

        LoadingScreen loading = new LoadingScreen(this::showLogin);
        root.getChildren().add(loading);

        DatabaseManager.getInstance().initialize();
        stage.setScene(scene);
        stage.show();
    }

    private void showLogin() {
        StackPane root = (StackPane) scene.getRoot();
        LoginView loginView = new LoginView((user, role) -> showDashboard(user, role));
        root.getChildren().setAll(loginView);
    }

    private void showDashboard(com.osis.model.Person user, Role role) {
        StackPane root = (StackPane) scene.getRoot();
        javafx.scene.layout.Region dashboard = switch (role) {
            case ADMIN -> new AdminDashboardView(user, this::logout);
            case STUDENT -> new StudentDashboardView(user, this::logout);
            case LECTURER -> new LecturerDashboardView(user, this::logout);
        };
        root.getChildren().setAll(dashboard);
    }

    private void logout() {
        AuthService.getInstance().logout();
        showLogin();
    }

    public static void main(String[] args) {
        launch(args);
    }
}
