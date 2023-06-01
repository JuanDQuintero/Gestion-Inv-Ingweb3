import { gql } from '@apollo/client';

const GET_USERS = gql`
query Users {
  users {
    id
    createdAt
    email
    role {
      name
    }
  }
}
`;

const GET_USER = gql`
query User($email: String!) {
  user(email: $email) {
    email
    name
    image
    role {
      name
    }
  }
}`;

const UPDATE_ROLE = gql`
mutation Mutation($email: String!, $role: String!) {
  userUpdate(email: $email, role: $role) {
    id
    email
    role {
      name
    }
  }
}
`;

export { GET_USERS, GET_USER,UPDATE_ROLE };
