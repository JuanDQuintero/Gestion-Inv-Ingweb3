import { MdMenu, MdMenuOpen } from 'react-icons/md';
 
const Navbar = () => {
  return (
    <nav className='h-min w-screen flex justify-between gap-2 p-3 bg-gray-300'>
      <div className='flex flex-grow'>
        <span className='mx-auto text-lg'>Gestión de Inventarios</span>
      </div>
      <div>Logo</div>
    </nav>
  );
};

export default Navbar;
