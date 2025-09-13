package com.example.bookbuddy.backend.web.controller;

import com.example.bookbuddy.backend.infrastructure.service.BookService;
import com.example.bookbuddy.backend.web.dto.BookDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/Book")

public class BookController {

    
  

        public BookService BookService;

        public BookController(BookService BookService) {
            this.BookService = BookService;
        }

        @PostMapping("/addBook")
        public ResponseEntity<BookDto> addBook(@RequestBody BookDto BookDto) {
            BookDto newBook = BookService.createBook(BookDto);
            return new ResponseEntity<>(newBook, HttpStatus.CREATED);
        }

        @GetMapping("/getBook/{BookIsbn}")
        public ResponseEntity<BookDto> getBook(@PathVariable("BookIsbn") Long bookIsbn) {
            BookDto retrievedBook = BookService.getBookByIsbn(bookIsbn);
            return new ResponseEntity<>(retrievedBook, HttpStatus.OK);


        }

}
