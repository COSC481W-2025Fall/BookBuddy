package com.example.bookbuddy.backend.domain.model;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class LoginTest {
    //Empty login object to test the Login.java class
    Login login = new Login("testName", "testPassword");

    //Not testing until I know these features are going to be used
    @Test
    void getLoginId() {
        //may be removed
    }

    @Test
    void setLoginId() {
        //may be removed
    }

    //Test to return the login name
    @Test
    void getName() {
        assertEquals("testName", login.getName());
    }

    //Test to set the login name
    @Test
    void setName() {
        login.setName("testNewName");
        assertEquals("testNewName", login.getName());
    }

    //Test to return the login password
    @Test
    void getPassword() {
        assertEquals("testPassword", login.getPassword());
    }

    //Test to set the login password
    @Test
    void setPassword() {
        login.setPassword("testNewPassword");
        assertEquals("testNewPassword", login.getPassword());
    }

    //Empty Login object to test empty constructor
    Login emptyLogin = new Login();

    //These tests of getName and getPassword should return null because they are not set
    @Test
    void emptyGetName() {
        assertNull(emptyLogin.getName());
    }

    @Test
    void emptyGetPassword() {
        assertNull(emptyLogin.getPassword());
    }
}