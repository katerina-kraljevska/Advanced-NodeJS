import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productsRepo: Repository<Product>,
  ) {}

  async findAll() {
    return this.productsRepo.find();
  }

  async findById(id: number) {
    const foundProduct = await this.productsRepo.findOneBy({ id });

    if (!foundProduct) throw new NotFoundException('product not found');

    return foundProduct;
  }

  async create(createData: CreateProductDto) {
    return this.productsRepo.save(createData);
  }

  async updateProduct(id: number, updateData: UpdateProductDto) {
    const foundProduct = await this.findById(id);

    Object.assign(foundProduct, updateData);

    console.log(foundProduct);

    await this.productsRepo.save(foundProduct);
  }

  async remove(id: number) {
    const foundProduct = await this.findById(id);

    await this.productsRepo.remove(foundProduct);
  }
}
