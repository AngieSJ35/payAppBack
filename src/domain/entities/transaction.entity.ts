export class Transaction {
  constructor(
    public readonly id: number,
    public readonly productId: number,
    public readonly status: string,
    public readonly createdAt: Date,
  ) {}
}
