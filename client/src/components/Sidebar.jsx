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
    <aside className='h-full min-h-screen w-full md:w-20 lg:w-72 border-r border-[#003049] flex flex-col sm:pt-0 bg-[#eae2b7]'>
      <div className='sticky top-0 border-b border-[#003049] w-full p-4 bg-[#eae2b7] md:bg-white z-10'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <Users className='size-6 text-gray-600' />
            <span className='font-medium block md:hidden lg:block'>
              Contacts
            </span>
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

      <div className='overflow-y-auto flex-1 py-2 min-h-0'>
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            aria-label={`Select ${user.fullName}`}
            onClick={() => setSelectedUser(user)}
            className={` group w-full p-4 flex items-center gap-4 hover:bg-[#003049] hover:text-[#eae2b7] transition-colors ${
              selectedUser?._id === user._id
                ? 'bg-[#003049] text-[#eae2b7]'
                : ''
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
              <div
                className={`text-sm group-hover:text-zinc-300 ${
                  selectedUser?._id === user._id
                    ? 'text-zinc-300'
                    : 'text-zinc-500'
                }`}
              >
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
