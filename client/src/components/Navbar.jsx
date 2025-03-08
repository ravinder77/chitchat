import { LogOut, Settings, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const Navbar = () => {

	const {logout, authUser} = useAuthStore();

  return (
    <header className='w-full px-6 py-4 fixed top-0 backdrop-blur-md'>
			<div className='flex items-center justify-between'>
				
				<div className='font-medium text-xl tracking-wide	text-amber-500'>

        <Link to='/'>chitchat</Link>
				</div>

        <div>
          <ul className='flex items-center gap-4  space-x-4'>
            <li className='cursor-pointer bg-amber-100 py-2 px-2 hover:bg-amber-200 rounded-xl'>
							<Link to='/settings'
								className='flex items-center gap-1'
							>
								<Settings className='size-5' />
								settings
							</Link>
            </li>
						<li className='cursor-pointer flex items-center gap-1 bg-amber-100 py-2 px-2 hover:bg-amber-200 rounded-xl'>
							<User className='size-5'/>
              <Link to='/profile'>Profile</Link>
						</li>
						
						<li>
							
							<button
								
								onClick={logout}
								className='flex items-center gap-1 cursor-pointer bg-amber-100 hover:bg-amber-200 rounded-xl p-2 '>
								<LogOut className='size-5'/>
								<span>Logout</span>
							</button>
						</li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
