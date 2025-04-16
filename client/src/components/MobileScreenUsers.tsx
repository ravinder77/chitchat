import React, { useState } from 'react';
import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';
import { Users } from 'lucide-react';

const MobileScreenUsers: React.FC = () => {
  const { users, selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineUsers, setShowOnlineUsers] = useState(false);

  const filteredUsers = showOnlineUsers
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  return (
    <div className='h-full w-full flex flex-col'>
      <div className='sticky top-0 bg-amber-100 border-b border-amber-300 w-full p-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <Users className='size-6 text-gray-600' />
            <span className='font-medium'>Contacts</span>
          </div>
          <div className='flex items-center gap-2 text-sm'>
            ({onlineUsers.length - 1} online)
          </div>
        </div>

        <div className='mt-3 flex items-center gap-2'>
          <label className='cursor-pointer flex items-center gap-2'>
            <input
              type='checkbox'
              checked={showOnlineUsers}
              onChange={(e) => setShowOnlineUsers(e.target.checked)}
              className='rounded'
            />
            <span className='text-sm'>Show online users</span>
          </label>
        </div>
      </div>

      <div className='overflow-y-auto flex-1 py-2'>
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            aria-label={`Select ${user.fullName}`}
            onClick={() => setSelectedUser(user)}
            className={`w-full p-4 flex items-center gap-4 hover:bg-amber-200 transition-colors ${
              selectedUser?._id === user._id ? 'bg-amber-200' : ''
            }`}
          >
            <div className='relative flex-shrink-0'>
              <img
                src={user.profilePic || '/avatar.jpg'}
                alt={user.fullName || 'user profile'}
                className='size-12 rounded-full object-cover border-2'
              />
              {onlineUsers.includes(user._id) && (
                <span className='absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900' />
              )}
            </div>

            <div className='text-left flex-1 min-w-0'>
              <div className='font-medium truncate'>{user.fullName}</div>
              <div className='text-sm text-zinc-400'>
                {onlineUsers.includes(user._id) ? 'Online' : 'Offline'}
              </div>
            </div>
          </button>
        ))}
        {filteredUsers.length === 0 && (
          <div className='text-center text-zinc-500 py-4'>No Online Users</div>
        )}
      </div>
    </div>
  );
};

export default MobileScreenUsers;
