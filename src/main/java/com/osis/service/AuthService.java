package com.osis.service;

import com.osis.dao.UserAccountDao;
import com.osis.model.Admin;
import com.osis.model.Lecturer;
import com.osis.model.Person;
import com.osis.model.Role;
import com.osis.model.Student;
import com.osis.model.UserAccount;
import com.osis.util.ActionLogger;
import com.osis.util.ValidationUtil;

import java.util.Optional;

/**
 * Authentication and user registration service.
 */
public class AuthService {

    private static final AuthService INSTANCE = new AuthService();
    private final UserAccountDao accountDao = new UserAccountDao();
    private final DataStore fallbackStore = DataStore.getInstance();
    private Person currentUser;

    private AuthService() {
    }

    public static AuthService getInstance() {
        return INSTANCE;
    }

    public Optional<Person> authenticate(String email, String password, Role role) {
        if (!ValidationUtil.isValidEmail(email)) {
            ActionLogger.warning("auth:invalid-email", "User attempted login with invalid email: " + email);
            return Optional.empty();
        }

        if (accountDao == null) {
            return fallbackAuthenticate(email, password, role);
        }

        Optional<UserAccount> account = accountDao.findByEmailAndRole(email, role.getLabel());
        if (account.isPresent() && account.get().getPassword().equals(password)) {
            Person user = mapAccountToPerson(account.get(), role);
            currentUser = user;
            ActionLogger.info("auth:login", "Authenticated " + role.getLabel() + " user: " + email);
            return Optional.of(user);
        }

        return fallbackAuthenticate(email, password, role);
    }

    private Optional<Person> fallbackAuthenticate(String email, String password, Role role) {
        Person user = fallbackStore.authenticate(email, password, role);
        if (user != null) {
            currentUser = user;
            ActionLogger.info("auth:login", "Authenticated fallback user: " + email);
            return Optional.of(user);
        }
        ActionLogger.warning("auth:failed", "Invalid login attempt for: " + email + " as " + role.getLabel());
        return Optional.empty();
    }

    public boolean registerStudent(String fullName, String email, String password, String department, int yearLevel) {
        if (!ValidationUtil.isNonEmpty(fullName) || !ValidationUtil.isValidEmail(email) || !ValidationUtil.isNonEmpty(password)) {
            return false;
        }
        if (fallbackStore.getStudents().stream().anyMatch(s -> s.getEmail().equalsIgnoreCase(email))) {
            return false;
        }
        Student student = new Student(fullName, email, password, department, yearLevel);
        fallbackStore.addStudent(student);
        accountDao.save(new UserAccount(student.getId(), fullName, email, password, Role.STUDENT.getLabel(), java.time.LocalDateTime.now()));
        ActionLogger.info("auth:register", "Registered student " + email);
        return true;
    }

    private Person mapAccountToPerson(UserAccount account, Role role) {
        return switch (role) {
            case ADMIN -> new Admin(account.getFullName(), account.getEmail(), account.getPassword(), "Registrar");
            case LECTURER -> new Lecturer(account.getFullName(), account.getEmail(), account.getPassword(), "General Studies", "Lecturer");
            case STUDENT -> new Student(account.getFullName(), account.getEmail(), account.getPassword(), "Undeclared", 1);
        };
    }

    public void logout() {
        currentUser = null;
    }

    public boolean emailExists(String email, Role role) {
        if (!ValidationUtil.isValidEmail(email)) {
            return false;
        }
        if (accountDao != null) {
            Optional<UserAccount> account = accountDao.findByEmailAndRole(email, role.getLabel());
            if (account.isPresent()) {
                return true;
            }
        }
        return switch (role) {
            case ADMIN -> fallbackStore.getAdmins().stream().anyMatch(a -> a.getEmail().equalsIgnoreCase(email));
            case STUDENT -> fallbackStore.getStudents().stream().anyMatch(s -> s.getEmail().equalsIgnoreCase(email));
            case LECTURER -> fallbackStore.getLecturers().stream().anyMatch(l -> l.getEmail().equalsIgnoreCase(email));
        };
    }

    public Optional<Person> getCurrentUser() {
        return Optional.ofNullable(currentUser);
    }
}
