import { assertType, expectTypeOf } from 'vitest'
import type { BookDto } from "../types/BookDto";

test('BookDto.ts type works properly', () => {
    //test BookDto object
    const bookDto: BookDto = {
        author: 'testAuthor',
        genre: 'testGenre',
        isbn: 'testIsbn',
    }

    //testing properties
    expect(bookDto).toHaveProperty('author');
    expect(bookDto).toHaveProperty('genre');
    expect(bookDto).toHaveProperty('isbn');

    //testing types
    expect(typeof bookDto.author).toBe('string');
    expect(typeof bookDto.genre).toBe('string');
    expect(typeof bookDto.isbn).toBe('string');
});
