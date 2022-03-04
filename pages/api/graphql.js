import Cors from "micro-cors";
import { ApolloServer } from "apollo-server-micro";
import typeDefs from "../../db/schema";
import resolvers from "../../db/resolvers";
import connectDb from "../../db/config";

connectDb();

export const config = {
  api: {
    bodyParser: false,
  },
};

const cors = Cors();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
});

const startServer = server.start();

export default cors(async (req, res) => {
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }

  await startServer;
  await server.createHandler({ path: "/api/graphql" })(req, res);
  return true;
});
