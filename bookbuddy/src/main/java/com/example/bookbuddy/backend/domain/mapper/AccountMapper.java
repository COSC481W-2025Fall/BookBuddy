package com.example.bookbuddy.backend.domain.mapper;

import com.example.bookbuddy.backend.domain.model.Account;
import com.example.bookbuddy.backend.web.dto.AccountDto;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface AccountMapper {

    // Create a singleton instance
    AccountMapper INSTANCE = Mappers.getMapper(AccountMapper.class);

    // Convert a Account to a DTO
    // DTO = Data Transfer Object.
    AccountDto convertToDto(Account Account);

    // Convert a DTO to a Account
    Account convertToAccount(AccountDto AccountDto);

}
