package com.osis.util;

import javafx.scene.Scene;

import java.util.Objects;

/** Manages light/dark theme switching across the whole application Scene. */
public final class ThemeManager {

    public enum Mode { DARK, LIGHT }

    private static Mode currentMode = Mode.DARK;

    private static final String BASE_CSS = res("/css/base.css");
    private static final String DARK_CSS = res("/css/theme-dark.css");
    private static final String LIGHT_CSS = res("/css/theme-light.css");

    private ThemeManager() {}

    private static String res(String path) {
        return Objects.requireNonNull(ThemeManager.class.getResource(path)).toExternalForm();
    }

    public static void apply(Scene scene) {
        scene.getStylesheets().clear();
        scene.getStylesheets().add(BASE_CSS);
        scene.getStylesheets().add(currentMode == Mode.DARK ? DARK_CSS : LIGHT_CSS);
    }

    public static void toggle(Scene scene) {
        currentMode = (currentMode == Mode.DARK) ? Mode.LIGHT : Mode.DARK;
        apply(scene);
    }

    public static Mode getCurrentMode() { return currentMode; }
}
