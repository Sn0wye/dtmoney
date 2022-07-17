import { NextFunction, Request, Response } from 'express';
import { userSchema } from '../schemas/User';

export const ValidateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = userSchema.safeParse(req.body);

  if (!data.success) {
    return res.status(400).json({ message: data.error });
  }

  next();
};
