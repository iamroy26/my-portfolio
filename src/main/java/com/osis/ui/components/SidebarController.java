package com.osis.controller;

import com.osis.model.NavItem;
import javafx.fxml.FXML;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.layout.HBox;
import javafx.scene.layout.Priority;
import javafx.scene.layout.VBox;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;

/**
 * Controller for the reusable Sidebar component (Sidebar.fxml). Builds nav
 * rows dynamically from a {@link NavItem} list so the same FXML serves
 * Admin, Lecturer, and Student without three near-duplicate files. Supports
 * a collapsed (icon-only) mode toggled from the top bar.
 */
public class SidebarController {

    private static final double EXPANDED_WIDTH = 230;
    private static final double COLLAPSED_WIDTH = 74;

    @FXML private VBox sidebarRoot;
    @FXML private Label logoLabel;
    @FXML private Label roleTagLabel;
    @FXML private VBox navContainer;
    @FXML private Button logoutButton;

    private final List<HBox> navRows = new ArrayList<>();
    private Consumer<String> onNavigate;
    private Runnable onLogout;
    private boolean collapsed = false;
    private String activeId;

    /** Populates the sidebar with the given role's nav items and marks one active. */
    public void setNavItems(List<NavItem> items, String activeId) {
        this.activeId = activeId;
        navContainer.getChildren().clear();
        navRows.clear();

        for (NavItem item : items) {
            HBox row = buildRow(item);
            navRows.add(row);
            navContainer.getChildren().add(row);
        }
        updateActiveStyles();
    }

    public void setRoleTag(String text) {
        roleTagLabel.setText(text);
    }

    public void setOnNavigate(Consumer<String> callback) {
        this.onNavigate = callback;
    }

    public void setOnLogout(Runnable callback) {
        this.onLogout = callback;
    }

    /** Highlights a nav item as active without triggering navigation (e.g. on initial load). */
    public void setActive(String id) {
        this.activeId = id;
        updateActiveStyles();
    }

    private HBox buildRow(NavItem item) {
        Label iconLabel = new Label(item.icon());
        iconLabel.getStyleClass().add("sidebar-item-icon");

        Label textLabel = new Label(item.label());
        textLabel.getStyleClass().add("sidebar-item-text");

        HBox row = new HBox(10, iconLabel, textLabel);
        row.setAlignment(Pos.CENTER_LEFT);
        row.setPadding(new Insets(10, 12, 10, 12));
        row.getStyleClass().add("sidebar-item");
        row.setUserData(item.id());
        row.setCursor(javafx.scene.Cursor.HAND);

        row.setOnMouseClicked(e -> {
            this.activeId = item.id();
            updateActiveStyles();
            if (onNavigate != null) {
                onNavigate.accept(item.id());
            }
        });

        return row;
    }

    private void updateActiveStyles() {
        for (HBox row : navRows) {
            boolean isActive = row.getUserData().equals(activeId);
            row.getStyleClass().removeAll("sidebar-item-active");
            if (isActive) {
                row.getStyleClass().add("sidebar-item-active");
            }
            if (!row.getStyleClass().contains("sidebar-item")) {
                row.getStyleClass().add("sidebar-item");
            }
        }
    }

    /** Flips between the full-width and icon-only (collapsed) sidebar. */
    public void toggleCollapse() {
        collapsed = !collapsed;
        applyCollapsedState();
    }

    public boolean isCollapsed() {
        return collapsed;
    }

    private void applyCollapsedState() {
        double targetWidth = collapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH;
        sidebarRoot.setPrefWidth(targetWidth);
        sidebarRoot.setMinWidth(targetWidth);

        logoLabel.setVisible(!collapsed);
        logoLabel.setManaged(!collapsed);
        roleTagLabel.setVisible(!collapsed);
        roleTagLabel.setManaged(!collapsed);

        for (HBox row : navRows) {
            // Text label is always the second child.
            row.getChildren().get(1).setVisible(!collapsed);
            row.getChildren().get(1).setManaged(!collapsed);
            row.setAlignment(collapsed ? Pos.CENTER : Pos.CENTER_LEFT);
        }

        logoutButton.setText(collapsed ? "⏻" : "⏻   Logout");
        HBox.setHgrow(logoutButton, Priority.NEVER);
    }

    @FXML
    private void onLogoutClicked() {
        if (onLogout != null) {
            onLogout.run();
        }
    }
}
