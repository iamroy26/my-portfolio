package com.osis.ui;

import com.osis.model.Person;
import com.osis.model.NavItem;
import com.osis.controller.SidebarController;
import com.osis.ui.components.TopBar;
import com.osis.util.Animations;
import javafx.fxml.FXMLLoader;
import javafx.geometry.Insets;
import javafx.scene.control.Label;
import javafx.scene.layout.BorderPane;
import javafx.scene.layout.Region;
import javafx.scene.layout.StackPane;
import javafx.util.Duration;

import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

/**
 * Shared layout shell used by all three dashboards: sidebar (slides in),
 * top bar (with profile/logout), and a content StackPane that cross-fades
 * between pages. Subclasses implement {@link #buildPage(int)} to supply
 * page content per navigation index.
 */
public abstract class DashboardShell extends BorderPane {

    protected final StackPane contentArea = new StackPane();
    protected final Person user;
    private final String[] navLabels;

    protected DashboardShell(String appName, Person user, String[] icons, String[] navLabels, Runnable onLogout) {
        this.user = user;
        this.navLabels = navLabels;
        getStyleClass().add("app-bg");

        SidebarController sidebarController = loadSidebar(user.getRole(), icons, navLabels, onLogout);

        TopBar topBar = new TopBar(navLabels[0], user, onLogout, sidebarController::toggleCollapse);
        this.topBarRef = topBar;
        setTop(topBar);

        contentArea.setPadding(new Insets(28));
        setCenter(contentArea);

        Label footer = new Label("\u00A9 2026 OSIS \u00B7 University Systems \u00B7 Online Student Information System");
        footer.getStyleClass().add("dashboard-footer");
        footer.setMaxWidth(Double.MAX_VALUE);
        setBottom(footer);
    }

    private final TopBar topBarRef;

    /** Subclasses build the page content for the given nav index. */
    protected abstract Region buildPage(int index);

    /**
     * Must be called by each subclass AFTER its own fields are fully
     * initialized (i.e. as the very last line of the subclass constructor).
     * This avoids invoking the overridden {@link #buildPage(int)} before
     * subclass state (e.g. the logged-in user's model object) is ready.
     */
    protected void init() {
        navigateTo(0);
    }

    protected void navigateTo(int index) {
        Region newPage = buildPage(index);
        if (contentArea.getChildren().isEmpty()) {
            contentArea.getChildren().add(newPage);
            Animations.fadeIn(newPage, Duration.millis(350)).play();
        } else {
            Region old = (Region) contentArea.getChildren().get(0);
            Animations.crossFade(old, newPage, () -> contentArea.getChildren().set(0, newPage));
        }
    }

    private SidebarController loadSidebar(String role, String[] icons, String[] labels, Runnable onLogout) {
        if (icons.length != labels.length) {
            throw new IllegalArgumentException("Sidebar icons and labels must have the same number of entries.");
        }
        URL sidebarView = DashboardShell.class.getResource("/com/osis/view/Sidebar.fxml");
        if (sidebarView == null) {
            throw new IllegalStateException("Sidebar.fxml is missing from application resources.");
        }
        try {
            FXMLLoader loader = new FXMLLoader(sidebarView);
            setLeft(loader.load());
            SidebarController controller = loader.getController();
            List<NavItem> items = new ArrayList<>();
            for (int index = 0; index < labels.length; index++) {
                items.add(new NavItem(String.valueOf(index), icons[index], labels[index]));
            }
            controller.setRoleTag(role.toUpperCase());
            controller.setOnLogout(onLogout);
            controller.setOnNavigate(id -> navigateTo(Integer.parseInt(id)));
            controller.setNavItems(items, "0");
            return controller;
        } catch (IOException exception) {
            throw new IllegalStateException("Unable to load the sidebar view.", exception);
        }
    }
}
