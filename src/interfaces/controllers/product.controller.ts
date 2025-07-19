import { Controller, Get } from '@nestjs/common';
import { GetProductsUseCase } from '../../application/use-cases/product/get-products.use-case';
import { Product } from '../../domain/entities/product.entity';

@Controller('products')
export class ProductController {
  constructor(private readonly getProducts: GetProductsUseCase) {}

  @Get()
  async findAll(): Promise<Product[]> {
    return this.getProducts.execute();
  }
}
