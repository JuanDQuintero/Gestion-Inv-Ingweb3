import React from 'react';
import { useQuery } from '@apollo/client';
//import { GET_USERS } from 'graphql/client/users';
import { User } from '@prisma/client';

const UsersPage = () => {
//   const { data, loading, error } = useQuery<{ users: User[] }>(GET_USERS, {
//     fetchPolicy: 'cache-first',
//   });

//   if (error) return <p>Error</p>;

//   if (loading) return <p>Loading...</p>;

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
