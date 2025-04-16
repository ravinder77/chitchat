import { useEffect, useLayoutEffect, useState } from 'react';
import ChatContainer from '../components/ChatContainer';
import NoChatSelected from '../components/NoChatSelected';
import Sidebar from '../components/Sidebar';
import { useChatStore } from '../store/useChatStore';

import useIsMobile from '../hooks/useIsMobile';

const Home = () => {
  const { selectedUser, setSelectedUser} = useChatStore();
  const isMobile = useIsMobile();
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    if (selectedUser) {
      setShowChat(true);
    }
  }, [selectedUser]);

 
  const handleBackClick = () => {
   setSelectedUser(null); 
   setShowChat(false);
  };

  return (
    <section className='flex flex-1 items-center justify-center min-h-[calc(100vh-64px)]'>
      <div className='max-w-6xl w-full h-[calc(100vh-80px)] md:h-[80vh] shadow-lg flex relative overflow-hidden bg-[#003049]'>
        <div
          className={`absolute md:relative left-0 top-0 h-full 
            flex w-full md:w-auto z-20 
            transition-transform duration-300 ease-in-out ${
            isMobile && showChat ? '-translate-x-full' : 'translate-x-0'
          }`}
        >
          <Sidebar />
        </div>

        <div
          className={`flex flex-1 h-full w-full absolute md:relative left-0 top-0 
            transition-transform duration-300 ease-in-out
            ${
              isMobile && showChat ? 'translate-x-0' : 'translate-x-full'
            } 
          `}
        >
          {!selectedUser && !isMobile ? <NoChatSelected /> : <ChatContainer onBack={handleBackClick}  />}
        </div>
      </div>
    </section>
  );
};

export default Home;
