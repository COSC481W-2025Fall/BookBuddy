package com.example.bookbuddy.backend.domain.mapper;


import com.example.bookbuddy.backend.domain.model.Book;
import com.example.bookbuddy.backend.web.dto.BookDto;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface BookMapper {

    // Create a singleton instance
    BookMapper INSTANCE = Mappers.getMapper(BookMapper.class);

    // Convert a Book to a DTO
    // DTO = Data Transfer Object.
    BookDto convertToDto(Book Book);

    // Convert a DTO to a Book
    Book convertToBook(BookDto BookDto);

}
