package com.osis.ui.components;

import com.osis.util.Animations;
import javafx.geometry.Insets;
import javafx.scene.Node;
import javafx.scene.control.Label;
import javafx.scene.layout.VBox;
import javafx.util.Duration;

/** Reusable glass content card with a title header, used to wrap tables/forms. */
public class ContentCard extends VBox {

    public ContentCard(String title, Node content) {
        getStyleClass().addAll("content-card", "glass-panel");
        setSpacing(14);
        setPadding(new Insets(22));

        if (title != null) {
            Label heading = new Label(title);
            heading.getStyleClass().add("h2-title");
            getChildren().add(heading);
        }
        getChildren().add(content);

        Animations.fadeInUp(this, Duration.millis(420), 18).play();
    }
}
