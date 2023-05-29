import React, { FormEvent, useState } from 'react'
import Modal from './Modal';
import { useInventarioContext } from '@context/InventarioContext';
import { toast } from 'react-toastify';
import Loading from '@components/Loading';
import { FormButtons } from './FormButton';
import { CREATE_MOVEMENT } from 'graphql/client/movements';
import { useMutation } from '@apollo/client';
import { useUserData } from '@hooks/useUserData';


const ModalMovement = (props:any) => {

  const materialId = props.data;   


    const { openModal, setOpenModal } = useInventarioContext();
    const [createShipment, { loading: mutationLoading }] = useMutation(CREATE_MOVEMENT);
    const { userData } = useUserData();

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

    await createShipment({
      variables: {
        dateMov: new Date().toISOString(),
        quantityIn,
        quantityOut,
        type,
        performedBy: userData?.user.email,
        material: materialId,
      },
    });

    toast.success('Movimiento creado con éxito.');
    setOpenModal(false);
  } catch (e) {
    console.error(e);
    toast.error('Ocurrió un error al crear el movimiento');
  }
};

if (mutationLoading) return <Loading />;

return (
  <Modal
    open={openModal}
    setOpen={setOpenModal}
    modalTitle='Crear un movimiento'
  >
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
        <FormButtons
          loading={false}
          closeModal={() => setOpenModal(false)}
        />
      </form>
    </div>
  </Modal>
);

}

export default ModalMovement