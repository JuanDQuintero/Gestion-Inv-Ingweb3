import Layout from '@layouts/Layout';
import Head from 'next/head';
import { NextPage } from 'next';
import PrivateRoute from '@components/PrivateRoute';
import { InventarioContextProvider } from '@context/InventarioContext';
import { useQuery } from '@apollo/client';
import { GET_MOVEMENTS } from 'graphql/client/users';
import ModalButtons from '@components/Buttons/ModalButtons';

const Home: NextPage = () => (
  <PrivateRoute>
    <>
      
      <Layout>
        <InventarioContextProvider>
          <Movimientos />
        </InventarioContextProvider>
      </Layout>
    </>
  </PrivateRoute>
);

interface Movement{
  id: string;
  dateMov: string;
  quantityIn: number;
  quantityOut : number;
}

const Movimientos = () => {

  const {data, loading} = useQuery<{movements: Movement[]}>(GET_MOVEMENTS);

  if (loading) return <p>Loading...</p>;
  
  return (
      <PrivateRoute>
          <Layout>
              <div className='w-full p-14 flex flex-col gap-5'>
                  <h1 className='flex justify-center text-4xl pb-10'>Gestión de Inventarios</h1>
                  <div className='flex justify-end'>
                      <div className='flex flex-col items-center justify-center gap-2 md:flex-row md:justify-between'>
                          <ModalButtons>
                              Agregar movimiento

                          </ModalButtons>
                      </div>
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
                          {data?.movements.map((movement) => (
                              <tr key={movement.id}>
                                  <td>{movement.id}</td>
                                  <td>{movement.dateMov}</td>
                                  <td>{movement.quantityIn}</td>
                                  <td>{movement.quantityOut}</td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
              </div>
          </Layout>
      </PrivateRoute>
);
}

const DesktopTable = () => {

  return (
    <div className='hidden h-full flex-col md:flex'>
      <div className='flex h-[80vh] justify-center overflow-y-auto p-6'>
        <table className='w-full'>
          <thead>
            <tr>
              <th className='w-1/4'>Identificador</th>
              <th className='w-1/4'>Fecha</th>
              <th className='w-1/4'>Entrada</th>
              <th className='w-1/4'>Salida</th>
            </tr>
          </thead>
          <tbody>
            {/* Contenido de la tabla */}
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

export default Home;
