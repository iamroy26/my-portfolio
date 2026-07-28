package com.osis.util;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.logging.FileHandler;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.logging.SimpleFormatter;

/**
 * Centralized action logger for audit-style event tracking and production
 * diagnostics. Writes both console output and a rolling file log.
 */
public final class ActionLogger {

    private static final Logger LOGGER = Logger.getLogger("com.osis.action");
    private static final Path LOG_DIRECTORY = Paths.get("logs");
    private static final String LOG_FILE = "logs/osis-actions.log";

    static {
        try {
            if (!Files.exists(LOG_DIRECTORY)) {
                Files.createDirectories(LOG_DIRECTORY);
            }
            FileHandler fileHandler = new FileHandler(LOG_FILE, true);
            fileHandler.setFormatter(new SimpleFormatter());
            LOGGER.addHandler(fileHandler);
            LOGGER.setLevel(Level.INFO);
            LOGGER.setUseParentHandlers(true);
        } catch (IOException ex) {
            LOGGER.log(Level.SEVERE, "Unable to initialize action logger file handler", ex);
        }
    }

    private ActionLogger() {
    }

    public static void info(String action, String details) {
        LOGGER.info(format(action, details));
    }

    public static void warning(String action, String details) {
        LOGGER.warning(format(action, details));
    }

    public static void error(String action, String details, Throwable throwable) {
        LOGGER.log(Level.SEVERE, format(action, details), throwable);
    }

    private static String format(String action, String details) {
        return String.format("[%s] %s", action, details == null ? "" : details);
    }
}
