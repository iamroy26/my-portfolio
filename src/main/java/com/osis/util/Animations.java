package com.osis.util;

import javafx.animation.*;
import javafx.scene.Node;
import javafx.scene.effect.DropShadow;
import javafx.scene.paint.Color;
import javafx.util.Duration;

/**
 * Central place for all reusable JavaFX motion-graphics helpers used across
 * the application: fade-ins, slide-ins, hover scaling, counters, and page
 * transitions. Keeping these here avoids duplicating animation code in every
 * view (DRY principle).
 */
public final class Animations {

    private Animations() {}

    /** Simple fade-in from 0 to 1 opacity. */
    public static FadeTransition fadeIn(Node node, Duration duration) {
        node.setOpacity(0);
        FadeTransition ft = new FadeTransition(duration, node);
        ft.setFromValue(0);
        ft.setToValue(1);
        ft.setInterpolator(Interpolator.EASE_OUT);
        return ft;
    }

    /** Fade-in + slight upward rise, good for cards / forms. */
    public static ParallelTransition fadeInUp(Node node, Duration duration, double riseBy) {
        node.setOpacity(0);
        node.setTranslateY(riseBy);
        FadeTransition ft = new FadeTransition(duration, node);
        ft.setFromValue(0);
        ft.setToValue(1);
        TranslateTransition tt = new TranslateTransition(duration, node);
        tt.setFromY(riseBy);
        tt.setToY(0);
        tt.setInterpolator(Interpolator.EASE_OUT);
        return new ParallelTransition(node, ft, tt);
    }

    /** Slide a node in from the left (used for sidebar). */
    public static TranslateTransition slideInFromLeft(Node node, Duration duration, double distance) {
        node.setTranslateX(-distance);
        TranslateTransition tt = new TranslateTransition(duration, node);
        tt.setFromX(-distance);
        tt.setToX(0);
        tt.setInterpolator(Interpolator.EASE_OUT);
        return tt;
    }

    /** Staggered fade-in-up animation applied sequentially to a list of nodes (e.g. cards). */
    public static SequentialTransition staggeredReveal(Iterable<? extends Node> nodes, Duration each, Duration gap) {
        SequentialTransition seq = new SequentialTransition();
        for (Node n : nodes) {
            ParallelTransition pt = fadeInUp(n, each, 16);
            PauseTransition pause = new PauseTransition(gap);
            seq.getChildren().addAll(pt, pause);
        }
        return seq;
    }

    /** Attaches hover scale + glow animation to any node (buttons, cards). */
    public static void attachHoverScale(Node node, double targetScale) {
        ScaleTransition grow = new ScaleTransition(Duration.millis(160), node);
        grow.setToX(targetScale);
        grow.setToY(targetScale);
        grow.setInterpolator(Interpolator.EASE_OUT);

        ScaleTransition shrink = new ScaleTransition(Duration.millis(160), node);
        shrink.setToX(1.0);
        shrink.setToY(1.0);
        shrink.setInterpolator(Interpolator.EASE_OUT);

        DropShadow glow = new DropShadow();
        glow.setColor(Color.web("#22D3EE", 0.55));
        glow.setRadius(18);
        glow.setSpread(0.15);

        node.setOnMouseEntered(e -> {
            grow.stop();
            grow.playFromStart();
            node.setEffect(glow);
        });
        node.setOnMouseExited(e -> {
            shrink.stop();
            shrink.playFromStart();
            node.setEffect(null);
        });
    }

    /** Animates a numeric label counting up from 0 to target - used for stat cards. */
    public static Timeline countUp(int targetValue, Duration duration, java.util.function.Consumer<Integer> onUpdate) {
        Timeline timeline = new Timeline();
        int steps = 30;
        for (int i = 0; i <= steps; i++) {
            int value = (int) Math.round(targetValue * ((double) i / steps));
            KeyFrame kf = new KeyFrame(duration.multiply((double) i / steps), e -> onUpdate.accept(value));
            timeline.getKeyFrames().add(kf);
        }
        return timeline;
    }

    /** Cross-fade transition between two views inside the same container (page transition). */
    public static void crossFade(Node outgoing, Node incoming, Runnable afterSwapInScene) {
        FadeTransition out = new FadeTransition(Duration.millis(160), outgoing);
        out.setFromValue(1);
        out.setToValue(0);
        out.setOnFinished(e -> {
            afterSwapInScene.run();
            FadeTransition in = fadeIn(incoming, Duration.millis(220));
            in.play();
        });
        out.play();
    }

    /** Continuous slow rotation - used for the loading spinner. */
    public static RotateTransition infiniteSpin(Node node, Duration duration) {
        RotateTransition rt = new RotateTransition(duration, node);
        rt.setByAngle(360);
        rt.setCycleCount(Animation.INDEFINITE);
        rt.setInterpolator(Interpolator.LINEAR);
        return rt;
    }
}
