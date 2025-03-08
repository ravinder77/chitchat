import { Eye, EyeOff, MessagesSquare } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore.js';
import toast from 'react-hot-toast';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    let newErrors = {};

    if (!formData.fullName) {
      newErrors.fullName = 'Fullname is required';
    } else if (formData.fullName.length < 3) {
      newErrors.fullName = 'Fullname must be at least 3 characters long';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await signup(formData);
      toast.success('Signup successful!');

      setFormData({ fullName: '', email: '', password: '' });
      setErrors({});
    } catch (error) {
      toast.error(error.message || 'Signup Falied');
    }
  };

  return (
    <section className='w-full'>
      <div className='max-w-md mx-auto flex flex-col  shadow-lg rounded-lg bg-amber-50 mt-24 py-10'>
        <div className='flex items-center justify-center mb-4'>
          <MessagesSquare className='size-12 bg-gray-100 p-2 rounded-lg' />
        </div>
        <h1 className='text-3xl font-medium tracking-wide text-center mb-3'>
          Sign Up
        </h1>
        <p className='text-center text-gray-500 mb-8'>
          Create an account to start using our platform.
        </p>

        <div className='px-4'>
          <form onSubmit={handleSignup} className='flex flex-col gap-4'>
            <label className='flex flex-col gap-1'>
              <span className='text-sm'>Fullname</span>
              <input
                type='text'
                placeholder='Enter your name'
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500'
              />
              {errors.fullName && (
                <span className='text-red-500 text-sm'>{errors.fullName}</span>
              )}
            </label>
            <label className='flex flex-col gap-1'>
              <span className='text-sm'>Email</span>
              <input
                type='email'
                placeholder='Enter your email'
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500'
              />
              {errors.email && (
                <span className='text-red-500 text-sm'>{errors.email}</span>
              )}
            </label>
            <label className='flex flex-col gap-1'>
              <span className='text-sm'>Password</span>
              <div className='relative w-full'>
                <input
                  aria-label='Password'
                  type={showPassword ? 'text' : 'password'}
                  placeholder='example@email.com'
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500'
                />

                <button
                  onClick={() => setShowPassword(!showPassword)}
                  type='button'
                  className='cursor-pointer absolute right-2 top-1/2 transform -translate-y-1/2'
                >
                  {showPassword ? (
                    <EyeOff className='size-4 text-gray-500' />
                  ) : (
                    <Eye className='size-4 text-gray-500' />
                  )}
                </button>
              </div>
              {errors.password && (
                <span className='text-red-500 text-sm'>{errors.password}</span>
              )}
            </label>

            <div>
              <Link
                to='/forgot-password'
                className='text-blue-600 text-sm font-medium'
              >
                Forgot Password
              </Link>
            </div>

            <div className='text-center'>
              <button
                className='bg-blue-600 text-white px-6 py-2 rounded-lg cursor-pointer'
                type='submit'
              >
                {isSigningUp ? 'Signing up...' : 'Signup'}
              </button>
            </div>
          </form>

          <div className='mt-6'>
            <p className='text-gray-500 text-center'>
              Already have an account?{' '}
              <Link to='/login' className='text-blue-500 underline'>
                Login
              </Link>{' '}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
