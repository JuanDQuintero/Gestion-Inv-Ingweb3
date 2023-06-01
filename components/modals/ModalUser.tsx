import { useInventarioContext } from '@context/InventarioContext';
import React, { FormEvent, useState } from 'react'
import Modal from './Modal';
import { toast } from 'react-toastify';
import { GET_USERS, UPDATE_ROLE } from 'graphql/client/users';
import { useMutation, useQuery } from '@apollo/client';
import { Enum_RoleName } from '@prisma/client';
import CircularProgress from '@mui/material/CircularProgress';


interface User {
  role: {
    name: string;
  }
  id: string;
  name: string;
  createdAt: Date;
  email: string;
}

const ModalUser = () => {
  const { openModal, setOpenModal } = useInventarioContext();
  const [updateUser, { loading: mutationLoading }] = useMutation(UPDATE_ROLE);

  const { data } = useQuery<{ users: User[] }>(GET_USERS, {
    fetchPolicy: 'cache-first',
  });


  const users = data?.users;
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const userRole = selectedUser?.role.name;

  const [formData, setFormData] = useState<{
    user: string;
    role: Enum_RoleName;
  }>({
    user: '',
    role: userRole as Enum_RoleName || Enum_RoleName.USER,
  });


  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedEmail = event.target.value;
    const selectedUser = users?.find((user) => user.email === selectedEmail) || null;
    setSelectedUser(selectedUser);
  
    const selectedUserRole = selectedUser?.role.name || Enum_RoleName.USER;
    setFormData((prev) => ({
      ...prev,
      user: selectedEmail,
      role: selectedUserRole as Enum_RoleName,
    }));
  };
  

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRole = event.target.value as Enum_RoleName;
    setFormData((prev) => ({
      ...prev,
      role: selectedRole,
    }));
  };
  

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { user, role } = formData;
  
      // Actualizar formData con el nuevo valor del tipo de rol
      setFormData((prev) => ({
        ...prev,
        role: role,
      }));

      await updateUser({
        variables: {
          email: user || '',
          role: role,
        },
      });
      toast.success('Usuario editado con éxito.');
      setOpenModal(false);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      toast.error('Ocurrió un error al editar el usuario');
    }
  };
  

  return (
    <Modal
      open={openModal}
      setOpen={setOpenModal}
      modalTitle='Editar rol de Usuario'
    >
      <form onSubmit={submitForm} className='flex flex-col gap-2'>
        <label htmlFor='user'>
          <span>Usuario a editar</span>
          {users && (
            <select
              required
              defaultValue={formData.user}
              onChange={handleUserChange}
            >
              <option value=''>
                Seleccionar usuario
              </option>
              {users.map((userObj) => (
                <option
                  key={userObj.email}
                  value={userObj.email}
                  selected={formData.user === userObj.email}
                >
                  {userObj.email}
                </option>
              ))}
            </select>
          )}
        </label>
        <label htmlFor='role'>
          <span>Rol del usuario</span>
          <select
            required
            value={formData.role}
            onChange={handleRoleChange}
          >
            <option value={Enum_RoleName.USER} selected={formData.role === Enum_RoleName.USER}>USER</option>
            <option value={Enum_RoleName.ADMIN} selected={formData.role === Enum_RoleName.ADMIN}>ADMIN</option>
          </select>
        </label>
        <button>Guardar</button>
        {
          mutationLoading && <div className='flex justify-center'>
            <CircularProgress />
            </div>
        }
      </form>
    </Modal>
  );
};

export default ModalUser