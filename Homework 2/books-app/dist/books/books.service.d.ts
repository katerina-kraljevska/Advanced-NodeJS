import { CreateBookDto } from './dtos/create-book.dto';
import { UpdateBookDto } from './dtos/update-book.dto';
import { BookFilters, Books } from './interfaces/books';
export declare class BooksService {
    private BOOKS_PATH;
    getAllBooks(filters?: BookFilters): Promise<Books[]>;
    saveBooks(books: Books[]): Promise<void>;
    getBookById(id: string): Promise<Books>;
    createBook(booksData: CreateBookDto): Promise<Books>;
    updateBook(bookId: string, updateData: UpdateBookDto): Promise<void>;
    deleteBook(id: string): Promise<void>;
}
