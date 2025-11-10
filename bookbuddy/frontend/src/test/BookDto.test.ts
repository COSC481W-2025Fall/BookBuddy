import { assertType, expectTypeOf } from 'vitest'
import type { BookDto } from "../types/BookDto";

test('BookDto.ts type works properly', () => {
    //test BookDto object
    const bookDto: BookDto = {
        author: 'testAuthor',
        genre: 'testGenre',
        isbn: 'testIsbn',
        image: 'testImage',
        description: 'testDescription',
        pagecount: 0,
        publication: 'testPublication',
        coverid: 'testCoverId',
    }

    //testing properties
    expect(bookDto).toHaveProperty('author');
    expect(bookDto).toHaveProperty('genre');
    expect(bookDto).toHaveProperty('isbn');
    expect(bookDto).toHaveProperty('image');
    expect(bookDto).toHaveProperty('description');
    expect(bookDto).toHaveProperty('pagecount');
    expect(bookDto).toHaveProperty('publication');
    expect(bookDto).toHaveProperty('coverid');

    //testing types
    expect(typeof bookDto.author).toBe('string');
    expect(typeof bookDto.genre).toBe('string');
    expect(typeof bookDto.isbn).toBe('string');
    expect(typeof bookDto.image).toBe('string');
    expect(typeof bookDto.description).toBe('string');
    expect(typeof bookDto.pagecount).toBe('number');
    expect(typeof bookDto.publication).toBe('string');
    expect(typeof bookDto.coverid).toBe('string');
});
