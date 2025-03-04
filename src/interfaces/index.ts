// Objective: Define interfaces for the application

import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

export interface IContext {
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;
}

// Interface for the user data
export interface INewUser {
  userData: {
    email: string;
    password: string;
  };
  profileData: {
    first_name: string;
    last_name: string;
    avatar?: string;
    bio?: string;
  };
}
