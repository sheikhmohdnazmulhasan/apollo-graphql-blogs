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

      // Check if the user already exists
      const user = await prisma.user.findUnique({
        where: { email: userData.email },
      });

      if (user) {
        throw new Error("User already exists");
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      // Create the user
      const newUser = await prisma.user.create({
        data: {
          ...userData,
          password: hashedPassword,
        },
      });

      // Check if the user was created
      if (!newUser) {
        throw new Error("User not created");
      }

      // Create the user profile after the user is created
      await prisma.profile.create({
        data: {
          ...profileData,
          userId: newUser.id,
        },
      });

      // Log the user creation
      logger.info(`User created: ${newUser.email}`);
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
