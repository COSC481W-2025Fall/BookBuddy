package com.example.bookbuddy.backend.infrastructure.service;

import com.example.bookbuddy.backend.domain.mapper.BookMapper;
import com.example.bookbuddy.backend.domain.model.Book;
import com.example.bookbuddy.backend.domain.repository.BookRepository;
import com.example.bookbuddy.backend.web.dto.BookDto;
import org.springframework.stereotype.Service;

@Service
public class BookService {

    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public BookDto createBook(BookDto bookDto) {
        Book newBook = BookMapper.INSTANCE.convertToBook(bookDto);
        this.bookRepository.save(newBook);
        return BookMapper.INSTANCE.convertToDto(newBook);
    }

    // ✅ use String (isbn) instead of Long
    public BookDto getBookByIsbn(String bookIsbn) {
        Book book = bookRepository.findById(bookIsbn)
                .orElseThrow(() -> new IllegalArgumentException("Book not found: " + bookIsbn));
        return BookMapper.INSTANCE.convertToDto(book);
    }
}
