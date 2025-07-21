import { Transaction } from '../entities/transaction.entity';

export abstract class TransactionRepository {
  abstract createPending(productId: number): Promise<Transaction>;
  abstract updateStatus(transactionId: number, status: string): Promise<void>;
}
