import { Router } from 'express';
import { transactionRouter } from './transactionRouter';
import { userRouter } from './userRouter';

export const indexRouter = Router();

indexRouter.get('/ping', (req, res) => {
  res.status(200).json({ message: 'pong' });
});

indexRouter.use('/users', userRouter);
indexRouter.use('/transactions', transactionRouter);

// 404 Route
indexRouter.use((req, res) => {
  const error = new Error('Route not found');
  console.log(error);

  res.status(404).send({ message: error.message });
});
