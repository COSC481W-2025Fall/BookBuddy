package com.example.bookbuddy.backend.web.dto;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class BookDtoTest {

    //Test Bookdto object used for testing
    BookDto testBookDto =  new BookDto("testIBSN", "testName", "testAuthor", "testGenre", "testCoverid",  "testDescription", 200, "testPublication");

    //Test for returning the book IBSN
    @Test
    void getIsbn() {
        assertEquals("testIBSN", testBookDto.getIsbn());
    }

    //Test for changing the book IBSN
    @Test
    void setIsbn() {
        testBookDto.setIsbn("testNewIBSN");
        assertEquals("testNewIBSN", testBookDto.getIsbn());
    }

    //Test for returning the book name
    @Test
    void getBookname() {
        assertEquals("testName", testBookDto.getBookname());
    }

    //Test for changing the book name
    @Test
    void setBookname() {
        testBookDto.setBookname("testNewBookname");
        assertEquals("testNewBookname", testBookDto.getBookname());
    }

    //Test for returning the book author
    @Test
    void getAuthor() {
        assertEquals("testAuthor", testBookDto.getAuthor());
    }

    //Test for changing the book author
    @Test
    void setAuthor() {
        testBookDto.setAuthor("testNewAuthor");
        assertEquals("testNewAuthor", testBookDto.getAuthor());
    }

    //Test for returning the book genre
    @Test
    void getGenre() {
        assertEquals("testGenre", testBookDto.getGenre());
    }


    //Test for changing the book genre
    @Test
    void setGenre() {
        testBookDto.setGenre("testNewGenre");
        assertEquals("testNewGenre", testBookDto.getGenre());
    }

    //Test Bookdto object used for default constructor testing
    //All of these tests should be null
    BookDto testEmptyBookDto =  new BookDto();
    @Test
    void emptygetIsbn() {
        assertNull(testEmptyBookDto.getIsbn());
    }

    @Test
    void emptygetBookname() {
        assertNull(testEmptyBookDto.getBookname());
    }

    @Test
    void emptygetAuthor() {
        assertNull(testEmptyBookDto.getAuthor());
    }

    @Test
    void emptygetGenre() {
        assertNull(testEmptyBookDto.getGenre());
    }
}