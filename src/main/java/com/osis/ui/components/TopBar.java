package com.osis.ui.components;

import com.osis.model.Person;
import com.osis.util.Animations;
import com.osis.util.ThemeManager;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;
import javafx.scene.layout.HBox;
import javafx.scene.layout.Priority;
import javafx.scene.layout.Region;
import javafx.scene.layout.VBox;

/** Reusable top navigation bar: search box, theme toggle, profile + logout. */
public class TopBar extends HBox {

    public TopBar(String pageTitle, Person user, Runnable onLogout) {
        this(pageTitle, user, onLogout, null);
    }

    /** Creates a top bar with an optional control for collapsing the sidebar. */
    public TopBar(String pageTitle, Person user, Runnable onLogout, Runnable onToggleSidebar) {
        getStyleClass().add("topbar");
        setAlignment(Pos.CENTER_LEFT);
        setSpacing(16);
        setPadding(new Insets(14, 24, 14, 24));

        Label title = new Label(pageTitle);
        title.getStyleClass().add("h2-title");

        Button menuToggle = new Button("☰");
        menuToggle.getStyleClass().add("btn-icon");
        menuToggle.setAccessibleText("Toggle sidebar");
        menuToggle.setVisible(onToggleSidebar != null);
        menuToggle.setManaged(onToggleSidebar != null);
        if (onToggleSidebar != null) {
            Animations.attachHoverScale(menuToggle, 1.10);
            menuToggle.setOnAction(e -> onToggleSidebar.run());
        }

        TextField search = new TextField();
        search.setPromptText("🔍 Search...");
        search.getStyleClass().add("topbar-search");
        search.setPrefWidth(240);

        Region spacer = new Region();
        HBox.setHgrow(spacer, Priority.ALWAYS);

        Button themeToggle = new Button("🌓");
        themeToggle.getStyleClass().add("btn-icon");
        Animations.attachHoverScale(themeToggle, 1.15);
        themeToggle.setOnAction(e -> ThemeManager.toggle(getScene()));

        Label avatar = new Label(user.getAvatarInitials());
        avatar.getStyleClass().addAll("avatar-circle", "avatar-text");

        VBox nameBox = new VBox(0,
                labelOf(user.getFullName(), "h2-title", 13),
                labelOf(user.getRole(), "muted", 11));

        Button logoutBtn = new Button("Logout");
        logoutBtn.getStyleClass().add("btn-secondary");
        Animations.attachHoverScale(logoutBtn, 1.05);
        logoutBtn.setOnAction(e -> onLogout.run());

        HBox profileBox = new HBox(10, avatar, nameBox);
        profileBox.setAlignment(Pos.CENTER_LEFT);

        getChildren().addAll(menuToggle, title, search, spacer, themeToggle, profileBox, logoutBtn);
    }

    private Label labelOf(String text, String styleClass, double fontSize) {
        Label l = new Label(text);
        l.setStyle("-fx-font-size: " + fontSize + "px;");
        if (!styleClass.equals("h2-title")) l.getStyleClass().add(styleClass);
        return l;
    }
}
