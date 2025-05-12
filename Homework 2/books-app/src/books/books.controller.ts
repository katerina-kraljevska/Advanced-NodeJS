import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { CreateBookDto } from './dtos/create-book.dto';
import { UpdateBookDto } from './dtos/update-book.dto';
import { BookFilters } from './interfaces/books';
import { BooksService } from './books.service';
import { Response } from 'express';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get()
  getAllBooks(
    @Query('title') title: string,
    @Query('genre') genre: string,
    @Query('author') author: string,
    @Query('isInStock') isInStock: string,
    @Query('minPrice') minPrice: number,
    @Query('maxPrice') maxPrice: number,
  ) {
    console.log(title, isInStock, author, minPrice, maxPrice, genre);

    const isInStockBoolean =
      isInStock === 'true' ? true : isInStock === 'false' ? false : undefined;

    const booksFilters: BookFilters = {
      title,
      genre,
      author,
      isInStock: isInStockBoolean,
      minPrice: !Number.isNaN(Number(minPrice)) ? Number(minPrice) : null,
      maxPrice: !Number.isNaN(Number(maxPrice)) ? Number(maxPrice) : null,
    };
    return this.booksService.getAllBooks(booksFilters);
  }

  @Get(':id')
  getBooksById(@Param('id') booksId: string) {
    return this.booksService.getBookById(booksId);
  }

  @Post()
  createBook(@Body() createData: CreateBookDto) {
    return this.booksService.createBook(createData);
  }

  @HttpCode(204)
  @Patch(':id')
  updateBook(@Param('id') id: string, @Body() updateData: UpdateBookDto) {
    return this.booksService.updateBook(id, updateData);
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: string, @Res() res: Response) {
    await this.booksService.deleteBook(id);

    res.sendStatus(204);
  }
}
