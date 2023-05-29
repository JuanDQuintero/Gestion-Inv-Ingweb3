import { useQuery } from '@apollo/client';
import ModalButtons from '@components/Buttons/ModalButtons';
import Loading from '@components/Loading';
import PrivateRoute from '@components/PrivateRoute';
import ModalMovement from '@components/modals/ModalMovement';
import { InventarioContextProvider } from '@context/InventarioContext';
import Layout from '@layouts/Layout';
import { GET_MOVEMENTS } from 'graphql/client/movements';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useState } from 'react'
import { useMaterialData } from '@hooks/useMaterialData';
import { ExtendedMovement } from 'types';


const Movimientos = () => {

    const {data, loading} = useQuery<{movements: ExtendedMovement[]}>(GET_MOVEMENTS);

    const {dataMaterials } = useMaterialData(); 
    const [selectMaterial, setSelectMaterial] = useState('');
    
    const filteredMovements = selectMaterial ? data?.movements.filter(movement => movement.material.id === selectMaterial) : data?.movements;
    

    if (loading) return <Loading />;
    
    return (
        <PrivateRoute>
            <InventarioContextProvider>
                        <Layout>
                            <div className='w-full p-14 flex flex-col gap-5'>
                                <h1 className='flex justify-center text-4xl pb-10'>Gestión de Inventarios</h1>
                                <div className='flex justify-between bg-'>
                                        <FormControl className='flex w-2/12 bg-gray-300'>
                                            <InputLabel id="demo-simple-select-label">Material</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                label="Material"
                                                value={selectMaterial}
                                                onChange={(e) => setSelectMaterial(e.target.value)}
                                            >
                                                {dataMaterials?.map((material:any) => (
                                                    <MenuItem key={material.id} value={material.id}>{material.name}</MenuItem>
                                                ))}
                                                
                                            </Select>
                                        </FormControl>
                                        <ModalButtons>
                                        Agregar movimiento
                                        </ModalButtons>
                                </div>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Identificador</th>
                                            <th>Fecha de Creación</th>
                                            <th>Entrada</th>
                                            <th>Salida</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredMovements?.map((movement:any) => (
                                            <tr key={movement.id}>
                                                <td>{movement.id}</td>
                                                <td>{movement.dateMov}</td>
                                                <td>{movement.quantityIn}</td>
                                                <td>{movement.quantityOut}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <ModalMovement data={selectMaterial} />
                            </div>
                        </Layout>
            </InventarioContextProvider>
        </PrivateRoute>
            

  );
}

export default Movimientos