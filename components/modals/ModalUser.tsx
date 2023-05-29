import { useInventarioContext } from '@context/InventarioContext';
import React from 'react'
import Modal from './Modal';

const ModalUser = () => {
    const { openModal, setOpenModal } = useInventarioContext();
    return (
      <Modal
        open={openModal}
        setOpen={setOpenModal}
        modalTitle='Editar rol de Usuario'
      >
        <div>Este es el modal para editar usuario</div>
      </Modal>
    );
}

export default ModalUser