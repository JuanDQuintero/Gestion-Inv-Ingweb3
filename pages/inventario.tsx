import { useQuery } from '@apollo/client';
import ModalButtons from '@components/Buttons/ModalButtons';
import PrivateRoute from '@components/PrivateRoute';
import ModalMovement from '@components/modals/ModalMovement';
import { InventarioContextProvider } from '@context/InventarioContext';
import Layout from '@layouts/Layout';
import { GET_MOVEMENTS } from 'graphql/client/movements';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useState } from 'react'
import { useMaterialData } from '@hooks/useMaterialData';
import { ExtendedMovement } from 'types';

type SelectMaterial = string | null;

const MovimientosTable = ({ selectMaterial }: { selectMaterial: SelectMaterial }) => {
  const { data, refetch } = useQuery<{ movements: ExtendedMovement[] }>(GET_MOVEMENTS, {
    fetchPolicy: 'cache-and-network',
  });

  const [loadingTable, setLoadingTable] = useState(false);

  const { dataMaterials } = useMaterialData();

  const filteredMovements = selectMaterial
    ? data?.movements.filter((movement) => movement.material.id === selectMaterial)
    : data?.movements;

  const getMaterialBalance = (materialId: string) => {
    const material = dataMaterials?.find((material: any) => material.id === materialId);
    return material?.balance || 0;
  };

  const handleRefreshTable = async () => {
  try {
    setLoadingTable(true);
    await refetch();
    setLoadingTable(false);
  } catch (error) {
    setLoadingTable(false);
  }
};

  return (<>
    
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
        {filteredMovements?.map((movement: any) => (
          <tr key={movement.id}>
            <td>{movement.id}</td>
            <td>{movement.dateMov}</td>
            <td>{movement.quantityIn}</td>
            <td>{movement.quantityOut}</td>
          </tr>
        ))}
        {selectMaterial && (
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td>Saldo: {getMaterialBalance(selectMaterial)}</td>
          </tr>
        )}
      </tbody>
    </table>
    <div className='flex justify-end'>
      <button onClick={handleRefreshTable} disabled={loadingTable} className='w-1/12 text-sm bg-gray-500 rounded-full p-1 '>
        {loadingTable ? 'Cargando...' : 'Actualizar tabla'}
      </button>
    </div>
    </>
  );
};

const Movimientos = () => {
  const { dataMaterials } = useMaterialData();
  const [selectMaterial, setSelectMaterial] = useState('');

  return (
    <PrivateRoute>
      <InventarioContextProvider>
        <Layout>
          <div className='w-full p-14 flex flex-col gap-5'>
            <h1 className='flex justify-center text-4xl pb-10'>Gestión de Inventarios</h1>
            <div className='flex justify-between bg-'>
              <FormControl className='flex w-2/12 bg-gray-300'>
                <InputLabel id='demo-simple-select-label'>Material</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  label='Material'
                  value={selectMaterial}
                  onChange={(e) => setSelectMaterial(e.target.value)}
                >
                  {dataMaterials?.map((material: any) => (
                    <MenuItem key={material.id} value={material.id}>
                      {material.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <ModalButtons> Agregar movimiento </ModalButtons>
            </div>
            <MovimientosTable selectMaterial={selectMaterial} />
            <ModalMovement data={selectMaterial} />
          </div>
        </Layout>
      </InventarioContextProvider>
    </PrivateRoute>
  );
};

export default Movimientos;
