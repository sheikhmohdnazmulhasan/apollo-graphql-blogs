import prisma from "../db/prisma";

export const Query = {
  users: async (parent: any, args: any, context: any, info: any) => {
    return await prisma.user.findMany();
  },
};
