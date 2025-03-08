import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState({});

  const { login, isLoggingIn } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login({ email, password });
    toast.success('Login successful!');
    setEmail('');
    setPassword('');


    navigate('/');
  };

  return (
    <div className='min-h-screen  flex items-center justify-center w-full'>
      <div className='max-w-md mx-auto shadow-sm px-4 py-6'>
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-medium mb-4'>Login</h1>
          <p className='text-gray-500'>
            Fill in your credentials to access your account.
          </p>
        </div>

        <form onSubmit={handleLogin}>
          <div className='mb-6'>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-700'
            >
              Email
            </label>
            <input
              type='email'
              id='email'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter Your Email'
              required
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500'
            />
          </div>

          <div className='mb-6'>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-gray-700'
            >
              Password
            </label>
            <input
              type='text'
              id='password'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter Your Password'
              required
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500'
            />
          </div>
          <div className='text-center'>
            <button
              disabled={isLoggingIn}
              type='submit'
              className='bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-8 rounded-lg focus:outline-none focus:shadow-outline'
            >
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
