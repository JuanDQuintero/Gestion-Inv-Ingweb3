import { useNavigationContext } from '@context/NavigationContext';
import { signOut } from 'next-auth/react';
import React from 'react';
import { MdMenuOpen } from 'react-icons/md';
import PrivateComponent from './PrivateComponent';
import Link from 'next/link';
import { useUserData } from '@hooks/useUserData';
import Loading from './Loading';

const Sidebar = () => {
  
  const { loading, userData } = useUserData();

  const userImage = userData?.user?.image;

  const { open, setOpen } = useNavigationContext();
  
  if(loading) return <Loading></Loading>
  return (
    <aside
      className={`sidebar-desktop sidebar-mobile ${
        open ? 'flex' : 'hidden'
      } flex-col justify-between bg-sky-700 md:flex`}
    > 
      <div className='flex flex-col gap-10'>
        <div className='flex md:hidden'>
          <button onClick={() => setOpen(false)} className='icon-white'>
            <MdMenuOpen />
          </button>
        </div>
        <div className='flex items-center justify-center'>
          <img src={userImage} alt='logo' className='rounded-full' />
        </div>
        <nav>
          <ul className='flex flex-col gap-5'> 
            <Link href='/inventario'>
              <li>
                Inventarios
              </li> 
            </Link>
            <Link href='/materiales'>
              <li>
                Materiales
              </li> 
            </Link>
            <PrivateComponent role='ADMIN'>
                <Link href='/users'>
                  <li>
                      Usuarios
                  </li> 
                </Link>
            </PrivateComponent>
            
          </ul>
        </nav>
      </div>
      <button type='button' onClick={()=>signOut()}>Log out</button>
    </aside>
  );
};

export default Sidebar;
