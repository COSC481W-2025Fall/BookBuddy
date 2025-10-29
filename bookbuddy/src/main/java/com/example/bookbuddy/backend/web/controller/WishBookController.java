package com.example.bookbuddy.backend.web.controller;

import com.example.bookbuddy.backend.infrastructure.service.BookService;
import com.example.bookbuddy.backend.infrastructure.service.WishBookService;
import com.example.bookbuddy.backend.web.dto.BookDto;
import com.example.bookbuddy.backend.web.dto.WishBookDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/WishBook")
public class WishBookController {



        private final WishBookService wishbookService; // lowercase convention

        public WishBookController(WishBookService wishbookService) {
            this.wishbookService = wishbookService;
        }

        @PostMapping("/addWishBook")
        public ResponseEntity<WishBookDto> addWishBook(@RequestBody WishBookDto wishbookDto) {
            WishBookDto newWishBook = wishbookService.createWishBook(wishbookDto);
            return new ResponseEntity<>(newWishBook, HttpStatus.CREATED);
        }

        //  change Long -> String
        @GetMapping("/getWishBook/{WishBookIsbn}")
        public ResponseEntity<WishBookDto> getBook(@PathVariable("WishBookIsbn") String wishbookIsbn) {
            WishBookDto retrievedWishBook = wishbookService.getWishBookByIsbn(wishbookIsbn);
            return new ResponseEntity<>(retrievedWishBook, HttpStatus.OK);
        }
    }


