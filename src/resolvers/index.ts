export const resolvers = {
  // This is the Query resolver
  Query: {},

  // This is the Mutation resolver
  Mutation: {
    // This is the resolver for the createUser mutation
    createUser: async (parent: any, args: any, context: any, info: any) => {
      return await context.prisma.user.create({
        data: args,
      });
    },
  },
};
