package com.example.bookbuddy.backend.infrastructure.service;

import com.example.bookbuddy.backend.domain.mapper.BookMapper;
import com.example.bookbuddy.backend.domain.mapper.WishBookMapper;
import com.example.bookbuddy.backend.domain.model.WishBook;
import com.example.bookbuddy.backend.domain.repository.WishBookRepository;
import com.example.bookbuddy.backend.web.dto.BookDto;
import com.example.bookbuddy.backend.web.dto.WishBookDto;
import org.springframework.stereotype.Service;

@Service
public class WishBookService {


        private final WishBookRepository wishbookRepository;

        public WishBookService(WishBookRepository wishbookRepository) {
            this.wishbookRepository = wishbookRepository;
        }

        public WishBookDto createWishBook(WishBookDto wishbookDto) {
            WishBook newWishBook = WishBookMapper.INSTANCE.convertToWishBook(wishbookDto);
            this.wishbookRepository.save(newWishBook);
            return WishBookMapper.INSTANCE.convertToDto(newWishBook);
        }

        //  use String (isbn) instead of Long
        public WishBookDto getWishBookByIsbn(String wishbookIsbn) {
            WishBook wishbook = wishbookRepository.findById(wishbookIsbn)
                    .orElseThrow(() -> new IllegalArgumentException("Book not found: " + wishbookIsbn));
            return WishBookMapper.INSTANCE.convertToDto(wishbook);
        }
    }


