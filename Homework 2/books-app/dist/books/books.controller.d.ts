import { CreateBookDto } from './dtos/create-book.dto';
import { UpdateBookDto } from './dtos/update-book.dto';
import { BooksService } from './books.service';
import { Response } from 'express';
export declare class BooksController {
    private booksService;
    constructor(booksService: BooksService);
    getAllBooks(title: string, genre: string, author: string, isInStock: string, minPrice: number, maxPrice: number): Promise<import("./interfaces/books").Books[]>;
    getBooksById(booksId: string): Promise<import("./interfaces/books").Books>;
    createBook(createData: CreateBookDto): Promise<import("./interfaces/books").Books>;
    updateBook(id: string, updateData: UpdateBookDto): Promise<void>;
    deleteBook(id: string, res: Response): Promise<void>;
}
