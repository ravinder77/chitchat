import React, { useEffect, useState } from 'react';
import { useChatStore } from '../store/useChatStore';
import SidebarSkeleton from './SidebarSkeleton';
import { Check, Users } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import CheckboxInput from './CheckBoxInput';

const Sidebar = () => {
  const { users, getUsers, isUsersLoading, selectedUser, setSelectedUser } =
    useChatStore();

  const { onlineUsers } = useAuthStore();
  const [showOnlineUsers, setShowOnlineUsers] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUsersLoading) return <SidebarSkeleton />;

  const filteredUsers = showOnlineUsers
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  return (
    <aside className='h-full w-full md:w-20 lg:w-72 border-r border-amber-300 flex flex-col pt-20 sm:pt-0'>
      <div className='sticky top-0 bg-amber-100 border-b border-amber-300 w-full p-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <Users className='size-6 text-gray-600' />
            <span className='font-medium block md:hidden lg:block'>Contacts</span>
          </div>
          <div className='flex md:hidden lg:flex items-center gap-2 text-sm'>
            ({onlineUsers.length - 1} online)
          </div>
        </div>

        <div className='mt-3 flex md:hidden lg:flex items-center gap-2'>
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

            <div className='block md:hidden lg:block text-left flex-1 min-w-0'>
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
    </aside>
  );
};

export default Sidebar;
