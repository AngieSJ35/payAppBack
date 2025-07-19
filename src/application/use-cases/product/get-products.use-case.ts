import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../../domain/repositories/product.repository';
import { Product } from '../../../domain/entities/product.entity';

@Injectable()
export class GetProductsUseCase {
  constructor(private readonly productRepo: ProductRepository) {}

  async execute(): Promise<Product[]> {
    return await this.productRepo.findAll();
  }
}
