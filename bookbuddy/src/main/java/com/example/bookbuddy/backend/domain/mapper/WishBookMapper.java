package com.example.bookbuddy.backend.domain.mapper;

import com.example.bookbuddy.backend.domain.model.Book;
import com.example.bookbuddy.backend.domain.model.WishBook;
import com.example.bookbuddy.backend.web.dto.BookDto;
import com.example.bookbuddy.backend.web.dto.WishBookDto;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;


@Mapper
public interface WishBookMapper {

        // Create a singleton instance
        com.example.bookbuddy.backend.domain.mapper.WishBookMapper INSTANCE = Mappers.getMapper(com.example.bookbuddy.backend.domain.mapper.WishBookMapper.class);

        // Convert a Book to a DTO
        // DTO = Data Transfer Object.
        WishBookDto convertToDto(WishBook WishBook);

        // Convert a DTO to a Book
        WishBook convertToWishBook(WishBookDto WishBookDto);



}
