package com.example.bookbuddy.backend.domain.model;

import org.junit.jupiter.api.Test;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.*;

class AccountTest {
    //Test account for testing the account class
    final Account testAccount = new Account("TestName", "TestPassword");

    //Test for returning the account password
    @Test
    void getPassword() {
        assertEquals("TestPassword", testAccount.getPassword());
    }

    //Test for changing the account password
    @Test
    void setPassword() {
        testAccount.setPassword("NewPassword");
        assertEquals("NewPassword", testAccount.getPassword());
    }

    //Test for returning the account ID
    @Test
    void getAccountId() {
        //I dont know how to test when i dont know what the account ID may be
        //This is just a test to see that the account ID is a positive long number
        assertTrue( testAccount.getAccountId() >= 0L);
    }

    //Test for setting the account ID
    @Test
    void setAccountId() {
        testAccount.setAccountId((long) 100);
        assertEquals(100L, testAccount.getAccountId());
    }

    //Test for returning the account name
    @Test
    void getName() {
        assertEquals("TestName", testAccount.getName());
    }

    //Test for changing the account name
    @Test
    void setName() {
        testAccount.setName("NewName");
        assertEquals("NewName", testAccount.getName());
    }

    //Test account for testing the account class
    final Account defaultConstrutorAccount = new Account();

    @Test
    void getNameEmpty() {
        assertNull(defaultConstrutorAccount.getName());
    }

    @Test
    void getPasswordEmpty() {
        assertNull(defaultConstrutorAccount.getPassword());
    }
}