import { Module } from '@nestjs/common';
import { ProductController } from '../../interfaces/controllers/product.controller';
import { GetProductsUseCase } from '../../application/use-cases/product/get-products.use-case';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { ProductRepositoryImpl } from '../../infrastructure/database/repositories/product.repository.impl';
import { PrismaService } from '../../infrastructure/database/prisma.service';

@Module({
  controllers: [ProductController],
  providers: [
    PrismaService,
    GetProductsUseCase,
    {
      provide: ProductRepository,
      useClass: ProductRepositoryImpl,
    },
  ],
})
export class ProductModule {}
