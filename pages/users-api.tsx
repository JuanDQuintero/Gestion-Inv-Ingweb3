import React from 'react';
import { useQuery } from '@apollo/client';
//import { GET_USERS } from 'graphql/client/users';
import { User } from '@prisma/client';

const UsersPage = () => {

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Contraseña</th>
          </tr>
        </thead>
        <tbody>
          
        </tbody>
      </table>
    </div>
  );
};

export default UsersPage;
