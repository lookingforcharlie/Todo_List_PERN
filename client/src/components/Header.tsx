import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import icon from '../../public/todo_logo.png';

interface HeaderProps {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: FC<HeaderProps> = ({ isAuthenticated, setIsAuthenticated }) => {
  const handleLogout = () => {
    if (isAuthenticated) localStorage.removeItem('token');
    setIsAuthenticated(false);
  };
  return (
    <div className='w-full mx-auto bg-gray-300 shadow-md px-8 py-1 text-zinc-700'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center justify-center'>
          <img src={icon} className='w-16 md:w-24' />
          <div className='text-base md:text-2xl'>Todo App</div>
        </div>
        <div className='space-x-4'>
          {/* Compared with Link, NavLink offers us a class of active, we can leverage it in CSS */}
          <NavLink to='/' className='md:text-xl'>
            Home
          </NavLink>
          <NavLink to='/todos' className='md:text-xl'>
            MyTodos
          </NavLink>
          <NavLink to='/login' className='md:text-xl' onClick={handleLogout}>
            {isAuthenticated ? 'Logout' : 'Login'}
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Header;
