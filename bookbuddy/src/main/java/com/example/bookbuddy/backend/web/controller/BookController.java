package com.example.bookbuddy.backend.web.controller;

import com.example.bookbuddy.backend.infrastructure.service.BookService;
import com.example.bookbuddy.backend.web.dto.BookDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/Book")
public class BookController {

    private final BookService bookService; // lowercase convention

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @PostMapping("/addBook")
    public ResponseEntity<BookDto> addBook(@RequestBody BookDto bookDto) {
        BookDto newBook = bookService.createBook(bookDto);
        return new ResponseEntity<>(newBook, HttpStatus.CREATED);
    }

    //  change Long -> String
    @GetMapping("/getBook/{BookIsbn}")
    public ResponseEntity<BookDto> getBook(@PathVariable("BookIsbn") String bookIsbn) {
        BookDto retrievedBook = bookService.getBookByIsbn(bookIsbn);
        return new ResponseEntity<>(retrievedBook, HttpStatus.OK);
    }
}

