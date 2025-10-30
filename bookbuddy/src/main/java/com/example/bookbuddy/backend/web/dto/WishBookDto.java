package com.example.bookbuddy.backend.web.dto;


import com.example.bookbuddy.backend.domain.model.WishBook;

public class WishBookDto {


        private String isbn;
        private String bookname;
        private String author;
        private String genre;
        private String coverid;
        private String publication;
        private int pagecount;
        private String description;

        public WishBookDto() {}

        public WishBookDto(String isbn, String bookname, String author, String genre, String coverid, String description, int pagecount, String publication) {
            this.isbn = isbn;
            this.bookname = bookname;
            this.author = author;
            this.genre = genre;
            this.coverid = coverid;
            this.description = description;
            this.pagecount = pagecount;
            this.publication = publication;
        }

        public String getIsbn() {
            return isbn;
        }

        public String getCoverid() {return coverid;}
        public void setCoverid(String coverid) {this.coverid = coverid;}

        public String getPublication() {return publication;}
        public void setPublication(String publication) {this.publication = publication;}

        public int getPagecount() {return pagecount;}
        public void setPagecount(int pagecount) {this.pagecount = pagecount;}

        public String getDescription() {return description;}
        public void setDescription(String description) {this.description = description;}

        public void setIsbn(String isbn) {
            this.isbn = isbn;
        }

        public String getBookname() {
            return bookname;
        }

        public void setBookname(String bookname) {
            this.bookname = bookname;
        }

        public String getAuthor() {
            return author;
        }

        public void setAuthor(String author) {
            this.author = author;
        }

        public String getGenre() {
            return genre;
        }

        public void setGenre(String genre) {
            this.genre = genre;
        }

        /**
         * Convert this DTO into a Book entity.
         * This is used in controllers when saving to the database.
         */
        public WishBook toWishBook() {
//        String safeDescription = description;
//        if (safeDescription != null && safeDescription.length() > 255) {
//            safeDescription = safeDescription.substring(0, 255);
//        }
            return new WishBook(isbn,  bookname,  author,  genre,  coverid,  description,  pagecount,  publication);
        }

    }
