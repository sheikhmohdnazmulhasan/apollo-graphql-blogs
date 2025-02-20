export const resolvers = {
  // This is the Query resolver
  Query: {},

  // This is the Mutation resolver
  Mutation: {
    // This is the resolver for the createUser mutation
    createUser: function (parent: any, args: any, context: any, info: any) {
      console.log(args);
    },
  },
};
