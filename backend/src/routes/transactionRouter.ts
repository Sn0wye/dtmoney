import { Router } from 'express';
import { TransactionController } from '../controllers/Transaction';
import { ValidateTransaction } from '../middlewares/ValidateTransaction';

const transactionController = new TransactionController();

export const transactionRouter = Router();

transactionRouter.get('/', transactionController.getTransactions);
transactionRouter.post(
  '/create',
  ValidateTransaction,
  transactionController.createTransaction
);
