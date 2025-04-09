import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { useChatStore } from '../store/useChatStore';
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import MessageSkeleton from './MessageSkeleton';
import ChatBubble from './ChatBubble';
import { formatMessage } from '../utils/helpers';
import { useAuthStore } from '../store/useAuthStore';

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();

  const {authUser} = useAuthStore();

  const chatEndRef = React.useRef(null);
  const chatContainerRef = React.useRef(null);

  const initialLoadRef = useRef(true);
  const prevMessagesLengthRef = React.useRef(messages.length);

  useEffect(() => {
    if (!selectedUser?._id || !authUser) return;

    getMessages(selectedUser._id);
    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser?._id, getMessages]);

  useEffect(() => {
    initialLoadRef.current = true;
  }, [selectedUser?._id]);

  // Scroll handling
  useLayoutEffect(() => {
    if (!chatContainerRef.current) return;

    if (initialLoadRef.current) {
      // Immediate jump to bottom for initial load
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
      initialLoadRef.current = false;
    } else if (messages.length > prevMessagesLengthRef.current) {
      // Smooth scroll for new messages
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    prevMessagesLengthRef.current = messages.length;
  }, [messages]);

  if (isMessagesLoading)
    return (
      <div className='flex flex-1 flex-col w-full h-full max-h-screen'>
        <ChatHeader />
        <div className='flex-1 overflow-auto p-4'>
          <MessageSkeleton />
        </div>
        <MessageInput />
      </div>
    );

  return (
    <div className='flex flex-1 flex-col w-full h-full max-h-screen pt-20 sm:pt-0'>
      <ChatHeader />

      <div
        ref={chatContainerRef}
        className='flex-1 overflow-y-auto p-4 space-y-4 min-h-0'
      >
        {messages.map((message, index) => {
          const showTimestamp =
            index === 0 ||
            formatMessage(message.createdAt) !==
              formatMessage(messages[index - 1]?.createdAt);

          return (
            <div key={message._id} className='space-y-1'>
              {/* Show timestamp only if necessary */}
              {showTimestamp && (
                <time className='block text-center text-sm text-gray-500 mb-4'>
                  {formatMessage(message.createdAt)}
                </time>
              )}
              <ChatBubble message={message} />
            </div>
          );
        })}
        {/* auto scroll to bottom */}
        <div ref={chatEndRef} />
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
