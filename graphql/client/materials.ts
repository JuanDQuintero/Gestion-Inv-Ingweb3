import { gql } from '@apollo/client';

const GET_MATERIALS = gql`
  query Query {
    materials {
      id
      createdAt
      name
      balance
    }
  }`;

 const GET_MATERIAL_BALANCE = gql`
  query GetMaterialBalance($materialId: String!) {
    material(id: $materialId) {
      balance
    }
  }
  `;

const GET_MATERIAL = gql`
query Query($materialId: String!) {
    material(id: $materialId) {
      id
    }
}`;

  const CREATE_MATERIAL = gql`
  
    mutation Mutation($name: String!, $balance: Int!, $createdAt: DateTime!) {
        createMaterial(name: $name, balance: $balance, createdAt: $createdAt) {
        id
        name
        balance
        createdAt
        }
    }
    `;

    const UPDATE_MATERIAL = gql`
    mutation Mutation($id: String!, $balance: Int!) {
      materialUpdate(id: $id, balance: $balance) {
        id
        balance
        name
      }
    }
    `;

  
export { GET_MATERIALS, GET_MATERIAL, CREATE_MATERIAL,GET_MATERIAL_BALANCE, UPDATE_MATERIAL };
