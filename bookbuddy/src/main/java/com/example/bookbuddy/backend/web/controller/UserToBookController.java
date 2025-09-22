package com.example.bookbuddy.backend.web.controller;

import com.example.bookbuddy.backend.domain.model.Book;
import com.example.bookbuddy.backend.domain.model.UserToBook;
import com.example.bookbuddy.backend.domain.repository.BookRepository;
import com.example.bookbuddy.backend.domain.repository.UserToBookRepository;
import com.example.bookbuddy.backend.web.dto.BookDto;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.*;

/**
 * UserToBookController manages the association between users and books.
 *
 * Provides endpoints for:
 *  - Adding a book to the current logged-in user's library
 *
 * It ensures that the book exists in the main Book table
 * and then creates a mapping entry in the UserToBook table.
 */

@RestController
@RequestMapping("/books")
public class UserToBookController {

    private final BookRepository bookRepository;
    private final UserToBookRepository userToBookRepository;

    public UserToBookController(BookRepository bookRepository, UserToBookRepository userToBookRepository) {
        this.bookRepository = bookRepository;
        this.userToBookRepository = userToBookRepository;
    }

    /**
     * POST /books/add
     * Adds a book to the logged-in user’s personal library.
     *
     * Workflow:
     *  1. Verify that the user is logged in via session (must have userId).
     *  2. Ensure the book exists in the central Book table (insert if missing).
     *  3. Create a link in UserToBook to associate this user with the book.
     *
     * @param bookDto Book data (ISBN, title, author, etc.) sent in the request body
     * @param session The HTTP session to identify the current user
     * @return success or error message
     */

    @PostMapping("/add")
    public String addBook(@RequestBody BookDto bookDto, HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");
        if (userId == null) {
            //User must be logged in, otherwise won't add
            return "User not logged in";
        }

        // Ensure book exists in Book table if not adds it
        bookRepository.findByIsbn(bookDto.getIsbn())
                .orElseGet(() -> bookRepository.save(bookDto.toBook()));

        // Insert into user_to_book
        UserToBook link = new UserToBook(userId, bookDto.getIsbn());
        userToBookRepository.save(link);

        return "Book added for user " + userId;
    }
}
