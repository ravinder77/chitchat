import React from 'react';
import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';
import { X, ArrowLeft } from 'lucide-react';

const ChatHeader = ({ onback }) => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  if (selectedUser === null) return null;
  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <div className='p-2 sm:p-2.5 border-b sticky top-0 z-10 bg-[#003049]'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2 sm:gap-3 min-w-0'>
          {/* Back button - visible only on mobile */}
          <button
            className='md:hidden p-1.5 rounded-full hover:bg-amber-200 transition-colors flex-shrink-0'
            onClick={onback}
            aria-label='Back to contacts'
          >
            <ArrowLeft className='size-5' />
          </button>
          {/* avatar */}
          <div className='flex-shrink-0'>
            <div className='size-11 sm:size-10 rounded-full relative overflow-hidden'>
              <img
                src={selectedUser.profilePic || '/avatar.jpg'}
                alt={selectedUser.fullName || 'user profile'}
                className='object-cover w-full h-full'
              />
            </div>
          </div>
          <div className='truncate'>
            <h3 className='font-medium text-[#ede0d4] capitalize truncate'>
              {selectedUser.fullName}
            </h3>
            <p className='text-sm text-gray-700'>
              {isOnline ? 'Online' : 'Offline'}
            </p>
          </div>
        </div>

        <div className='hidden md:block'>
          <button
            className='p-2 sm:p-1.5 rounded-full text-[#ede0d4] transition-colors cursor-pointer hover:bg-gray-500/10'
            onClick={() => setSelectedUser(null)}
            aria-label='Close chat'
          >
            <X />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
