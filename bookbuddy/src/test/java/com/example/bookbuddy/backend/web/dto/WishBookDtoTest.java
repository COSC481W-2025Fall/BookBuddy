package com.example.bookbuddy.backend.web.dto;

import com.example.bookbuddy.backend.domain.model.WishBook;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class WishBookDtoTest {
    //Test WishBookdto object used for testing
    WishBookDto testWishBookDto =  new WishBookDto("testIBSN", "testName", "testAuthor", "testGenre", "testCoverId", "testDescription", 0, "testPublication");

    //Test for returning the book IBSN
    @Test
    void getIsbn() {
        assertEquals("testIBSN", testWishBookDto.getIsbn());
    }

    //Test for changing the book IBSN
    @Test
    void setIsbn() {
        testWishBookDto.setIsbn("testNewIBSN");
        assertEquals("testNewIBSN", testWishBookDto.getIsbn());
    }

    //Test for returning the book name
    @Test
    void getBookname() {
        assertEquals("testName", testWishBookDto.getBookname());
    }

    //Test for changing the book name
    @Test
    void setBookname() {
        testWishBookDto.setBookname("testNewBookname");
        assertEquals("testNewBookname", testWishBookDto.getBookname());
    }

    //Test for returning the book author
    @Test
    void getAuthor() {
        assertEquals("testAuthor", testWishBookDto.getAuthor());
    }

    //Test for changing the book author
    @Test
    void setAuthor() {
        testWishBookDto.setAuthor("testNewAuthor");
        assertEquals("testNewAuthor", testWishBookDto.getAuthor());
    }

    //Test for returning the book genre
    @Test
    void getGenre() {
        assertEquals("testGenre", testWishBookDto.getGenre());
    }


    //Test for changing the book genre
    @Test
    void setGenre() {
        testWishBookDto.setGenre("testNewGenre");
        assertEquals("testNewGenre", testWishBookDto.getGenre());
    }

    //Test to return cover ID
    @Test
    void getCoverId() {
        assertEquals("testCoverId", testWishBookDto.getCoverid());
    }

    //Test to set cover ID
    @Test
    void setCoverId() {
        testWishBookDto.setCoverid("testNewCoverId");
        assertEquals("testNewCoverId", testWishBookDto.getCoverid());
    }

    //Test to return description
    @Test
    void getDescription() {
        assertEquals("testDescription", testWishBookDto.getDescription());
    }

    //Test to set description
    @Test
    void setDescription() {
        testWishBookDto.setDescription("testNewDescription");
        assertEquals("testNewDescription", testWishBookDto.getDescription());
    }

    //Test to return page count
    @Test
    void getPageCount() {
        assertEquals(0, testWishBookDto.getPagecount());
    }

    //Test to set page count
    @Test
    void setPageCount() {
        testWishBookDto.setPagecount(1);
        assertEquals(1, testWishBookDto.getPagecount());
    }

    //Test to return publication
    @Test
    void getPublication() {
        assertEquals("testPublication", testWishBookDto.getPublication());
    }

    //Test to set publication
    @Test
    void setPublication() {
        testWishBookDto.setPublication("testNewPublication");
        assertEquals("testNewPublication", testWishBookDto.getPublication());
    }

    //Test to turn a book into a BookDTO
    @Test
    void toBook() {
        WishBook DtoToWishBook = testWishBookDto.toWishBook();
        assertEquals(testWishBookDto.getIsbn(), DtoToWishBook.getIsbn());
    }

    //Test Bookdto object used for default constructor testing
    //All of these tests should be null
    WishBookDto testEmptyBookDto =  new WishBookDto();
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