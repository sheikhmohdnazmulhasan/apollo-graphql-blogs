import prisma from "../db/prisma";
import bcrypt from "bcryptjs";
import { signToken } from "../utils/sign-token";

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
      const newUser = await prisma.user.create({
        data: {
          password: hashedPassword,
          ...args,
        },
      });

      if (!newUser) {
        throw new Error("User not created");
      }

      return {
        message: "User created successfully",
        token: signToken({ userId: newUser.id }),
      };
    },
  },
};
