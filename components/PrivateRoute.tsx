import React from 'react'
import Link from 'next/link';
import { useUserData } from '@hooks/useUserData';
import Loading from './Loading';
import { Enum_RoleName } from '@prisma/client';

interface PrivateRouteProps {
  role?: Enum_RoleName;
  children: JSX.Element;
}


const PrivateRoute = ({role, children}: PrivateRouteProps) => {
    
  const { status,loading, session, role: userRole} = useUserData();
  
  if(status === 'loading'|| loading) return <Loading/>;

    if(!session) return (
        <div className='h-screen w-full flex flex-col items-center justify-center gap-5'>
            <h1 className='text-5xl text-red-600'>Esta ruta requiere autenticarse</h1>
            <Link href='/' className='text-2xl text-blue-800 rounded-lg bg-slate-300 p-3 hover:bg-slate-400' >
              Ir al home
            </Link>
        </div>
        );

    if (role && role !== userRole)
    return (
        <div className='flex h-screen w-full flex-col items-center justify-center gap-4'>
          <h1 className='text-5xl text-red-500'>
            No tienes permisos para acceder a esta ruta.
          </h1>
          <Link href='/app' className='text-2xl text-blue-500'>
            Ir a la página principal.
          </Link>
        </div>
    );

  return children;
}

export default PrivateRoute;
