import { IContext } from "../interfaces";

export const Query = {
  users: async (parent: any, args: any, { prisma }: IContext, info: any) => {
    return await prisma.user.findMany();
  },
};
