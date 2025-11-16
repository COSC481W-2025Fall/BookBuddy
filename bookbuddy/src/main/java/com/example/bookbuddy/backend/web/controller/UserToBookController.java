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
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;


/**
 * Controller for managing the relationship between users and books.
 * - Ensures a user is logged in
 * - Adds the book to the `book` table if it doesn’t exist
 * - Creates a mapping entry in the `user_to_book` table
 * - Returns the book object if successful for the frontend to display
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
        System.out.println(" Received ISBN: " + bookDto.getIsbn());
        System.out.println(" Description length: " +
                (bookDto.getDescription() != null ? bookDto.getDescription().length() : 0));

        // Load or create the Book if not in database
        Book book = bookRepository.findByIsbn(bookDto.getIsbn())
                .orElseGet(() -> bookRepository.save(bookDto.toBook()));
        // Check if already exists in mapping

        if (userToBookRepository.existsByAccountAndBook(account, book)) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(" Book already exists in user's library");
        }
        // Link the User + Book in the user_to_book table
        UserToBook link = new UserToBook(account, book);
        userToBookRepository.save(link);

        return ResponseEntity.ok(
                Map.of(
                        "message", "Book added for user " + account.getName(),
                        "bookname", book.getBookname(),
                        "author", book.getAuthor()
                )
        );
    }

    /**
     * Retrieves all books from the current logged-in user's library.
     */
    @GetMapping("/my-library")
    public ResponseEntity<?> getMyLibrary(HttpSession session) {
        // Verify user is logged in
        Long userId = (Long) session.getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not logged in");
        }

        // Load the Account from the database
        Account account = accountRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        // Get all UserToBook mappings for this user
        List<UserToBook> userBooks = userToBookRepository.findByAccount(account);

        // Extract the Book objects
        List<Book> books = userBooks.stream()
                .map(UserToBook::getBook)
                .toList();

        return ResponseEntity.ok(books);
    }

    @Transactional
    @DeleteMapping("/remove/{isbn}")
    public ResponseEntity<?> removeBook(@PathVariable String isbn, HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not logged in");
        }

        // Load the Account
        Account account = accountRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        // Load the Book
        Book book = bookRepository.findByIsbn(isbn)
                .orElseThrow(() -> new IllegalArgumentException("Book not found"));

        // Perform the FK-based delete
        userToBookRepository.deleteByAccountAndBook(account, book);

        return ResponseEntity.ok("Book removed from library");
    }

}
