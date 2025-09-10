package com.example.bookbuddy.backend.infrastructure.config;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

//Tells HTTP request to return code 500 if exception thrown in execution of request, will print error message in HTTP response
@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception ex){
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)		//Return error code = 500 if exception thrown in back-end code
                .body("An unexpected error has occured. Message: " + ex.getMessage());		//Print error message in HTTP response
    }
}