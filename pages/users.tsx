import { useQuery } from '@apollo/client';
import { GET_USERS } from 'graphql/client/users';
import React from 'react';
import PrivateRoute from '@components/PrivateRoute';
import Layout from '@layouts/Layout';
import ModalUser from '@components/modals/ModalUser';
import ModalButtons from '@components/Buttons/ModalButtons';
import Loading from '@components/Loading';


interface User {
  role: {
    name: string;
  }
  id: string;
  name: string;
  createdAt: Date;
  email: string;
}


const UsersPage = () => (
    <PrivateRoute>
      <Layout>
      <div className='w-full p-14 flex flex-col gap-5'>
                    <h1 className='flex justify-center text-4xl pb-10'>Gestión de Usuarios</h1>
                    <div className='flex justify-end'>
                    <div className='flex justify-end'>
                        <ModalButtons>
                            Editar usuario
                        </ModalButtons>
                    </div>
                    </div>
                    <ModalUser />
          <DesktopTable />

        </div>
      </Layout>
    </PrivateRoute>
  );


const DesktopTable = () => {
  const { data, loading } = useQuery< { users: User[] }>(GET_USERS, {
    fetchPolicy: 'cache-first',
  });

  const users = data?.users;

  if (loading) return <Loading />;

  return (
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
                <td>{user.createdAt}</td>
                <td>{user.email}</td>
                <td>{user.role.name}</td>
              </tr>
            ))}              
          </tbody>
        </table>
      </div>
      <div>Paginacion</div>
    </div>
  );
}
  
const MobileCards = () => (
  <div className='grid h-full grid-cols-2 items-center justify-items-center gap-2 sm:grid-cols-4 md:hidden'>
    
  </div>
);

export default UsersPage;
