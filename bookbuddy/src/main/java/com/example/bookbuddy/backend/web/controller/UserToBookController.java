package com.example.bookbuddy.backend.web.controller;

import com.example.bookbuddy.backend.domain.model.Account;
import com.example.bookbuddy.backend.domain.model.Book;
import com.example.bookbuddy.backend.domain.model.UserToBook;
import com.example.bookbuddy.backend.domain.repository.AccountRepository;
import com.example.bookbuddy.backend.domain.repository.BookRepository;
import com.example.bookbuddy.backend.domain.repository.UserToBookRepository;
import com.example.bookbuddy.backend.web.dto.BookDto;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Controller for managing the relationship between users and books.
 * - Ensures a user is logged in
 * - Adds the book to the `book` table if it doesn’t exist
 * - Creates a mapping entry in the `user_to_book` table
 * - Tells the repository what entry to actually save
 */
@RestController
@RequestMapping("/books")
public class UserToBookController {

    private final BookRepository bookRepository;
    private final UserToBookRepository userToBookRepository;
    private final AccountRepository accountRepository;

    public UserToBookController(BookRepository bookRepository,
                                UserToBookRepository userToBookRepository,
                                AccountRepository accountRepository) {
        this.bookRepository = bookRepository;
        this.userToBookRepository = userToBookRepository;
        this.accountRepository = accountRepository;
    }

    @PostMapping("/add")
    public ResponseEntity<?> addBook(@RequestBody BookDto bookDto, HttpSession session) {
        // Verify user is logged in and gets the signed in user's id'
        Long userId = (Long) session.getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not logged in");
        }

        // Load the Account. finds user by id
        Account account = accountRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        // Load or create the Book if not in database
        Book book = bookRepository.findByIsbn(bookDto.getIsbn())
                .orElseGet(() -> bookRepository.save(bookDto.toBook()));

        // Link the User + Book in the user_to_book table
        UserToBook link = new UserToBook(account, book);
        userToBookRepository.save(link);

        return ResponseEntity.ok("Book added for user " + account.getName());
    }
}
