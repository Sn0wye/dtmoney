import { NextFunction, Request, Response } from 'express';
import { transactionSchema } from '../schemas/Transaction';
import { UserService } from '../services/user';

const userService = new UserService();

export class ValidateTransaction {
  async body(req: Request, res: Response, next: NextFunction) {
    try {
      const data = transactionSchema.parse(req.body);

      const user = userService.exists(data.userId);

      if (!user) {
        return res.status(400).json({ message: 'User does not exist' });
      }

      next();
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }

  async userExists(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.exists(req.params.userId);
      console.log(user);

      if (!user) {
        return res.status(400).json({ message: 'User does not exist' });
      }

      next();
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }
}
