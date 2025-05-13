import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { useChatStore } from '../store/useChatStore';
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import MessageSkeleton from './MessageSkeleton';
import ChatBubble from './ChatBubble';
import { formatMessage } from '../utils/helpers';
import { useAuthStore } from '../store/useAuthStore';

const ChatContainer = ({ onBack }) => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();

  const { authUser } = useAuthStore();
  const chatEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const initialLoadRef = useRef(true);
  const prevMessagesLengthRef = useRef(messages.length);

  useEffect(() => {
    if (!selectedUser?._id || !authUser) return;

    getMessages(selectedUser._id);
    subscribeToMessages();

    return () => unsubscribeFromMessages();
    // Add subscribeToMessages and unsubscribeFromMessages to dependencies for safety
  }, [
    selectedUser?._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
    authUser,
  ]);

  useEffect(() => {
    initialLoadRef.current = true;
  }, [selectedUser?._id]);

  // Scroll handling
  useLayoutEffect(() => {
    if (!chatContainerRef.current) return;

    if (initialLoadRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
      initialLoadRef.current = false;
    } else if (messages.length > prevMessagesLengthRef.current) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    prevMessagesLengthRef.current = messages.length;
  }, [messages]);

  if (isMessagesLoading)
    return (
      <div className='flex flex-1 flex-col w-full h-full'>
        <ChatHeader onBack={onBack} />
        <div className='flex-1 overflow-auto p-4'>
          <MessageSkeleton />
        </div>
        <MessageInput />
      </div>
    );

  return (
    <div className='flex flex-1 flex-col w-full h-full sm:pt-0 bg-white relative'>
      <ChatHeader onBack={onBack} />
      <div
        ref={chatContainerRef}
        className='flex-1 overflow-y-auto px-1 py-2 sm:p-4 space-y-4 min-h-0 overscroll-contain'
        style={{
          height: 'calc(100dvh - 112px - 72px)',
          minHeight: '0',
          paddingBottom: '112px',
          WebkitOverflowScrolling: 'touch',
          scrollPaddingBottom: '96px',
        }}
      >
        {messages.map((message, index) => {
          const showTimestamp =
            index === 0 ||
            formatMessage(message.createdAt) !==
              formatMessage(messages[index - 1]?.createdAt);

          return (
            <div key={message._id} className='space-y-1'>
              {showTimestamp && (
                <time className='block text-center text-sm text-gray-500 mb-4'>
                  {formatMessage(message?.createdAt)}
                </time>
              )}
              <ChatBubble message={message} />
            </div>
          );
        })}
        <div ref={chatEndRef} />
      </div>
      <div
        className='sticky bottom-0 left-0 w-full px-1 py-3 sm:px-4 z-20 border-t border-gray-200 bg-white'
        style={{
          WebkitTransform: 'translateZ(0)',
          touchAction: 'manipulation',
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
          boxShadow: '0 -2px 8px rgba(0,0,0,0.03)',
        }}
      >
        <MessageInput />
      </div>
    </div>
  );
};

export default ChatContainer;
