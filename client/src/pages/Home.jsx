import { useEffect, useState } from 'react';
import ChatContainer from '../components/ChatContainer';
import NoChatSelected from '../components/NoChatSelected';
import Sidebar from '../components/Sidebar';
import { useChatStore } from '../store/useChatStore';

import useIsMobile from '../hooks/useIsMobile';

const Home = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const isMobile = useIsMobile();
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    if (selectedUser) {
      setShowChat(true);
    }
  }, [selectedUser]);

  const handleChatClose = () => {
    setSelectedUser(null);
    setShowChat(false);
  };

  return (
    <section className='flex flex-1 items-center justify-center min-h-[calc(100vh-64px)] backdrop-blur-sm'>
      <div className='max-w-6xl w-full h-full md:h-[80vh] shadow-2xl flex relative overflow-hidden bg-[#eae2b7]'>
        {isMobile ? (
          showChat && selectedUser ? (
            <div className='w-full h-full'>
              <ChatContainer onBack={handleChatClose} />
            </div>
          ) : (
            <div className='w-full h-full'>
              <Sidebar />
            </div>
          )
        ) : (
          <>
            <div className='hidden md:block h-full'>
              <Sidebar />
            </div>
            <div className='flex-1 h-full'>
              {selectedUser ? (
                <ChatContainer onBack={handleChatClose} />
              ) : (
                <NoChatSelected />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
