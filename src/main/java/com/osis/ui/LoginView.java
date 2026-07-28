package com.osis.ui;

import com.osis.model.*;
import com.osis.service.AuthService;
import com.osis.util.Animations;
import com.osis.util.ValidationUtil;
import javafx.animation.FadeTransition;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.control.*;
import javafx.scene.layout.*;
import javafx.util.Duration;

import java.util.function.BiConsumer;

/**
 * Login / Sign-Up screen laid out as a split panel — a branding side on the
 * left (logo, title, feature bullets) and a login card on the right — the
 * same structure used by the src 2 Login.fxml screen. Role selection is
 * still handled with pills (Admin / Student / Lecturer) inside the card,
 * and toggles between a Sign In form and a Sign Up (mock registration) form.
 */
public class LoginView extends HBox {

    private final AuthService authService = AuthService.getInstance();
    private Role selectedRole = Role.STUDENT;
    private final Label errorLabel = new Label();
    private final VBox formSlot = new VBox();
    private final BiConsumer<Person, Role> onLoginSuccess;

    // Login fields (kept as instance state so role-pill clicks can update them)
    private TextField loginEmailField;
    private PasswordField loginPasswordField;

    public LoginView(BiConsumer<Person, Role> onLoginSuccess) {
        this.onLoginSuccess = onLoginSuccess;

        getStyleClass().add("app-bg");
        setPrefSize(1100, 720);

        // ---------- LEFT: branding panel ----------
        VBox brandPanel = buildBrandPanel();
        HBox.setHgrow(brandPanel, Priority.ALWAYS);

        // ---------- RIGHT: login card ----------
        StackPane loginSide = new StackPane();
        loginSide.getStyleClass().add("login-side");
        loginSide.setPrefWidth(440);
        loginSide.setMinWidth(440);

        VBox card = new VBox(14);
        card.getStyleClass().addAll("login-card", "glass-panel");
        card.setMaxWidth(360);
        card.setAlignment(Pos.TOP_CENTER);
        card.setPadding(new Insets(40, 36, 36, 36));

        Label heading = new Label("Welcome back");
        heading.getStyleClass().add("h2-title");
        Label subheading = new Label("Sign in to continue to your dashboard");
        subheading.getStyleClass().add("subtitle");
        subheading.setWrapText(true);

        HBox roleBox = buildRolePills();

        errorLabel.setStyle("-fx-text-fill: #ff7a7a; -fx-font-size: 12px;");
        errorLabel.setWrapText(true);
        errorLabel.setMaxWidth(280);
        errorLabel.setVisible(false);
        errorLabel.setManaged(false);

        formSlot.setSpacing(10);
        formSlot.setAlignment(Pos.CENTER);
        showLoginForm();

        Label footer = new Label("\u00A9 2026 OSIS \u00B7 University Systems");
        footer.getStyleClass().add("muted");

        card.getChildren().addAll(heading, subheading, roleBox, formSlot, errorLabel, footer);
        loginSide.getChildren().add(card);

        getChildren().addAll(brandPanel, loginSide);

        // Entrance animation
        card.setOpacity(0);
        FadeTransition fade = Animations.fadeIn(card, Duration.millis(500));
        fade.play();
    }

    // ---------------- Brand panel (left side) ----------------

    private VBox buildBrandPanel() {
        VBox panel = new VBox(18);
        panel.getStyleClass().add("brand-panel");
        panel.setAlignment(Pos.CENTER_LEFT);
        panel.setPadding(new Insets(60));

        Label logo = new Label("OSIS");
        logo.getStyleClass().add("brand-logo");

        Label title = new Label("Online Student Information System");
        title.getStyleClass().add("brand-title");
        title.setWrapText(true);

        Label subtitle = new Label("A unified platform for administrators, lecturers, and students to manage academic life digitally.");
        subtitle.getStyleClass().add("brand-subtitle");
        subtitle.setWrapText(true);
        subtitle.setMaxWidth(380);

        VBox features = new VBox(10,
                brandFeature("Role-based secure access"),
                brandFeature("Real-time academic records"),
                brandFeature("Centralized course and results management"));
        features.setPadding(new Insets(30, 0, 0, 0));

        panel.getChildren().addAll(logo, title, subtitle, features);
        return panel;
    }

    private Label brandFeature(String text) {
        Label l = new Label("\u25CF  " + text);
        l.getStyleClass().add("brand-feature");
        return l;
    }

    // ---------------- Role pills ----------------

    private HBox buildRolePills() {
        HBox roleBox = new HBox(10);
        roleBox.setAlignment(Pos.CENTER);

        VBox adminWrap = wrapPill(makeRolePill("Admin"));
        VBox studentWrap = wrapPill(makeRolePill("Student"));
        VBox lecturerWrap = wrapPill(makeRolePill("Lecturer"));
        roleBox.getChildren().addAll(adminWrap, studentWrap, lecturerWrap);
        markSelected(roleBox, studentWrap);

        adminWrap.setOnMouseClicked(e -> { selectedRole = Role.ADMIN; markSelected(roleBox, adminWrap); fillDemoCreds(); });
        studentWrap.setOnMouseClicked(e -> { selectedRole = Role.STUDENT; markSelected(roleBox, studentWrap); fillDemoCreds(); });
        lecturerWrap.setOnMouseClicked(e -> { selectedRole = Role.LECTURER; markSelected(roleBox, lecturerWrap); fillDemoCreds(); });

        return roleBox;
    }

    private void fillDemoCreds() {
        if (loginEmailField == null || loginPasswordField == null) return;
        loginEmailField.setText(defaultEmailFor(selectedRole));
        loginPasswordField.setText(defaultPasswordFor(selectedRole));
    }

    private Label makeRolePill(String text) {
        Label l = new Label(text);
        l.getStyleClass().add("role-pill-label");
        l.setStyle("-fx-text-alignment: center; -fx-font-size: 12px;");
        return l;
    }

    private VBox wrapPill(Label content) {
        VBox box = new VBox(content);
        box.getStyleClass().add("role-pill");
        box.setAlignment(Pos.CENTER);
        box.setPrefSize(90, 44);
        Animations.attachHoverScale(box, 1.03);
        return box;
    }

    private void markSelected(HBox roleBox, VBox selected) {
        for (var node : roleBox.getChildren()) {
            node.getStyleClass().remove("role-pill-selected");
        }
        selected.getStyleClass().add("role-pill-selected");
    }

    // ---------------- Sign In form ----------------

    private void showLoginForm() {
        errorLabel.setVisible(false);
        errorLabel.setManaged(false);

        loginEmailField = new TextField();
        loginEmailField.setPromptText("Email address");
        loginEmailField.setText(defaultEmailFor(selectedRole));

        loginPasswordField = new PasswordField();
        loginPasswordField.setPromptText("Password");
        loginPasswordField.setText(defaultPasswordFor(selectedRole));

        Button loginBtn = new Button("Login");
        loginBtn.getStyleClass().add("btn-primary");
        loginBtn.setMaxWidth(Double.MAX_VALUE);
        Animations.attachHoverScale(loginBtn, 1.02);
        loginBtn.setOnAction(e -> attemptLogin());

        Hyperlink toSignUp = new Hyperlink("Don't have an account? Sign Up");
        toSignUp.setOnAction(e -> crossFadeTo(this::showSignUpForm));

        Label hint = new Label("Demo credentials auto-filled \u2014 just pick a role and Login.");
        hint.getStyleClass().add("muted");
        hint.setWrapText(true);
        hint.setMaxWidth(280);
        hint.setAlignment(Pos.CENTER);
        hint.setStyle("-fx-text-alignment: center;");

        loginEmailField.setOnAction(e -> attemptLogin());
        loginPasswordField.setOnAction(e -> attemptLogin());

        formSlot.getChildren().setAll(loginEmailField, loginPasswordField, loginBtn, toSignUp, hint);
    }

    private void attemptLogin() {
        authService.authenticate(loginEmailField.getText().trim(), loginPasswordField.getText(), selectedRole)
                .ifPresentOrElse(user -> {
                    errorLabel.setVisible(false);
                    errorLabel.setManaged(false);
                    onLoginSuccess.accept(user, selectedRole);
                }, () -> showError("Invalid credentials for the selected role."));
    }

    // ---------------- Sign Up form ----------------

    private void showSignUpForm() {
        errorLabel.setVisible(false);
        errorLabel.setManaged(false);

        TextField nameField = new TextField();
        nameField.setPromptText("Full name");
        TextField emailField = new TextField();
        emailField.setPromptText("Email address");
        TextField deptField = new TextField();
        deptField.setPromptText(selectedRole == Role.LECTURER ? "Department / Faculty" : "Department");
        PasswordField passwordField = new PasswordField();
        passwordField.setPromptText("Choose a password");

        Label roleHint = new Label("Registering as: " + selectedRole.getLabel() + " (use the pills above to change)");
        roleHint.getStyleClass().add("muted");
        roleHint.setWrapText(true);
        roleHint.setMaxWidth(280);

        Button signUpBtn = new Button("Create Account");
        signUpBtn.getStyleClass().add("btn-primary");
        signUpBtn.setMaxWidth(Double.MAX_VALUE);
        Animations.attachHoverScale(signUpBtn, 1.02);

        signUpBtn.setOnAction(e -> {
            String name = nameField.getText().trim();
            String email = emailField.getText().trim();
            String dept = deptField.getText().trim();
            String pwd = passwordField.getText();

            if (!ValidationUtil.isNonEmpty(name) || !ValidationUtil.isValidEmail(email) || !ValidationUtil.isNonEmpty(pwd)) {
                showError("Please enter a valid name, email, and password.");
                return;
            }
            if (emailExists(email)) {
                showError("An account with that email already exists for this role.");
                return;
            }
            if (selectedRole == Role.ADMIN) {
                showError("Admin accounts can't self-register. Please sign in instead.");
                return;
            }
            if (selectedRole != Role.STUDENT) {
                showError("Lecturers must be invited by an administrator.");
                return;
            }

            boolean registered = authService.registerStudent(name, email, pwd, dept.isEmpty() ? "Undeclared" : dept, 1);
            if (!registered) {
                showError("Unable to register the student account. Please try again.");
                return;
            }

            authService.authenticate(email, pwd, selectedRole).ifPresent(user -> {
                errorLabel.setVisible(false);
                errorLabel.setManaged(false);
                onLoginSuccess.accept(user, selectedRole);
            });
        });

        Hyperlink toLogin = new Hyperlink("Already have an account? Sign In");
        toLogin.setOnAction(e -> crossFadeTo(this::showLoginForm));

        formSlot.getChildren().setAll(nameField, emailField, deptField, passwordField, roleHint, signUpBtn, toLogin);
    }

    private boolean emailExists(String email) {
        return authService.emailExists(email, selectedRole);
    }

    private void showError(String message) {
        errorLabel.setText(message);
        errorLabel.setVisible(true);
        errorLabel.setManaged(true);
    }

    private void crossFadeTo(Runnable rebuild) {
        FadeTransition out = new FadeTransition(Duration.millis(140), formSlot);
        out.setFromValue(1);
        out.setToValue(0);
        out.setOnFinished(e -> {
            rebuild.run();
            Animations.fadeIn(formSlot, Duration.millis(220)).play();
        });
        out.play();
    }

    private String defaultEmailFor(Role role) {
        return switch (role) {
            case ADMIN -> "admin@osis.edu";
            case STUDENT -> "jdoe@osis.edu";
            case LECTURER -> "kasante@osis.edu";
        };
    }

    private String defaultPasswordFor(Role role) {
        return switch (role) {
            case ADMIN -> "admin123";
            case STUDENT -> "stud123";
            case LECTURER -> "lect123";
        };
    }
}
