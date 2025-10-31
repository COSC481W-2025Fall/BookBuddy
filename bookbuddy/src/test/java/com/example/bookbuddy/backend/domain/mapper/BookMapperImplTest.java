package com.example.bookbuddy.backend.domain.mapper;

import com.example.bookbuddy.backend.domain.model.Book;
import com.example.bookbuddy.backend.web.dto.BookDto;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class BookMapperImplTest {
    //Test objects needed for the testing
    Book book =  new Book("testIBSN", "testName", "testAuthor", "testGenre", "", "", 0, "");
    BookMapperImpl mapper = new BookMapperImpl();
    BookDto bookDto = new BookDto();
    Book DtoToBook = new Book();

    //Test to get a book database transfer object from a book
    @Test
    void convertToDto() {
        bookDto = mapper.convertToDto(book);
        assertNotNull(bookDto);
    }

    //Test to get a book from the book database object
    @Test
    void convertToBook() {
        //book database transfer object is created again from the previous test
        bookDto = mapper.convertToDto(book);

        //new book object is used to ensure the variables are passed
        DtoToBook =  mapper.convertToBook(bookDto);
        assertNotNull(DtoToBook);
        assertEquals("testIBSN",  DtoToBook.getIsbn());
        assertEquals("testName", DtoToBook.getBookname());
        assertEquals("testAuthor", DtoToBook.getAuthor());
        assertEquals("testGenre", DtoToBook.getGenre());
    }

    //Empty object used to test the null scenrio
    Book emptyBook;
    BookDto emptyBookDto;

    //Both test should return null
    @Test
    void nullConvertToDto() {
        emptyBookDto = mapper.convertToDto(emptyBook);
        assertNull(emptyBookDto);
    }

    @Test
    void nullConvertToBook() {
        emptyBook =  mapper.convertToBook(emptyBookDto);
        assertNull(emptyBook);
    }
}