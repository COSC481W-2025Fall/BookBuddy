package com.example.bookbuddy.backend.domain.mapper;

import com.example.bookbuddy.backend.domain.model.WishBook;
import com.example.bookbuddy.backend.web.dto.WishBookDto;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class WishWishBookMapperImplTest {
    //Test objects needed for the testing
    WishBook WishBook =  new WishBook("testIBSN", "testName", "testAuthor", "testGenre", "", "", 0, "");
    WishBookMapperImpl mapper = new WishBookMapperImpl();
    WishBookDto WishBookDto = new WishBookDto();
    WishBook DtoToWishBook = new WishBook();

    //Test to get a WishBook database transfer object from a WishBook
    @Test
    void convertToDto() {
        WishBookDto = mapper.convertToDto(WishBook);
        assertNotNull(WishBookDto);
    }

    //Test to get a WishBook from the WishBook database object
    @Test
    void convertToWishBook() {
        //WishBook database transfer object is created again from the previous test
        WishBookDto = mapper.convertToDto(WishBook);

        //new WishBook object is used to ensure the variables are passed
        DtoToWishBook =  mapper.convertToWishBook(WishBookDto);
        assertNotNull(DtoToWishBook);
        assertEquals("testIBSN",  DtoToWishBook.getIsbn());
        assertEquals("testName", DtoToWishBook.getBookname());
        assertEquals("testAuthor", DtoToWishBook.getAuthor());
        assertEquals("testGenre", DtoToWishBook.getGenre());
    }

    //Empty object used to test the null scenrio
    WishBook emptyWishBook;
    WishBookDto emptyWishBookDto;

    //Both test should return null
    @Test
    void nullConvertToDto() {
        emptyWishBookDto = mapper.convertToDto(emptyWishBook);
        assertNull(emptyWishBookDto);
    }

    @Test
    void nullConvertToWishBook() {
        emptyWishBook =  mapper.convertToWishBook(emptyWishBookDto);
        assertNull(emptyWishBook);
    }
}