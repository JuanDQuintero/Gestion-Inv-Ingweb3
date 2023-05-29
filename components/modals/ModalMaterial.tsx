import React, { FormEvent, useState } from 'react'
import Modal from './Modal';
import { useInventarioContext } from '@context/InventarioContext';
import { toast } from 'react-toastify';
import { FormButtons } from './FormButton';
import { CREATE_MATERIAL } from 'graphql/client/materials';
import { useMutation } from '@apollo/client';
import Loading from '@components/Loading';

const ModalMaterial = () => {
    const { openModal, setOpenModal } = useInventarioContext();
    const [createShipment, { loading: mutationLoading }] =
    useMutation(CREATE_MATERIAL);
    const [formData, setFormData] = useState<{
      name: string;
      price: number;
    }>({
      name: '',
      price: 0,
    });
  

    const submitForm = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const { data } = await createShipment({
          variables: {
            name: formData.name,
            price: formData.price,
            createdAt: new Date().toISOString(),
          },
        });
        toast.success(
          `Despacho creado con éxito. El peso por racimo fue de ${data?.createShipment?.bunchWeight.toFixed(
            2
          )} kg`
        );
        setOpenModal(false);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        toast.error('Ocurrió un error al crear el despacho');
      }
    };

    if (mutationLoading) return <Loading />;
    
    

    return (
      <Modal
      open={openModal}
      setOpen={setOpenModal}
      modalTitle='Agregar material'
      >
        <div>
          <form onSubmit={submitForm} className='flex flex-col gap-2'>
            <label htmlFor='name'>
              <span>Nombre del material</span>
              <input
                type='text'
                required
                name='name'
                step={1}
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
              />
            </label>
            <label>
              <span>Saldo</span>
              <input
                type='number'
                placeholder='0'
                min={0}
                required
                step={1}
                value={formData.price.toString()}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    price: parseInt(e.target.value),
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
  };


export default ModalMaterial