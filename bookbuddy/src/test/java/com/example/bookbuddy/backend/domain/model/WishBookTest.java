package com.example.bookbuddy.backend.domain.model;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class WishBookTest {

    //WishBook object made to test WishBook.java class
    WishBook WishBook = new WishBook("testIBSN", "testName", "testAuthor", "testGenre", "testCoverId", "testDescription", 0, "testPublication");

    //Test to return IBSN
    @Test
    void getIsbn() {
        assertEquals("testIBSN",  WishBook.getIsbn());
    }

    //Test to set IBSN
    @Test
    void setIsbn() {
        WishBook.setIsbn("testNewISBN");
        assertEquals("testNewISBN", WishBook.getIsbn());
    }

    //Test to return author
    @Test
    void getAuthor() {
        assertEquals("testAuthor", WishBook.getAuthor());
    }

    //Test to set author
    @Test
    void setAuthor() {
        WishBook.setAuthor("testNewAuthor");
        assertEquals("testNewAuthor", WishBook.getAuthor());
    }

    //Test to return genre
    @Test
    void getGenre() {
        assertEquals("testGenre", WishBook.getGenre());
    }

    //Test to set genre
    @Test
    void setGenre() {
        WishBook.setGenre("testNewGenre");
        assertEquals("testNewGenre", WishBook.getGenre());
    }

    //Test to return WishBookname
    @Test
    void getWishBookname() {
        assertEquals("testName", WishBook.getBookname());
    }

    //Test to set WishBook name
    @Test
    void setWishBookname() {
        WishBook.setBookname("testNewWishBookname");
        assertEquals("testNewWishBookname", WishBook.getBookname());
    }

    //Test to return cover ID
    @Test
    void getCoverId() {
        assertEquals("testCoverId", WishBook.getCoverid());
    }

    //Test to set cover ID
    @Test
    void setCoverId() {
        WishBook.setCoverid("testNewCoverId");
        assertEquals("testNewCoverId", WishBook.getCoverid());
    }

    //Test to return description
    @Test
    void getDescription() {
        assertEquals("testDescription", WishBook.getDescription());
    }

    //Test to set description
    @Test
    void setDescription() {
        WishBook.setDescription("testNewDescription");
        assertEquals("testNewDescription", WishBook.getDescription());
    }

    //Test to return page count
    @Test
    void getPageCount() {
        assertEquals(0, WishBook.getPagecount());
    }

    //Test to set page count
    @Test
    void setPageCount() {
        WishBook.setPagecount(1);
        assertEquals(1, WishBook.getPagecount());
    }

    //Test to return publication
    @Test
    void getPublication() {
        assertEquals("testPublication", WishBook.getPublication());
    }

    //Test to set publication
    @Test
    void setPublication() {
        WishBook.setPublication("testNewPublication");
        assertEquals("testNewPublication", WishBook.getPublication());
    }

    //Empty WishBook to test empty constructor
    WishBook emptyWishBook = new WishBook();

    //All of these return statements should return null because nothing was set
    @Test
    void getEmptyIsbn() {
        assertNull(emptyWishBook.getIsbn());
    }

    @Test
    void getEmptyAuthor() {
        assertNull(emptyWishBook.getAuthor());
    }

    @Test
    void getEmptyGenre() {
        assertNull(emptyWishBook.getGenre());
    }

    @Test
    void getEmptyWishBookname() {
        assertNull(emptyWishBook.getBookname());
    }
}