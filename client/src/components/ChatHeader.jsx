import React from 'react';
import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';
import { X } from 'lucide-react';

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  if (selectedUser === null) return null;
  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <div className=' p-2.5 border border-b border-amber-200'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          {/* avatar */}
          <div className=''>
            <div className='size-10 rounded-full relative'>
              <img
                src={selectedUser.profilePic || '/avatar.jpg'}
                alt={selectedUser.fullName || 'user profile'}
              />
            </div>
          </div>

          <div>
            <h3 className='font-medium'>{selectedUser.fullName}</h3>
            <p className='text-sm'>{isOnline ? 'Online' : 'Offline'}</p>
          </div>
        </div>

        <div>
          <button
            className='p-1 rounded-full hover:bg-amber-100'
            onClick={() => setSelectedUser(null)}>
            <X />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
