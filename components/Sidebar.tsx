import { useNavigationContext } from '@context/NavigationContext';
import { signOut, useSession } from 'next-auth/react';
import React from 'react';
import { MdMenuOpen } from 'react-icons/md';
import PrivateComponent from './PrivateComponent';
import Link from 'next/link';
import Loading from './Loading';
import { useRouter } from 'next/router';
import { GET_USER } from 'graphql/client/users';
import { useQuery } from '@apollo/client';

interface User {
  id: string;
  name: string;
  createdAt: Date;
  email: string;
  role: {
    name: string;
  }
  image: string;
}

const Sidebar = () => {
  const { data: session } = useSession();
  const userEmail = session?.user?.email;

  const { data: userData, loading } = useQuery<{ user: User }>(GET_USER, {
    variables: {
      email: userEmail,
    },
  });

  const userImage = userData?.user?.image;
  const userName = userData?.user?.name;

  const { open, setOpen } = useNavigationContext();

  interface NavLinkProps {
    href: string;
    children: React.ReactNode;
  }

  const NavLink = ({ href, children }: NavLinkProps) => {
    const router = useRouter();
    const isActive = router.pathname === href;
    const linkClass = isActive ? ' border-2 bg-gray-500 text-white' : '';

    return (
      <Link href={href}>
        <li className={linkClass}>{children}</li>
      </Link>
    );
  };

  if (loading || !userData?.user) {
    return <Loading />;
  }

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
        <div className='flex items-center justify-center flex-col gap-2'>
          {userImage && <img src={userImage} alt='logo' className='rounded-full' />}
          {userName && <h2 className='text-2xl font-bold text-white'>{userName}</h2>}
        </div>
        <nav>
          <ul className='flex flex-col gap-5'>
            <NavLink href='/inventario'>Inventarios</NavLink>
            <NavLink href='/materiales'>Materiales</NavLink>
            <PrivateComponent role='ADMIN'>
              <NavLink href='/users'>Usuarios</NavLink>
            </PrivateComponent>
          </ul>
        </nav>
      </div>
      <button type='button' onClick={() => signOut()}>
        Log out
      </button>
    </aside>
  );
};

export default Sidebar;
