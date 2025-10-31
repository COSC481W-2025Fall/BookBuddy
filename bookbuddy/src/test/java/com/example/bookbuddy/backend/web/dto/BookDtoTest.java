package com.example.bookbuddy.backend.web.dto;

import com.example.bookbuddy.backend.domain.model.Book;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class BookDtoTest {

    //Test Bookdto object used for testing
    BookDto testBookDto =  new BookDto("testIBSN", "testName", "testAuthor", "testGenre", "testCoverId", "testDescription", 0, "testPublication");

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

    //Test to return cover ID
    @Test
    void getCoverId() {
        assertEquals("testCoverId", testBookDto.getCoverid());
    }

    //Test to set cover ID
    @Test
    void setCoverId() {
        testBookDto.setCoverid("testNewCoverId");
        assertEquals("testNewCoverId", testBookDto.getCoverid());
    }

    //Test to return description
    @Test
    void getDescription() {
        assertEquals("testDescription", testBookDto.getDescription());
    }

    //Test to set description
    @Test
    void setDescription() {
        testBookDto.setDescription("testNewDescription");
        assertEquals("testNewDescription", testBookDto.getDescription());
    }

    //Test to return page count
    @Test
    void getPageCount() {
        assertEquals(0, testBookDto.getPagecount());
    }

    //Test to set page count
    @Test
    void setPageCount() {
        testBookDto.setPagecount(1);
        assertEquals(1, testBookDto.getPagecount());
    }

    //Test to return publication
    @Test
    void getPublication() {
        assertEquals("testPublication", testBookDto.getPublication());
    }

    //Test to set publication
    @Test
    void setPublication() {
        testBookDto.setPublication("testNewPublication");
        assertEquals("testNewPublication", testBookDto.getPublication());
    }

    //Test to turn a book into a BookDTO
    @Test
    void toBook() {
        Book DtoToBook = testBookDto.toBook();
        assertEquals(testBookDto.getIsbn(), DtoToBook.getIsbn());
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