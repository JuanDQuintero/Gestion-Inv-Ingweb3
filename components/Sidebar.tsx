import React from 'react';
import { MdMenuOpen } from 'react-icons/md';

const Sidebar = () => {
  return (
    <aside
      className= "sidebar-desktop sidebar-mobile bg-gray-300"> 
      <div className='flex flex-col gap-4'>
        <div className='flex md:hidden'>
          <button></button>
        </div>
        <div className='flex items-center justify-center bg-gray-900'>
          <img src='' alt='logo' className='h-12 w-12' />
        </div>
        <nav>
          <ul className='flex flex-col pb-5 gap-3'> 
            <li>Inventarios</li>
            <li>Materiales</li>
            <li>Usuarios</li>
          </ul>
        </nav>
      </div>
      <div>
        <button type='button'>Log out</button>
      </div>
    </aside>
  );
};

export default Sidebar;
