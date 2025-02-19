import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import logger from "./utils/logger";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";

(async function () {
  try {
    logger.info("Starting the Apollo Server...");

    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });

    const { url } = await startStandaloneServer(server, {
      listen: { port: 4000 },
    });

    logger.info(`🚀 Server is running at: ${url}`);
  } catch (error) {
    logger.error(`❌ Error starting server: ${error}`);
  }
})();
