import { Router } from 'express';

export const indexRouter = Router();

indexRouter.get('/ping', (req, res) => {
  res.status(200).json({ message: 'pong' });
});

// 404 Route
indexRouter.use((req, res) => {
  const error = new Error('Route not found');
  console.log(error);

  res.status(404).send({ message: error.message });
});
