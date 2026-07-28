package com.osis.ui;

import com.osis.util.Animations;
import javafx.animation.PauseTransition;
import javafx.animation.SequentialTransition;
import javafx.geometry.Pos;
import javafx.scene.control.Label;
import javafx.scene.layout.StackPane;
import javafx.scene.layout.VBox;
import javafx.scene.shape.Circle;
import javafx.util.Duration;

/** Animated splash/loading screen displayed briefly before the Login screen. */
public class LoadingScreen extends StackPane {

    public LoadingScreen(Runnable onComplete) {
        getStyleClass().add("app-bg");
        setAlignment(Pos.CENTER);
        setPrefSize(1100, 720);

        Circle ring = new Circle(36);
        ring.getStyleClass().add("loading-ring");
        ring.setStrokeWidth(5);
        ring.getStrokeDashArray().addAll(80d, 50d);

        Label logo = new Label("🎓 OSIS");
        logo.getStyleClass().add("h1-title");
        Label tagline = new Label("Online Student Information System");
        tagline.getStyleClass().add("subtitle");

        VBox box = new VBox(18, ring, logo, tagline);
        box.setAlignment(Pos.CENTER);
        getChildren().add(box);

        Animations.infiniteSpin(ring, Duration.seconds(1.1)).play();

        SequentialTransition seq = new SequentialTransition(
                Animations.fadeIn(box, Duration.millis(500)),
                new PauseTransition(Duration.millis(1100))
        );
        seq.setOnFinished(e -> onComplete.run());
        seq.play();
    }
}
