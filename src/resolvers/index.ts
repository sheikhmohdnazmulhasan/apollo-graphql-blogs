import prisma from "../db/prisma";

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
      return await prisma.user.create({
        data: args,
      });
    },
  },
};
