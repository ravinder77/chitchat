import { MessageSquare } from 'lucide-react';
import React from 'react';

const NoChatSelected = () => {
  return (
    <div className='w-full flex flex-1 flex-col items-center justify-center p-16 '>
      <div className='max-w-md text-center space-y-6'>
        <div className='flex justify-center gap-4 mb-4'>
          <div className='relative'>
            <div className='size-16 rounded-xl flex items-center justify-center animate-bounce bg-amber-100'>
              <MessageSquare className='size-8 text-gray-600' />
            </div>
          </div>
        </div>
        <h2 className='text-2xl font-medium'>Welcome to Chitchat</h2>
        <p className='text-zinc-500/60'>Select a conversation to start chatting.</p>
      </div>
    </div>
  );
};

export default NoChatSelected;
