import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { TransactionRepository } from '../../../domain/repositories/transaction.repository';
import { Transaction } from '../../../domain/entities/transaction.entity';

@Injectable()
export class TransactionRepositoryImpl implements TransactionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createPending(productId: number): Promise<Transaction> {
    const tx = await this.prisma.transaction.create({
      data: {
        productId,
        status: 'PENDING',
      },
    });
    return new Transaction(tx.id, tx.productId, tx.status, tx.createdAt);
  }

  async updateStatus(id: number, status: string): Promise<void> {
    await this.prisma.transaction.update({
      where: { id },
      data: { status },
    });
  }
}
