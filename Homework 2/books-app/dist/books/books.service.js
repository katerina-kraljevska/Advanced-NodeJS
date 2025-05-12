"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksService = void 0;
const common_1 = require("@nestjs/common");
const path_1 = require("path");
const uuid_1 = require("uuid");
const promises_1 = require("node:fs/promises");
let BooksService = class BooksService {
    BOOKS_PATH = (0, path_1.join)(process.cwd(), 'src', 'books', 'data', 'books.json');
    async getAllBooks(filters) {
        const booksJSON = await (0, promises_1.readFile)(this.BOOKS_PATH, 'utf-8');
        let books = JSON.parse(booksJSON);
        if (filters?.title) {
            books = books.filter((book) => book.title
                .toLowerCase()
                .includes(filters.title?.toLowerCase()));
        }
        if (filters?.genre) {
            books = books.filter((book) => book.genre
                .toLowerCase()
                .includes(filters.genre?.toLowerCase()));
        }
        if (filters?.author) {
            books = books.filter((book) => book.author
                .toLowerCase()
                .includes(filters.author?.toLowerCase()));
        }
        if (filters?.isInStock !== null && filters?.isInStock !== undefined) {
            books = books.filter((book) => book.isInStock === filters.isInStock);
        }
        if (filters?.minPrice) {
            books = books.filter((book) => book.price >= filters.minPrice);
        }
        if (filters?.maxPrice) {
            books = books.filter((book) => book.price <= filters.maxPrice);
        }
        return books;
    }
    async saveBooks(books) {
        await (0, promises_1.writeFile)(this.BOOKS_PATH, JSON.stringify(books, null, 2), 'utf-8');
    }
    async getBookById(id) {
        const books = await this.getAllBooks();
        const foundBook = books.find((book) => book.id === id);
        if (!foundBook)
            throw new common_1.NotFoundException('book not fund');
        return foundBook;
    }
    async createBook(booksData) {
        const books = await this.getAllBooks();
        const newBook = {
            ...booksData,
            id: (0, uuid_1.v4)(),
        };
        books.push(newBook);
        await this.saveBooks(books);
        return newBook;
    }
    async updateBook(bookId, updateData) {
        const books = await this.getAllBooks();
        const bookExists = books.some((book) => book.id === bookId);
        if (!bookExists)
            throw new common_1.NotFoundException("book doesn't exist");
        console.log(updateData);
        const updatedBooks = books.map((book) => book.id === bookId ? { ...book, ...updateData } : book);
        await this.saveBooks(updatedBooks);
    }
    async deleteBook(id) {
        const books = await this.getAllBooks();
        const updatedBooks = books.filter((book) => book.id !== id);
        if (books.length === updatedBooks.length)
            throw new common_1.NotFoundException('book not found');
        await this.saveBooks(updatedBooks);
    }
};
exports.BooksService = BooksService;
exports.BooksService = BooksService = __decorate([
    (0, common_1.Injectable)()
], BooksService);
//# sourceMappingURL=books.service.js.map