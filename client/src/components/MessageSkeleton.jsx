import React from 'react';

const MessageSkeleton = () => {
  return (
    <div className="flex-1 flex flex-col p-4 space-y-4 overflow-y-auto">
      {/* Simulating multiple messages with a full-height effect */}
      {Array.from({ length: 7 }).map((_, index) => (
        <div
          key={index}
          className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
        >
          {/* Avatar (only for received messages) */}
          {index % 2 === 0 && (
            <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse mr-2"></div>
          )}

          {/* Chat bubble skeleton */}
          <div
            className={`flex flex-col space-y-2 p-3 rounded-lg shadow-md ${
              index % 2 === 0
                ? 'bg-gray-300 text-black rounded-bl-none'
                : 'bg-gray-400 text-white rounded-br-none'
            }`}
            style={{
              minWidth: '150px',
              maxWidth: '75%',
              height: index % 3 === 0 ? '70px' : '50px',
            }}
          >
            <div className="w-full h-4 bg-gray-400 rounded-md animate-pulse"></div>
            <div className="w-3/4 h-4 bg-gray-400 rounded-md animate-pulse"></div>
          </div>

          {/* Avatar for sent messages */}
          {index % 2 !== 0 && (
            <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse ml-2"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;
