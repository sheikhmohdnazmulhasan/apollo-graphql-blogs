import { IContext, INewUser } from "../interfaces";
import bcrypt from "bcryptjs";
import logger from "../utils/logger";
import { signToken } from "../utils/jwt";
import { postResolvers } from "./post";

export const Mutation = {
  // This is the resolver for the createUser mutation
  createUser: async (parent: any, args: INewUser, { prisma }: IContext) => {
    const { userData, profileData } = args;

    // Check if the user already exists
    const user = await prisma.user.findUnique({
      where: { email: userData.email },
    });

    if (user) {
      throw new Error("User already exists");
    }

    // Create the user and profile try block
    try {
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
    } catch (error) {
      logger.error(`❌ Error creating user: ${error}`);
      throw new Error("Error creating user");
    }
  },

  // This is the resolver for the loginUser mutation
  loginUser: async (
    parent: any,
    args: any,
    { prisma }: IContext,
    info: any
  ) => {
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

  ...postResolvers,
};
