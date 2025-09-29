package com.example.bookbuddy.backend.infrastructure.service;

import com.example.bookbuddy.backend.domain.mapper.BookMapperImpl;
import com.example.bookbuddy.backend.domain.model.Book;
import com.example.bookbuddy.backend.domain.repository.BookRepository;
import com.example.bookbuddy.backend.web.dto.BookDto;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class BookServiceTest {
    //Uses the actual database to run this test via this @Autowired
    //Real database should not be affected after the fact

    /*
    @Autowired
    private BookService bookService;

    @Autowired
    private BookRepository bookRepository;

    @Test
    void createBook() {
        Book testBook = new Book("1", "testName", "testAuthor", "testGenre");
        BookMapperImpl bookMapper = new BookMapperImpl();
        BookDto bookDto = bookMapper.convertToDto(testBook);

        //Adds the book to the database
        BookDto createdBook = bookService.createBook(bookDto);

        //Test the returned Dto object
        assertNotNull(createdBook);

        //See if the IBSN is intact
        assertEquals("1", createdBook.getIsbn());

        //See if the book is inside the database
        assertTrue(bookRepository.existsById(createdBook.getIsbn()));
    }

    //Test for when a book is not found
    @Test
    void getBookByIsbn() {
        //Empty string is used to ensure the IBSN doesn't exist
        assertThrows(IllegalArgumentException.class, () -> bookService.getBookByIsbn(" "));
    }
    */

}