package com.example.bookbuddy.backend.domain.mapper;


import com.example.bookbuddy.backend.domain.model.Login;
import com.example.bookbuddy.backend.web.dto.LoginDto;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper

public interface LoginMapper {
    // Create a singleton instance
    LoginMapper INSTANCE = Mappers.getMapper(LoginMapper.class);

    // Convert a Account to a DTO
    // DTO = Data Transfer Object.
    LoginDto convertToDto(Login Login);

    // Convert a DTO to a Account
    Login convertToLogin(LoginDto LoginDto);
}
