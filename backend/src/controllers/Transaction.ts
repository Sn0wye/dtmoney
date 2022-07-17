import { Request, Response } from 'express';
import { prisma } from '../data/prisma';

export class TransactionController {
  async createTransaction(req: Request, res: Response) {
    const rawTransaction = req.body;

    const transaction = await prisma.transaction.create({
      data: rawTransaction,
    });

    return res.status(201).json(transaction);
  }

  async getTransactions(req: Request, res: Response) {
    const { userId } = req.params;
    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
      },
    });

    return res.status(200).json(transactions);
  }
}
