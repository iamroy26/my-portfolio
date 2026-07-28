package com.osis.ui.components;

import com.osis.util.Animations;
import javafx.geometry.Pos;
import javafx.scene.control.Label;
import javafx.scene.layout.HBox;
import javafx.scene.layout.Priority;
import javafx.scene.layout.Region;
import javafx.scene.layout.VBox;
import javafx.util.Duration;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;

/**
 * Reusable sidebar navigation used by all three dashboards. Slides in from
 * the left on dashboard load and highlights the active item.
 */
public class Sidebar extends VBox {

    private final List<HBox> itemNodes = new ArrayList<>();
    private int activeIndex = 0;

    public Sidebar(String appName, String roleLabel, String[] icons, String[] labels, Consumer<Integer> onSelect) {
        getStyleClass().add("sidebar");
        setSpacing(6);
        setPrefWidth(230);
        setMinWidth(230);

        Label logo = new Label(appName);
        logo.getStyleClass().add("sidebar-logo");
        Label role = new Label(roleLabel.toUpperCase());
        role.getStyleClass().add("sidebar-role-tag");

        VBox header = new VBox(4, logo, role);
        header.setPadding(new javafx.geometry.Insets(6, 10, 24, 10));

        getChildren().add(header);

        for (int i = 0; i < labels.length; i++) {
            int index = i;
            Label icon = new Label(icons[i]);
            icon.getStyleClass().add("icon-label");
            Label text = new Label(labels[i]);
            HBox item = new HBox(12, icon, text);
            item.getStyleClass().add("nav-item");
            item.setAlignment(Pos.CENTER_LEFT);
            item.setMaxWidth(Double.MAX_VALUE);
            item.setOnMouseClicked(e -> {
                setActive(index);
                onSelect.accept(index);
            });
            itemNodes.add(item);
            getChildren().add(item);
        }

        Region spacer = new Region();
        VBox.setVgrow(spacer, Priority.ALWAYS);
        getChildren().add(spacer);

        Label footer = new Label("© 2026 OSIS Platform");
        footer.getStyleClass().add("muted");
        footer.setPadding(new javafx.geometry.Insets(10));
        getChildren().add(footer);

        setActive(0);
        Animations.slideInFromLeft(this, Duration.millis(450), 260).play();
    }

    public void setActive(int index) {
        if (activeIndex < itemNodes.size()) {
            itemNodes.get(activeIndex).getStyleClass().remove("nav-item-active");
        }
        activeIndex = index;
        itemNodes.get(activeIndex).getStyleClass().add("nav-item-active");
    }
}
