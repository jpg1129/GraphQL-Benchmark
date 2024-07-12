const { ApolloServer } = require('apollo-server');
const { typeDefs, resolvers } = require('./schema');
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require('apollo-server-core');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  context: () => {
    return {
      albums_by_user_id: { user: { id: 1, roles: ['user'] } },
    };
  },
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground({ embed: true })],
});

server.listen(4000, '0.0.0.0').then(({ url }) => {
  console.log(`🚀  Servers ready at ${url}`);
});
