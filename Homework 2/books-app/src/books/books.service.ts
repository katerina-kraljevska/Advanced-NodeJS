import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dtos/create-book.dto';
import { UpdateBookDto } from './dtos/update-book.dto';
import { join } from 'path';
import { v4 as uuid } from 'uuid';
import { BookFilters, Books } from './interfaces/books';
import { readFile, writeFile } from 'node:fs/promises';

@Injectable()
export class BooksService {
  private BOOKS_PATH = join(
    process.cwd(),
    'src',
    'books',
    'data',
    'books.json',
  );

  async getAllBooks(filters?: BookFilters) {
    const booksJSON = await readFile(this.BOOKS_PATH, 'utf-8');

    let books = JSON.parse(booksJSON) as Books[];

    if (filters?.title) {
      books = books.filter((book) =>
        book.title
          .toLowerCase()
          .includes(filters.title?.toLowerCase() as string),
      );
    }

    if (filters?.genre) {
      books = books.filter((book) =>
        book.genre
          .toLowerCase()
          .includes(filters.genre?.toLowerCase() as string),
      );
    }

    if (filters?.author) {
      books = books.filter((book) =>
        book.author
          .toLowerCase()
          .includes(filters.author?.toLowerCase() as string),
      );
    }
    if (filters?.isInStock !== null && filters?.isInStock !== undefined) {
      books = books.filter((book) => book.isInStock === filters.isInStock);
    }

    if (filters?.minPrice) {
      books = books.filter(
        (book) => book.price >= (filters.minPrice as number),
      );
    }

    if (filters?.maxPrice) {
      books = books.filter(
        (book) => book.price <= (filters.maxPrice as number),
      );
    }

    return books;
  }

  async saveBooks(books: Books[]) {
    await writeFile(this.BOOKS_PATH, JSON.stringify(books, null, 2), 'utf-8');
  }

  async getBookById(id: string) {
    const books = await this.getAllBooks();

    const foundBook = books.find((book) => book.id === id);

    if (!foundBook) throw new NotFoundException('book not fund');

    return foundBook;
  }

  async createBook(booksData: CreateBookDto) {
    const books = await this.getAllBooks();

    const newBook: Books = {
      ...booksData,
      id: uuid(),
    };

    books.push(newBook);

    await this.saveBooks(books);

    return newBook;
  }

  async updateBook(bookId: string, updateData: UpdateBookDto) {
    const books = await this.getAllBooks();

    const bookExists = books.some((book) => book.id === bookId);

    if (!bookExists) throw new NotFoundException("book doesn't exist");

    console.log(updateData);

    const updatedBooks = books.map((book) =>
      book.id === bookId ? { ...book, ...updateData } : book,
    );

    await this.saveBooks(updatedBooks);
  }

  async deleteBook(id: string) {
    const books = await this.getAllBooks();

    const updatedBooks = books.filter((book) => book.id !== id);

    if (books.length === updatedBooks.length)
      throw new NotFoundException('book not found');

    await this.saveBooks(updatedBooks);
  }
}
