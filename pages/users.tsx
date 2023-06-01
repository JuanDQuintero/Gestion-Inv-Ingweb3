import { useQuery } from '@apollo/client';
import { GET_USERS } from 'graphql/client/users';
import React from 'react';
import PrivateRoute from '@components/PrivateRoute';
import Layout from '@layouts/Layout';
import ModalUser from '@components/modals/ModalUser';
import ModalButtons from '@components/Buttons/ModalButtons';
import Loading from '@components/Loading';
import PrivateComponent from '@components/PrivateComponent';
import { useUserData } from '@hooks/useUserData';
import Link from 'next/link';

interface User {
  id: string;
  name: string;
  createdAt: Date;
  email: string;
  role: {
    name: string;
  }
}

const UsersPage = () => {
  const { data, loading } = useQuery<{ users: User[] }>(GET_USERS, {
    fetchPolicy: 'cache-first',
  });

  const users = data?.users;
  const { role: userRole } = useUserData();

  if (loading) return <Loading />;

  if (userRole !== 'ADMIN') {
    return (
      <PrivateRoute>
        <Layout>
          <div className='w-full p-14 flex flex-col gap-5'>
            <h1 className='flex justify-center text-4xl pb-10'>
              No tienes permisos para ver esta página
            </h1>
            <Link className='flex justify-center' href='/inventario'>
              <button>Volver a inventario</button>
            </Link>
          </div>
        </Layout>
      </PrivateRoute>
    );
  }

  return (
    <PrivateRoute>
      <PrivateComponent role='ADMIN'>
        <Layout>
          <div className='w-full p-14 flex flex-col gap-5'>
            <h1 className='flex justify-center text-4xl pb-10'>
              Gestión de Usuarios
            </h1>
            <div className='flex justify-end'>
              <div className='flex justify-end'>
                <ModalButtons>Editar usuario</ModalButtons>
              </div>
            </div>
            <ModalUser />

            <div className='hidden flex-col md:flex'>
              <div className='flex justify-center overflow-y-auto p-6'>
                <table className='w-full'>
                  <thead>
                    <tr>
                      <th className='w-1/4'>Identificador</th>
                      <th className='w-1/4'>Fecha de Creación</th>
                      <th className='w-1/4'>Correo</th>
                      <th className='w-1/4'>Rol</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users?.map((user) => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.createdAt.toLocaleString()}</td>
                        <td>{user.email}</td>
                        <td>{user.role?.name}</td> {/* Utiliza el operador ?. para acceder a user.role.name */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div>Paginacion</div>
            </div>
          </div>
        </Layout>
      </PrivateComponent>
    </PrivateRoute>
  );
};

export default UsersPage;
