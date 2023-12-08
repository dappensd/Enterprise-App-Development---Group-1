package com.cincialert;

import com.cincialert.dto.User;
import com.cincialert.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@DataJpaTest
public class UserTest {

    @Test
    void contextLoads(){
    }

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private UserRepository userRepository;

    @Test
    public void testSaveUser() {
        // Create a User instance
        User user = new User();
        user.setUsername("testuser");
        user.setPassword_hash("testpassword");
        user.setEmail("test@example.com");

        // Save the User to the database
        User savedUser = userRepository.save(user);

        // Verify that the User was saved and has an ID assigned
        assertNotNull(savedUser.getId());
        assertEquals("testuser", savedUser.getUsername());
        assertEquals("testpassword", savedUser.getPassword_hash());
        assertEquals("test@example.com", savedUser.getEmail());

        // Retrieve the User from the database using the TestEntityManager
        User retrievedUser = entityManager.find(User.class, savedUser.getId());

        // Verify that the retrieved User matches the saved User
        assertEquals(savedUser, retrievedUser);
    }
}
