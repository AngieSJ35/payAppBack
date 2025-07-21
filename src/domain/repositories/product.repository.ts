import { Product } from '../entities/product.entity';

export abstract class ProductRepository {
  abstract findAll(): Promise<Product[]>;
  abstract findById(id: number): Promise<Product | null>;
  abstract updateStock(id: number, newStock: number): Promise<void>;
}
