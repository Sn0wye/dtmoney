import { Router } from 'express';
import { TransactionController } from '../controllers/Transaction';
import { ValidateTransaction } from '../middlewares/ValidateTransaction';

const transactionController = new TransactionController();
const validateTransaction = new ValidateTransaction();

export const transactionRouter = Router();

transactionRouter.post(
  '/create',
  validateTransaction.body,
  transactionController.createTransaction
);
transactionRouter.get(
  '/:userId',
  validateTransaction.userExists,
  transactionController.getTransactions
);
