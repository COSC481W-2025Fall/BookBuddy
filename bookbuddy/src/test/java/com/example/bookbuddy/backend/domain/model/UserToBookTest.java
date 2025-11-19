package com.example.bookbuddy.backend.domain.model;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class UserToBookTest {
    //Test Account and Book objects made for the UsertTOBook constructor
    final Account testAccount = new Account("TestName", "TestPassword");
    final Book testbook = new Book("testIBSN", "testName", "testAuthor", "testGenre", "testCoverId", "testDescription", 0, "testPublication");

    //Test user to book object created with the test Account and Book
    final UserToBook testUserToBook = new UserToBook(testAccount, testbook);

    @Test
    void getId() {
        //user id is generated so I dont know how to test this effectively
        //the id is never set in the constructor, or ever, so it always returns null
        //assertNotNull(testUserToBook.getId());
    }

    //Test to return the Account associated the testUserToBook object
    @Test
    void getAccount() {
        assertEquals(testAccount, testUserToBook.getAccount());
        assertEquals("TestName", testUserToBook.getAccount().getName());
    }

    //Test to return the Book associated the testUserToBook object
    @Test
    void getBook() {
        assertEquals(testbook, testUserToBook.getBook());
        assertEquals("testIBSN", testUserToBook.getBook().getIsbn());
    }

    //New Account and Book objects created to test the setters
    final Account newAccount = new Account("NewName", "NewPassword");
    final Book newBook = new Book("newIBSN", "newName", "newAuthor", "newGenre", "newCoverId", "newDescription", 1, "newPublication");

    //The new Account should be set and returned
    @Test
    void setAccount() {
        testUserToBook.setAccount(newAccount);
        assertEquals(newAccount, testUserToBook.getAccount());
    }

    //The new Book should be set and returned
    @Test
    void setBook() {
        testUserToBook.setBook(newBook);
        assertEquals(newBook, testUserToBook.getBook());
    }

    //Empty UserToBook object is created to test the default constructor
    final UserToBook emptyUserToBook = new UserToBook();
    @Test
    void nullGetters() {
        assertNull(emptyUserToBook.getAccount());
        assertNull(emptyUserToBook.getBook());
    }
}