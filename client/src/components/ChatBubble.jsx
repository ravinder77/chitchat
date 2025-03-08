import React from 'react';
import clsx from 'clsx'; // Optional for conditional classes
import { useAuthStore } from '../store/useAuthStore';
import { useChatStore } from '../store/useChatStore';
import { motion } from 'framer-motion'; // Optional for animations

const ChatBubble = ({ message }) => {
  const { authUser } = useAuthStore();
  const { selectedUser } = useChatStore();

  const isSender = message?.senderId === authUser?._id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={clsx(
        'flex items-end gap-2 w-full',
        isSender ? 'justify-end' : 'justify-start'
      )}
    >

      {!isSender && (
        <img
          src={selectedUser?.profilePic}
          alt='User Avatar'
          className='w-8 h-8 rounded-full'
        />
      )}


      <div className='flex flex-col gap-1.5 max-w-[85%] sm:max-w-[75%] md:max-w-md lg:max-w-lg'>
        {message.image && (
          <motion.div
            layout
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={clsx(
              'max-w-[90%] sm:max-w-[75%] md:max-w-md lg:max-w-lg px-4 py-2 rounded-lg',
              isSender ? 'rounded-br-none' : 'rounded-bl-none'
            )}
          >
            <img
              src={message.image}
              alt='Sent Image'
              className='rounded-lg max-w-[250px] w-full object-cover mb-2'
            />
          </motion.div>
        )}

        {message.text && (
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.1 }}
            className={clsx(
              'px-2 py-2 rounded-lg text-sm shadow-md overflow-hidden',
              'whitespace-normal break-words overflow-hidden inline-block', // Fix wrapping issue
              'min-w-fit sm:min-w-[120px]',
              'max-w-[90%] sm:max-w-[75%] md:max-w-md lg:max-w-lg', // Adaptive width
              isSender
                ? 'bg-pink-400 text-white rounded-br-none'
                : 'bg-purple-400 text-white rounded-bl-none'
            )}
          >
            <p className='text-sm leading-relaxed'>{message.text}</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ChatBubble;
