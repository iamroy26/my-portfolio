package com.osis.ui.components;

import com.osis.util.Animations;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.control.Label;
import javafx.scene.layout.HBox;
import javafx.scene.layout.Priority;
import javafx.scene.layout.VBox;
import javafx.util.Duration;

/**
 * Reusable statistic card with an icon badge, animated count-up value, and
 * a label. Used on Admin / Student / Lecturer dashboards.
 */
public class StatCard extends VBox {

    private final Label valueLabel = new Label("0");

    public StatCard(String emoji, String label, int targetValue, String accentColor) {
        getStyleClass().add("stat-card");
        setSpacing(14);
        setMinWidth(200);
        setPrefWidth(220);

        Label badge = new Label(emoji);
        badge.getStyleClass().add("stat-icon-badge");
        badge.setStyle("-fx-background-color: " + accentColor + "; -fx-font-size: 20px;");

        HBox top = new HBox(badge);
        top.setAlignment(Pos.CENTER_LEFT);

        valueLabel.getStyleClass().add("stat-card-value");
        Label captionLabel = new Label(label);
        captionLabel.getStyleClass().add("stat-card-label");

        VBox textBox = new VBox(2, valueLabel, captionLabel);

        getChildren().addAll(top, textBox);
        VBox.setVgrow(textBox, Priority.NEVER);
        setPadding(new Insets(20));

        Animations.attachHoverScale(this, 1.04);

        Animations.countUp(targetValue, Duration.millis(900), v -> valueLabel.setText(String.valueOf(v)))
                .play();
    }
}
