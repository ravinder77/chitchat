import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const { forgotPassword, isLoading } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await forgotPassword({ email });
    toast.success("Password reset link sent to your email")
    setEmail("");
  };

  return (
    <div className='w-full'>
      <div className='max-w-lg mx-auto'>
        <form onSubmit={handleSubmit} className='flex items-center'>
          <input
            type='email'
            placeholder='Enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-[300px] px-2 py-2 outline-none border border-gray-300'
          />
          <button
						type='submit'
						disabled={isLoading}
						className={` text-white px-4 py-2  ${isLoading ? ' bg-blue-400 opacity-50 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {isLoading ? 'Loading...' : 'Send Reset Link'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
