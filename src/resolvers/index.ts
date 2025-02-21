import prisma from "../db/prisma";
import bcrypt from "bcryptjs";

export const resolvers = {
  // This is the Query resolver
  Query: {
    users: async (parent: any, args: any, context: any, info: any) => {
      return await prisma.user.findMany();
    },
  },

  // This is the Mutation resolver
  Mutation: {
    // This is the resolver for the createUser mutation
    createUser: async (parent: any, args: any, context: any, info: any) => {
      const hashedPassword = await bcrypt.hash(args.password, 10);

      return await prisma.user.create({
        data: {
          password: hashedPassword,
          ...args,
        },
      });
    },
  },
};
