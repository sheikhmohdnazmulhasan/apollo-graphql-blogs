import { IContext } from "../interfaces";

export const postResolvers = {
  addPost: async (parent: any, args: any, { prisma, authUser }: IContext) => {
    if (!authUser) {
      throw new Error("Unauthorized");
    }

    try {
      const newPost = await prisma.post.create({
        data: {
          ...args,
          authorId: authUser.userId,
        },
      });

      return {
        message: "Post created successfully",
        post: newPost,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
};
