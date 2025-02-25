import prisma from "../db/prisma";
import bcrypt from "bcryptjs";
import { signToken } from "../utils/sign-token";
import logger from "../utils/logger";
import { INewUser } from "../interfaces";

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
    createUser: async (parent: any, args: INewUser, context: any) => {
      const { userData, profileData } = args;

      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const newUser = await prisma.user.create({
        data: {
          ...userData,
          password: hashedPassword,
        },
      });

      if (!newUser) {
        throw new Error("User not created");
      }

      console.log({ newUser });

      return {
        message: "User created successfully",
        token: signToken({ userId: newUser.id }),
      };
    },

    // This is the resolver for the loginUser mutation
    loginUser: async (parent: any, args: any, context: any, info: any) => {
      const user = await prisma.user.findUnique({
        where: { email: args.email },
      });

      if (!user) {
        throw new Error("User not found");
      }

      const isValid = await bcrypt.compare(args.password, user.password);

      if (!isValid) {
        throw new Error("Invalid password");
      }

      return {
        message: "User logged in successfully",
        token: signToken({ userId: user.id }),
      };
    },
  },
};
