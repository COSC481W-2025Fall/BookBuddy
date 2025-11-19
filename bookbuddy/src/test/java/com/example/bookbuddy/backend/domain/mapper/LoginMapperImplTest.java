package com.example.bookbuddy.backend.domain.mapper;

import com.example.bookbuddy.backend.domain.model.Login;
import com.example.bookbuddy.backend.web.dto.LoginDto;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class LoginMapperImplTest {
    //Test objects needed for the testing
    Login logintoDto = new Login("testName", "testPassword");
    LoginMapperImpl mapper = new LoginMapperImpl();
    LoginDto loginDto = new LoginDto();
    Login DtoToLogin = new Login();

    //Test to get a login database object from a login
    @Test
    void convertToDto() {
        loginDto = mapper.convertToDto(logintoDto);
        assertNotNull(loginDto);
    }

    //Test to get a login from the login database transfer object
    @Test
    void convertToLogin() {
        //login database transfer object is created again from the previous test
        loginDto = mapper.convertToDto(logintoDto);

        //new login object is used to ensure the variables are passed
        DtoToLogin = mapper.convertToLogin(loginDto);
        assertNotNull(DtoToLogin);

        assertEquals("testName", DtoToLogin.getName());
        assertEquals("testPassword", DtoToLogin.getPassword());
    }

    //Empty object used to test the null scenrio
    Login emptyLogin;
    LoginDto emptyLoginDto;

    //Both test should return null
    @Test
    void nullConvertToLoginDto() {
        emptyLoginDto = mapper.convertToDto(emptyLogin);
        assertNull(emptyLoginDto);
    }

    @Test
    void nullConvertToLogin() {
        emptyLogin = mapper.convertToLogin(emptyLoginDto);
        assertNull(emptyLogin);
    }

}