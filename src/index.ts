import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import logger from "./utils/logger";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import prisma from "./db/prisma";
import { IContext } from "./interfaces";
import { getAuthUserInfo } from "./utils/jwt";

(async function () {
  try {
    logger.info("Starting the Apollo Server...");

    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });

    // Start the server
    // The server will listen on port 4000
    // The context function will return the Prisma client
    // to the context of the Apollo Server
    const { url } = await startStandaloneServer(server, {
      listen: { port: 4000 },
      context: async ({ req }): Promise<IContext> => {
        const authUser = await getAuthUserInfo(req.headers.authorization);
        return {
          prisma,
          authUser,
        };
      },
    });

    logger.info(`🚀 Server is running at: ${url}`);
  } catch (error) {
    logger.error(`❌ Error starting server: ${error}`);
  }
})();
