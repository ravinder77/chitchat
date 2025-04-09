import { LogOut, Settings, User, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useState } from 'react';

const Navbar = () => {
  const { logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className='w-full px-6 py-4 fixed top-0 backdrop-blur-md z-50'>
      <div className='flex items-center justify-between'>
        <div className='font-medium text-xl tracking-wide text-amber-500'>
          <Link to='/'>ChitChat</Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className='md:hidden p-2 hover:bg-amber-100 rounded-lg'
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X className='size-6' /> : <Menu className='size-6' />}
        </button>

        {/* Navigation Menu */}
        <nav
          className={`${
            isMenuOpen ? 'flex' : 'hidden'
          } md:flex absolute md:relative top-16 md:top-0 left-0 right-0 md:right-auto bg-white md:bg-transparent p-4 md:p-0`}
        >
          <ul className='flex flex-col md:flex-row items-start md:items-center gap-4 w-full md:w-auto'>
            <li className='cursor-pointer bg-amber-100 py-2 px-2 hover:bg-amber-200 rounded-xl w-full md:w-auto'>
              <Link to='/settings' className='flex items-center gap-1'>
                <Settings className='size-5' />
                <span>Settings</span>
              </Link>
            </li>
            <li className='cursor-pointer flex items-center gap-1 bg-amber-100 py-2 px-2 hover:bg-amber-200 rounded-xl w-full md:w-auto'>
              <User className='size-5' />
              <Link to='/profile'>Profile</Link>
            </li>
            <li className='w-full md:w-auto'>
              <button
                onClick={logout}
                className='flex items-center gap-1 cursor-pointer bg-amber-100 hover:bg-amber-200 rounded-xl p-2 w-full md:w-auto'
              >
                <LogOut className='size-5' />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
