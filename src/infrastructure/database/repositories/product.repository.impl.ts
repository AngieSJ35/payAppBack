import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../../domain/repositories/product.repository';
import { Product } from '../../../domain/entities/product.entity';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ProductRepositoryImpl implements ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Product[]> {
    const products = await this.prisma.product.findMany();
    return products.map(
      (p) => new Product(p.id, p.name, p.description, p.price, p.stock),
    );
  }
  async findById(id: number): Promise<Product | null> {
    const p = await this.prisma.product.findUnique({ where: { id } });
    if (!p) return null;

    return new Product(p.id, p.name, p.description, p.price, p.stock);
  }
  async updateStock(id: number, newStock: number): Promise<void> {
    await this.prisma.product.update({
      where: { id },
      data: { stock: newStock },
    });
  }
}
