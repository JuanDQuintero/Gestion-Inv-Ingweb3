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


export { GET_USERS, GET_USER };
