import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

export const ValidateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = z.object({
    name: z.string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    }),
    id: z.string({ required_error: 'Id is required' }),
    profilePic: z.string().nullish(),
  });

  const data = schema.safeParse(req.body);

  if (!data.success) {
    return res.status(400).json({ message: data.error });
  }

  next();
};
