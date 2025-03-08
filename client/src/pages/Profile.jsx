import { Camera, Mail, User } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

const Profile = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  console.log(authUser);

	const handleImageUpload = async (e) => {
		const file = e.target.files[0];	
		if (!file) return;

		const reader = new FileReader();
		reader.readAsDataURL(file);

		reader.onload = async (e) => {
			const base64Image = reader.result;
			await updateProfile({profilePic: base64Image})
		}
		toast.success('Profile updated successfully!');
	};

  return (
    <div className='pt-20'>
      <div className='max-w-2xl mx-auto p-4 py-8 bg-amber-50'>
        <div className=' rounded-lg p-6 space-y-8'>
          <div className='text-center'>
            <h1 className='text-2xl font-medium tracking-wide mb-2'>Profile</h1>
            <p className='text-gray-500 mb-4'>
              Update your profile details here.
            </p>
          </div>

          {/* avatar upload section */}

          <div className='flex flex-col items-center gap-4'>
            <div className='relative'>
              <img
                src={authUser?.profilePic || '/avatar.jpg'}
                alt='profile pic'
                className='size-32 rounded-full object-cover border-2'
              />
              <label
                htmlFor='avatar-upload'
                className={`absolute bottom-0 right-0 hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 ${
                  isUpdatingProfile ? 'animate-pulse pointer-events-none' : ''
                }`}
              >
                <Camera className='size-6 text-gray-600' />
                <input
                  type='file'
                  id='avatar-upload'
                  className='hidden'
                  accept='image/*'
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p>
              {isUpdatingProfile
                ? 'Updating profile...'
                : 'Upload a new profile picture'}
            </p>
          </div>

          {/* user info  */}

          <div className='space-y-6'>
            <div className='space-y-1.5'>
              <div className='text-sm text-zinc-400 flex items-center gap-2'>
                <User className='size-4' />
                Name
              </div>
              <p className='px-4 py-2.5 rounded-lg border text-zinc-500'>
                {authUser?.fullName}
              </p>
            </div>
            <div className='space-y-1.5'>
              <div className='text-sm text-zinc-400 flex items-center gap-2'>
                <Mail className='size-4' />
                Email
              </div>
              <p className='px-4 py-2.5 rounded-lg border text-zinc-500'>
                {authUser?.email}
              </p>
            </div>
					</div>
					


        </div>
      </div>
    </div>
  );
};

export default Profile;
