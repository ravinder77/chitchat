import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Profile from './pages/Profile';
import ForgotPassword from './pages/ForgotPassword';
import Settings from './pages/Settings';
import ResetPassword from './pages/ResetPassword';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/useAuthStore';
import { Loader } from 'lucide-react';

function App() {
  const { isCheckingAuth, authUser, checkAuth, onlineUsers } = useAuthStore();
  console.log(onlineUsers)

  useEffect(() => {
    checkAuth();
  }, []);

  console.log(authUser);

  if (isCheckingAuth && !authUser)
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className='size-10 animate-spin' />
      </div>
    );

  return (
    <div>
      <Navbar />

      <div>
        <Routes>
          <Route
            path='/'
            element={authUser !== null ? <Home /> : <Navigate to='/login' />}
          />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/settings' element={<Settings />} />

          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password/:token' element={<ResetPassword />} />
        </Routes>

        <Toaster
          position='bottom-center'
          toastOptions={{
            duration: 5000,
            theme: 'light',
          }}
        />
      </div>
    </div>
  );
}

export default App;
