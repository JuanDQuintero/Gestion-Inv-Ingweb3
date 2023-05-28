import { gql } from 'graphql-tag';


const typeDefs = gql`

  scalar DateTime

  type User {
    id: ID
    name: String
    email: String
    picture: String
    materials: [Material]
    movements: [Movement]
  }

  type Material {
    id: ID
    name: String
    createdAt: DateTime
    price: Float
  }

  type Movement {
    id: ID
    name: String
    dateMove : DateTime
    quantityIn: Int
    quantityOut: Int
  }

  type Query {
    users: [User]
    user(email: String!): User
  }

  type Mutation {
    createUser(name: String!, email: String!, password: String!): User
  }
`;

export { typeDefs };
