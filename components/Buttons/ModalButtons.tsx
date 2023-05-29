import React from 'react'
import { useInventarioContext } from '@context/InventarioContext';

interface ModalButtonsProps {
    children: string;
}

const ModalButtons = (props:ModalButtonsProps) => {
    const { setOpenModal } = useInventarioContext();
        
  return (
    <div className='flex items-center gap-2'>
      <button type='button' onClick={() => setOpenModal(true)}>
        {props.children} 
      </button>
    </div>
  )
}

export default ModalButtons