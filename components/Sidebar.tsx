import { useNavigationContext } from '@context/NavigationContext';
import React from 'react';
import { MdMenuOpen } from 'react-icons/md';

const Sidebar = () => {
  const { open, setOpen } = useNavigationContext();
  return (
    <aside
      className={`sidebar-desktop sidebar-mobile ${
        open ? 'flex' : 'hidden'
      } flex-col justify-between bg-sky-700 md:flex`}
    > 
      <div className='flex flex-col gap-4'>
        <div className='flex md:hidden'>
          <button onClick={() => setOpen(false)} className='icon-white'>
            <MdMenuOpen />
          </button>
        </div>
        <div className='flex items-center justify-center bg-gray-900'>
          <img src='' alt='logo' className='h-12 w-12' />
        </div>
        <nav>
          <ul className='flex flex-col gap-5'> 
            <li>Inventarios</li>
            <li>Materiales</li>
            <li>Usuarios</li>
          </ul>
        </nav>
      </div>
      <button type='button'>Log out</button>
    </aside>
  );
};

export default Sidebar;
