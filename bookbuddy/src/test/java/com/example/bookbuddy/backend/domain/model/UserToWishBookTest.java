package com.example.bookbuddy.backend.domain.model;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class UserToWishBookTest {
    //Test Account and WishBook objects made for the UsertTOWishBook constructor
    final Account testAccount = new Account("TestName", "TestPassword");
    final WishBook testWishBook = new WishBook("testIBSN", "testName", "testAuthor", "testGenre", "testCoverId", "testDescription", 0, "testPublication");

    //Test user to WishBook object created with the test Account and WishBook
    final UserToWishBook testUserToWishBook = new UserToWishBook(testAccount, testWishBook);

    @Test
    void getId() {
        //user id is generated so I dont know how to test this effectively
        //the id is never set in the constructor, or ever, so it always returns null
        //assertNotNull(testUserToWishBook.getId());
    }

    //Test to return the Account associated the testUserToWishBook object
    @Test
    void getAccount() {
        assertEquals(testAccount, testUserToWishBook.getAccount());
        assertEquals("TestName", testUserToWishBook.getAccount().getName());
    }

    //Test to return the WishBook associated the testUserToWishBook object
    @Test
    void getWishBook() {
        assertEquals(testWishBook, testUserToWishBook.getWishBook());
        assertEquals("testIBSN", testUserToWishBook.getWishBook().getIsbn());
    }

    //New Account and WishBook objects created to test the setters
    final Account newAccount = new Account("NewName", "NewPassword");
    final WishBook newWishBook = new WishBook("newIBSN", "newName", "newAuthor", "newGenre", "newCoverId", "newDescription", 1, "newPublication");

    //The new Account should be set and returned
    @Test
    void setAccount() {
        testUserToWishBook.setAccount(newAccount);
        assertEquals(newAccount, testUserToWishBook.getAccount());
    }

    //The new WishBook should be set and returned
    @Test
    void setWishBook() {
        testUserToWishBook.setWishBook(newWishBook);
        assertEquals(newWishBook, testUserToWishBook.getWishBook());
    }

    //Empty UserToWishBook object is created to test the default constructor
    final UserToWishBook emptyUserToWishBook = new UserToWishBook();
    @Test
    void nullGetters() {
        assertNull(emptyUserToWishBook.getAccount());
        assertNull(emptyUserToWishBook.getWishBook());
    }
}