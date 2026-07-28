package com.osis.util;

import java.util.regex.Pattern;

/**
 * Shared validation helpers used by services and UI controllers.
 */
public final class ValidationUtil {

    private static final Pattern EMAIL_PATTERN = Pattern.compile(
            "^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$",
            Pattern.CASE_INSENSITIVE);

    private ValidationUtil() {
    }

    public static boolean isValidEmail(String email) {
        return email != null && EMAIL_PATTERN.matcher(email).matches();
    }

    public static boolean isValidCourseCode(String code) {
        return code != null && code.matches("[A-Z]{3,5}\\d{3}");
    }

    public static boolean isNonEmpty(String value) {
        return value != null && !value.isBlank();
    }

    public static boolean isValidYear(int year) {
        return year >= 1 && year <= 8;
    }
}
