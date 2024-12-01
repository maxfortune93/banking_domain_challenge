import { FinancialTransaction } from "@domain/entities/financial-transaction.entity";
import { FinancialTransactionRepository } from "@domain/repositories/financial-transaction.repository";
import { FinancialTransactionModelEntity } from "@infra/modules/financial-transaction/entities/financial-transaction-model.entity";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Op } from "sequelize";

@Injectable()
export class FinancialTransactionRepositoryImpl
  implements FinancialTransactionRepository {
  constructor(
    @InjectModel(FinancialTransactionModelEntity)
    private readonly repository: typeof FinancialTransactionModelEntity,
  ) {}

  async save(transaction: FinancialTransaction): Promise<void> {
    await this.repository.create({
      type: transaction.type,
      sourceAccountId: transaction.sourceAccountId,
      targetAccountId: transaction.targetAccountId,
      amount: transaction.amount,
      timestamp: transaction.timestamp,
      status: transaction.status,
    });
  }

  async findByAccountId(accountId: string): Promise<FinancialTransaction[]> {
    const transactions = await this.repository.findAll({
      where: {
        [Op.or]: [
          { sourceAccountId: accountId },
          { targetAccountId: accountId },
        ],
      },
    });

    return transactions.map(
      (t) =>
        new FinancialTransaction(
          {
          type: t.type,
          sourceAccountId: t.sourceAccountId,
          targetAccountId: t.targetAccountId,
          amount: t.amount,
          timestamp: t.timestamp,
          status: t.status,
          }
        ),
    );
  }
}
