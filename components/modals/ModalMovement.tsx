import React, { FormEvent, useState } from 'react';
import Modal from './Modal';
import { useInventarioContext } from '@context/InventarioContext';
import { toast } from 'react-toastify';
import Loading from '@components/Loading';
import { FormButtons } from './FormButton';
import { CREATE_MOVEMENT } from 'graphql/client/movements';
import { UPDATE_MATERIAL } from 'graphql/client/materials'; // Importa la mutación updateMaterial
import { useMutation, useQuery } from '@apollo/client';
import { useUserData } from '@hooks/useUserData';
import { GET_MATERIAL_BALANCE } from 'graphql/client/materials';

const ModalMovement = (props: any) => {
  const materialId = props.data;
  const { openModal, setOpenModal } = useInventarioContext();
  const [createMovement, { loading: mutationLoading }] = useMutation(CREATE_MOVEMENT);
  const [materialUpdate] = useMutation(UPDATE_MATERIAL);
  const { userData } = useUserData();

  const { loading: balanceLoading, data: balanceData, refetch } = useQuery(GET_MATERIAL_BALANCE, {
    variables: { materialId },
  });

  const materialBalance = balanceData?.material?.balance || 0;
  
  const [formData, setFormData] = useState<{
    type: 'ENTRADA' | 'SALIDA';
    quantity: number;
  }>({
    type: 'ENTRADA',
    quantity: 0,
  });

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (materialId === '') {
        return toast.error('Selecciona un material');
      }

      const { type, quantity } = formData;
      const quantityIn = type === 'ENTRADA' ? quantity : 0;
      const quantityOut = type === 'SALIDA' ? quantity : 0;

      if (type === 'SALIDA' && quantityOut > materialBalance) {
        return toast.error('La cantidad de salida supera el saldo actual del material');
      }

      await createMovement({
        variables: {
          dateMov: new Date().toISOString(),
          quantityIn,
          quantityOut,
          type,
          performedBy: userData?.user.email,
          material: materialId,
        },
      });      
      
      // Actualiza el saldo general del material
      const newBalance = materialBalance + quantityIn - quantityOut;
      await materialUpdate({
        variables: {
          id: materialId,
          balance: newBalance,
        },
      });


      toast.success('Movimiento creado con éxito.');
      setOpenModal(false);
      refetch(); // Actualiza los datos de los movimientos sin recargar la página
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      toast.error('Ocurrió un error al crear el movimiento');
    }
  };

  if (balanceLoading) return <Loading />;
  if (mutationLoading) return <Loading />;

  return (
    <Modal open={openModal} setOpen={setOpenModal} modalTitle='Crear un movimiento'>
      <div>
        <form onSubmit={submitForm} className='flex flex-col gap-2'>
          <label htmlFor='name'>
            <span>Ingrese la entrada o salida</span>
            <select
              required
              value={formData.type}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  type: e.target.value as 'ENTRADA' | 'SALIDA',
                }))
              }
            >
              <option value='ENTRADA'>Entrada</option>
              <option value='SALIDA'>Salida</option>
            </select>
          </label>
          <label>
            <span>Cantidad a ingresar</span>
            <input
              type='number'
              placeholder='0'
              min={0}
              required
              step={1}
              value={formData.quantity.toString()}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  quantity: parseInt(e.target.value),
                }))
              }
            />
          </label>
          <FormButtons loading={false} closeModal={() => setOpenModal(false)} />
        </form>
      </div>
    </Modal>
  );
};

export default ModalMovement;
