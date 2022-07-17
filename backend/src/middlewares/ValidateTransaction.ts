import { NextFunction, Request, Response } from 'express';
import { transactionSchema } from '../schemas/Transaction';
import { userExists } from '../services/userExists';

export const ValidateTransaction = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = transactionSchema.parse(req.body);

    const user = userExists(data.userId);

    if (!user) {
      return res.status(400).json({ message: 'User does not exist' });
    }

    next();
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};
