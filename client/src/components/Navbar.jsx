import { LogOut, Settings, User, Menu, X, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useState } from 'react';
import Logo from './Logo';

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  console.log(authUser); // Log the value of authUser to the console to check if it's nul

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className='sticky top-0 z-50 shadow-sm bg-[#003049]'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6'>
        <div className='flex items-center justify-between h-16'>
          <Link to='/'>
            <Logo />
          </Link>

          <div className='hidden md:flex items-center space-x-6'>
            {authUser && (
              <>
                <Link
                  to='/settings'
                  className='text-gray-300 hover:text-[#d62828] font-medium transition-all duration-300 px-3 py-2 hover:scale-95 border hover:border-[#d62828] cursor-pointer'
                >
                  Settings
                </Link>

                <Link
                  to='/profile'
                  className='text-gray-300 hover:text-[#d62828] font-medium transition-all duration-300 border hover:border-[#d62828] px-3 py-2 hover:scale-95 cursor-pointer'
                >
                  Profile
                </Link>
                <button
                  onClick={logout}
                  className='text-[#ede0d4]  transition-all duration-300 bg-[#d62828] px-3 py-2 hover:scale-105 cursor-pointer'
                >
                  Logout
                </button>
              </>
            )}
          
          </div>

          {/* Mobile menu button - show for both logged in and logged out states */}
          <button
            className='md:hidden p-2 text-[#ede0d4] rounded-lg transition-colors duration-200'
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <X className='size-6' />
            ) : (
              <Menu className='size-6' />
            )}
          </button>
        </div>

        {/* mobile menu */}


      </div>
    </header>
  );
};

export default Navbar;
