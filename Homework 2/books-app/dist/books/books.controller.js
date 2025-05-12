"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksController = void 0;
const common_1 = require("@nestjs/common");
const create_book_dto_1 = require("./dtos/create-book.dto");
const update_book_dto_1 = require("./dtos/update-book.dto");
const books_service_1 = require("./books.service");
let BooksController = class BooksController {
    booksService;
    constructor(booksService) {
        this.booksService = booksService;
    }
    getAllBooks(title, genre, author, isInStock, minPrice, maxPrice) {
        console.log(title, isInStock, author, minPrice, maxPrice, genre);
        const isInStockBoolean = isInStock === 'true' ? true : isInStock === 'false' ? false : undefined;
        const booksFilters = {
            title,
            genre,
            author,
            isInStock: isInStockBoolean,
            minPrice: !Number.isNaN(Number(minPrice)) ? Number(minPrice) : null,
            maxPrice: !Number.isNaN(Number(maxPrice)) ? Number(maxPrice) : null,
        };
        return this.booksService.getAllBooks(booksFilters);
    }
    getBooksById(booksId) {
        return this.booksService.getBookById(booksId);
    }
    createBook(createData) {
        return this.booksService.createBook(createData);
    }
    updateBook(id, updateData) {
        return this.booksService.updateBook(id, updateData);
    }
    async deleteBook(id, res) {
        await this.booksService.deleteBook(id);
        res.sendStatus(204);
    }
};
exports.BooksController = BooksController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('title')),
    __param(1, (0, common_1.Query)('genre')),
    __param(2, (0, common_1.Query)('author')),
    __param(3, (0, common_1.Query)('isInStock')),
    __param(4, (0, common_1.Query)('minPrice')),
    __param(5, (0, common_1.Query)('maxPrice')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, Number, Number]),
    __metadata("design:returntype", void 0)
], BooksController.prototype, "getAllBooks", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BooksController.prototype, "getBooksById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_book_dto_1.CreateBookDto]),
    __metadata("design:returntype", void 0)
], BooksController.prototype, "createBook", null);
__decorate([
    (0, common_1.HttpCode)(204),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_book_dto_1.UpdateBookDto]),
    __metadata("design:returntype", void 0)
], BooksController.prototype, "updateBook", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "deleteBook", null);
exports.BooksController = BooksController = __decorate([
    (0, common_1.Controller)('books'),
    __metadata("design:paramtypes", [books_service_1.BooksService])
], BooksController);
//# sourceMappingURL=books.controller.js.map