package com.example.bookbuddy.backend.infrastructure.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class StartupMigrationRunner implements CommandLineRunner {

    private final JdbcTemplate jdbcTemplate;

    public StartupMigrationRunner(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public void run(String... args) throws Exception {
        try {
            // Try to alter the column type  will fail without error if already TEXT
            jdbcTemplate.execute("ALTER TABLE book MODIFY description TEXT");
            System.out.println(" Description column updated to TEXT.");
        } catch (Exception e) {
            // If it fails because it's already TEXT / table doesn't exist yet
            System.out.println("ℹ Migration skipped: " + e.getMessage());
        }
    }
}