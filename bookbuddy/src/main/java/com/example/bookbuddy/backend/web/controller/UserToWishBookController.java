package com.example.bookbuddy.backend.web.controller;

import com.example.bookbuddy.backend.domain.model.*;
import com.example.bookbuddy.backend.domain.repository.*;
import com.example.bookbuddy.backend.web.dto.BookDto;
import com.example.bookbuddy.backend.web.dto.WishBookDto;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/wishbooks")

public class UserToWishBookController {



        private final WishBookRepository wishbookRepository;
        private final UserToWishBookRepository userToWishBookRepository;
        private final AccountRepository accountRepository;

        public UserToWishBookController(WishBookRepository wishbookRepository,
                                    UserToWishBookRepository userToWishBookRepository,
                                    AccountRepository accountRepository) {
            this.wishbookRepository = wishbookRepository;
            this.userToWishBookRepository = userToWishBookRepository;
            this.accountRepository = accountRepository;
        }

        @PostMapping("/add")
        public ResponseEntity<?> addWishBook(@RequestBody WishBookDto wishbookDto, HttpSession session) {
            // Verify user is logged in and gets the signed in user's id'
            Long userId = (Long) session.getAttribute("userId");
            if (userId == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not logged in");
            }

            // Load the Account. finds user by id
            Account account = accountRepository.findById(userId)
                    .orElseThrow(() -> new IllegalArgumentException("User not found"));
            System.out.println(" Received ISBN: " + wishbookDto.getIsbn());
            System.out.println(" Description length: " +
                    (wishbookDto.getDescription() != null ? wishbookDto.getDescription().length() : 0));

            // Load or create the Book if not in database
            WishBook wishbook = wishbookRepository.findByIsbn(wishbookDto.getIsbn())
                    .orElseGet(() -> wishbookRepository.save(wishbookDto.toWishBook()));
            // Check if already exists in mapping

            if (userToWishBookRepository.existsByAccountAndWishBook(account, wishbook)) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body(" Book already exists in user's wishlist");
            }
            // Link the User + Book in the user_to_book table
            UserToWishBook link = new UserToWishBook(account, wishbook);
            userToWishBookRepository.save(link);

            return ResponseEntity.ok(
                    Map.of(
                            "message", "Book added for user " + account.getName(),
                            "bookname", wishbook.getBookname(),
                            "author", wishbook.getAuthor()
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
            List<UserToWishBook> userWishBooks = userToWishBookRepository.findByAccount(account);

            // Extract the Book objects
            List<WishBook> wishbooks = userWishBooks.stream()
                    .map(UserToWishBook::getWishBook)
                    .toList();

            return ResponseEntity.ok(wishbooks);
        }


}
