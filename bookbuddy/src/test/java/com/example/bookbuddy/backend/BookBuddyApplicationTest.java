package com.example.bookbuddy.backend;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class BookBuddyApplicationTest {
    //Test for the main function call for springboot
    @Test
    void mainTest() {
        try {
            String[] args = new String[0];
            BookBuddyApplication.main(args);
        } catch (Exception e){
            //if any exception happens during this test run, the "fail" will fail the test
            fail("Exception thrown up to main was caught");
        }
    }
}