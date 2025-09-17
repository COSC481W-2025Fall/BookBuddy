package com.example.bookbuddy.backend.domain.repository;

import com.example.bookbuddy.backend.domain.model.Book;
import com.example.bookbuddy.backend.domain.model.Login;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoginRepository  extends JpaRepository<Login, Long> {
}
