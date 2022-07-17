import { prisma } from '../data/prisma';

export const userExists = async (userId: string) => {
  const userExists = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  return !!userExists;
};
