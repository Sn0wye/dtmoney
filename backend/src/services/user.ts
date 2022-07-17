import { prisma } from '../data/prisma';

export class UserService {
  public async exists(userId: string) {
    return !!(await this.getUserById(userId));
  }

  public async getUserById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }
}
