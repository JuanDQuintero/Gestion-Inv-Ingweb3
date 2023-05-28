import { useQuery } from '@apollo/client';
import { GET_USERS } from 'graphql/client/users';
import React from 'react';
import { User } from '@prisma/client';


const UsersPage = () => {

    const { data , loading,  error} = useQuery< { users: User[] }>(GET_USERS, {
        fetchPolicy: 'cache-first',
      });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
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
            {data.users.map((user: any) => (
                <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.password}</td>
                </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersPage;
