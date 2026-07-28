package com.osis.db;

import com.osis.util.ActionLogger;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.time.Duration;
import java.util.Objects;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * Simple JDBC connection manager for MySQL. Reads credentials from
 * resources/db.properties and exposes a single Connection for DAO use.
 */
public class DatabaseManager {

    private static final DatabaseManager INSTANCE = new DatabaseManager();
    private static final Logger LOGGER = Logger.getLogger(DatabaseManager.class.getName());

    private Connection connection;
    private boolean available = false;
    private boolean initialized = false;

    private DatabaseManager() {
    }

    public static DatabaseManager getInstance() {
        return INSTANCE;
    }

    public void initialize() {
        if (initialized) {
            return;
        }
        initialized = true;

        Properties config = new Properties();
        try (InputStream stream = DatabaseManager.class.getResourceAsStream("/db.properties")) {
            if (stream == null) {
                throw new IOException("Missing db.properties resource");
            }
            config.load(stream);
            String url = config.getProperty("db.url");
            String user = config.getProperty("db.username");
            String password = config.getProperty("db.password");
            if (url == null || user == null || password == null) {
                throw new IllegalStateException("Database configuration is incomplete");
            }
            LOGGER.info("Initializing MySQL connection for OSIS...");
            Class.forName("com.mysql.cj.jdbc.Driver");
            this.connection = DriverManager.getConnection(url, user, password);
            this.connection.setNetworkTimeout(null, (int) Duration.ofSeconds(6).toMillis());
            this.available = true;
            LOGGER.info("Database connection established.");
        } catch (IOException | ClassNotFoundException | SQLException | IllegalStateException ex) {
            this.available = false;
            LOGGER.log(Level.WARNING, "Unable to initialize database connection: " + ex.getMessage(), ex);
            ActionLogger.warning("database:init", "Falling back to mock data store because JDBC initialization failed.");
        }
    }

    public Connection getConnection() throws SQLException {
        if (connection == null || connection.isClosed()) {
            throw new SQLException("Database connection is not available");
        }
        return connection;
    }

    public boolean isHealthy() {
        try {
            return available && connection != null && !connection.isClosed() && connection.isValid(2);
        } catch (SQLException ex) {
            return false;
        }
    }

    public void shutdown() {
        if (connection != null) {
            try {
                connection.close();
                available = false;
                LOGGER.info("Database connection closed.");
            } catch (SQLException ex) {
                LOGGER.log(Level.WARNING, "Error closing database connection", ex);
            }
        }
    }
}
