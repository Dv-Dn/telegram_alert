import { User as PrismaUser } from '@prisma/client';

import { User } from 'grammy/out/platform.node';
import { prisma } from '../prisma';

export class UserService {
  static async createUser(user: User) {
    await prisma.user.create({
      data: {
        id: user?.id,
        first_name: user?.first_name || '',
        last_name: user?.last_name || '',
        username: user?.username || '',
      },
    });
  }

  static async getOrCreateUser(user: Partial<User>) {
    const person = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });
    if (person) {
      return person;
    }

    return await prisma.user.create({
      data: {
        id: user?.id,
        first_name: user?.first_name || '',
        last_name: user?.last_name || '',
        username: user?.username || '',
      },
    });
  }

  static async updateUser(id: number, data: Partial<PrismaUser>) {
    try {
      return await prisma.user.update({ where: { id }, data });
    } catch (error) {
      return;
    }
  }
}
