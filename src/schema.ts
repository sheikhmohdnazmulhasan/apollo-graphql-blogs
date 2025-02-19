export const typeDefs = `#graphql

type Query {
    user: User
    posts: [Post]
}

  type Post {
    id: ID!
    title: String!
    content: String!
    author: User!
    is_published: Boolean!
    created_at: String!
  }

  type User {
    id: ID!
    email: String!
    created_at: String!
    posts: [Post]
  }

  type Profile {
    id: ID!
    first_name: String!
    last_name: String!
    avatar: String
    bio: String
    user: User
  }
`;
