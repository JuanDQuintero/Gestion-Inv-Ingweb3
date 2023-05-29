import { gql } from '@apollo/client';

const GET_MOVEMENTS = gql`
query Movements {
  movements {
    id
    dateMov
    quantityIn
    quantityOut
    material {
        id
    }
  }
}`;

const CREATE_MOVEMENT = gql`
mutation CreateMovement($dateMov: DateTime!, $quantityOut: Int!, $type: String!, $material: String!, $quantityIn: Int!) {
  createMovement(dateMov: $dateMov, quantityOut: $quantityOut, type: $type, material: $material, quantityIn: $quantityIn) {
    id
    quantityIn
    quantityOut
    type
  }
}
`;

export { GET_MOVEMENTS, CREATE_MOVEMENT };
