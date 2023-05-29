import ModalButtons from '@components/Buttons/ModalButtons';
import Loading from '@components/Loading';
import PrivateRoute from '@components/PrivateRoute';
import ModalMaterial from '@components/modals/ModalMaterial';
import { useMaterialData } from '@hooks/useMaterialData';
import Layout from '@layouts/Layout';
import React from 'react'



const Materiales = () => {

    const {dataMaterials, loading} = useMaterialData(); 

    if (loading) return <Loading />;
    
    return (
        <PrivateRoute>
            <Layout>
                <div className='w-full p-14 flex flex-col gap-5'>
                    <h1 className='flex justify-center text-4xl pb-10'>Materiales</h1>
                    <div className='flex justify-between'>
                     
                        <ModalButtons>
                            Agregar material
                        </ModalButtons>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Identificador</th>
                                <th>Nombre</th>
                                <th>Fecha de Creación</th>
                                <th>Saldo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataMaterials?.map((material) => (
                                <tr key={material.id}>
                                    <td>{material.id}</td>
                                    <td>{material.name}</td>
                                    <td>{material.createdAt}</td>
                                    <td>{material.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <ModalMaterial />
                </div>
            </Layout>
        </PrivateRoute>
  );
}

export default Materiales