import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import toast from 'react-hot-toast';
import { useParams , useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { resetPassword, isLoading } = useAuthStore();

	const { token } = useParams();
	const navigate = useNavigate();

  const validateForm = () => {
    let errors = {};
    if (!newPassword || !confirmPassword) {
      errors.password = 'Password is required.';
      toast.error('Please fill in both password fields.');
    }

    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters long.');
      return false;
    }

    if (newPassword !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
      toast.error('Passwords do not match.');
    }

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;


		try {
      const response = await resetPassword(token, newPassword);
      if (response?.message) {
        toast.success(response.message);
        setTimeout(() => navigate('/login'), 3000); // Redirect after 3s
      }
    } catch (error) {
			toast.error('Failed to reset password. Please try again.');
			console.error(error);
    }
		
  };

  return (
    <div className='h-screen w-full'>
      <div className='max-w-sm mx-auto shadow-sm px-4 py-6'>
        <form onSubmit={handleSubmit}>
          <label className='flex flex-col gap-1 mb-2'>
            <span className='text-sm'>Password</span>
            <div className='relative w-full'>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder='New Password'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className='w-full px-2 py-2 outline-none border border-gray-300 rounded-lg'
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                type='button'
                className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500'
              >
                {showPassword ? (
                  <EyeOff className='size-5' />
                ) : (
                  <Eye className='size-5' />
                )}
              </button>
            </div>
          </label>
          <label className='flex flex-col gap-1 mb-4'>
            <span className='text-sm'>Confirm Password</span>
            <div className='w-full relative'>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                placeholder='Confirm Password'
                onChange={(e) => setConfirmPassword(e.target.value)}
                className='w-full px-2 py-2 outline-none border border-gray-300 rounded-lg'
              />
              <button
                type='button'
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500'
              >
                {showConfirmPassword ? (
                  <EyeOff className='size-5' />
                ) : (
                  <Eye className='size-5' />
                )}
              </button>
            </div>
          </label>
          <div className='flex items-center justify-center'>
            <button
              disabled={isLoading}
              type='submit'
              className={`w-full py-2 rounded-lg text-white ${
                isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {isLoading ? 'Loading...' : 'Reset Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
