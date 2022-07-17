import { Request, Response } from 'express';
import { prisma } from '../data/prisma';

export class UserController {
  async createUser(req: Request, res: Response) {
    const { name, id, profilePic } = req.body;

    const user = await prisma.user.create({
      data: {
        id,
        name,
        profilePic,
      },
    });

    return res.status(200).json({ user });
  }

  async getById(req: Request, res: Response) {
    const userId = req.params.userId;
    const user = await prisma.user.findUniqueOrThrow({ where: { id: userId } });

    return res.status(200).json(user);
  }

  async getAll(req: Request, res: Response) {
    const users = await prisma.user.findMany();

    return res.status(200).json(users);
  }
}
