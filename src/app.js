const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");

const { port } = require("./config");
const middleware = require("./utils/middleware");
const { schema } = require("./graphql/schema");
const { resolvers } = require("./graphql/resolvers");

const app = express();

app.use(cors());

// parse requests of content-type: application/json
app.use(express.json());
// extract the token
app.use(middleware.tokenExtractor);

// health check
app.use("/health", (_req, res) => {
  res.send("ok");
});

app.use("/", graphqlHTTP({
  schema,
  rootValue: resolvers,
  graphiql: true
}));

// unknown endpoint
app.use(middleware.unknownEndpoint);
// error handler
app.use(middleware.errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});