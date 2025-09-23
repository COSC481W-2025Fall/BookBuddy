package com.example.bookbuddy.backend.web.dto;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class LoginDtoTest {
    //Test loginDto object used for testing
    LoginDto loginDto = new LoginDto();

    //Test to see that setting a password does not throw an exception
    @Test
    void setPassword() {
        assertDoesNotThrow(() -> loginDto.setPassword("password"));
    }

    //Test to return a password that has been set
    @Test
    void getPassword() {
        loginDto.setPassword("password2");
        assertEquals("password2", loginDto.getPassword());
    }

    //Test to see that setting a name does not throw an exception
    @Test
    void setName() {
        assertDoesNotThrow(() -> loginDto.setName("name"));
    }

    //Test to return a name that has been set
    @Test
    void getName() {
        loginDto.setName("name2");
        assertEquals("name2", loginDto.getName());
    }
}