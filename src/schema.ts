export const typeDefs = `#graphql

  # This is the Query type
  type Query {
    user: User
    users: [User]
    posts: [Post]
  }

  type Mutation {
    # This is the mutation to create a new user
    createUser(
      userData: UserInput!
      profileData: ProfileInput!
    ): AuthPayload

    # This is the mutation to login a user
    loginUser(
      email: String!
      password: String!
    ): AuthPayload
  }

  # This is the UserInput type
  input UserInput {
    email: String!
    password: String!
  }

  # This is the ProfileInput type
  input ProfileInput {
    first_name: String!
    last_name: String!
    avatar: String
    bio: String
  }

  # This is the AuthPayload type
  type AuthPayload {
    message: String!
    token: String!
  }

  # This is the Post type
  type Post {
    id: ID!
    title: String!
    content: String!
    author: User!
    is_published: Boolean!
    created_at: String!
  }

  # This is the User type
  type User {
    id: ID!
    email: String!
    created_at: String!
    posts: [Post]
  }

  # This is the Profile type
  type Profile {
    id: ID!
    first_name: String!
    last_name: String!
    avatar: String
    bio: String
    user: User!
  }
`;
