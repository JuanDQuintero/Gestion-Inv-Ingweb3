import { gql } from '@apollo/client';

const GET_MATERIALS = gql`
query Materials {
    materials {
      id
      createdAt
      name
      price
    }
  }`;

const GET_MATERIAL = gql`
query Query($materialId: String!) {
    material(id: $materialId) {
      id
    }
}`;

  const CREATE_MATERIAL = gql`
  
    mutation Mutation($name: String!, $price: Float!, $createdAt: DateTime!) {
        createMaterial(name: $name, price: $price, createdAt: $createdAt) {
        id
        name
        price
        createdAt
        }
    }
    `;

  
export { GET_MATERIALS, GET_MATERIAL, CREATE_MATERIAL };
