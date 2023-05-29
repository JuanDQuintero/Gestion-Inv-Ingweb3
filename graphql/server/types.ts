import { gql } from 'graphql-tag';


const typeDefs = gql`

  scalar DateTime

  type Role {
    id: ID
    name: String
    users: [User]
  }


  type User {
    id: ID
    name: String
    email: String
    image: String
    role: Role
    createdAt: DateTime
    materials: [Material]
    movements: [Movement]
  }

  type Session {
    id: ID
    sessionToken: String
    userId: String
    user: User
  }

  type Material {
    id: ID
    name: String
    createdAt: DateTime
    price: Int
    createdBy: User
    movements: [Movement]
  }

  type Movement {
    id: ID
    dateMov: DateTime
    quantityIn: Int
    quantityOut: Int
    type: String
    material: Material
    performedBy: User
  }

  type Query {
    users: [User]
    user(email: String!): User
    material(id: String!): Material
    sessions: [Session]
    materials: [Material]
    movements: [Movement]
  }

  type Mutation {
    createUser(name: String!, email: String!): User
    createMaterial(name: String!, price: Float!, createdAt: DateTime!): Material
    createMovement(dateMov: DateTime!, quantityIn: Int!, quantityOut: Int!, type: String!, material: String!): Movement
  }
`;

export { typeDefs };
