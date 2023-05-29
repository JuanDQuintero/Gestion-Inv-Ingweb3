import { signIn } from 'next-auth/react'
import React from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import Loading from '@components/Loading'

const HomePage = () => {
    const {data: session, status} = useSession();

    if(status === 'loading') return <Loading/>
    
  return (<>
    <div className='flex h-full h-screen flex-col items-center justify-center gap-5'>
        <h1 className='text-6xl'>Sistema de Gestión de Inventarios</h1>
        {session ? (
            <Link href='/inventario'>
                <button>Ir a la app </button>
            </Link>
        )
        :(
            <>
                <h2>Bienvenido, inicia sesión</h2>
                <div> 
                    <button onClick={() => signIn("auth0")}>
                        Inicia sesión
                    </button>
                </div>
            </>
        )}
    </div>
    </>
  )
}

export default HomePage;
