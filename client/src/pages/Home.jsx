import { useEffect, useLayoutEffect, useState } from 'react';
import ChatContainer from '../components/ChatContainer';
import NoChatSelected from '../components/NoChatSelected';
import Sidebar from '../components/Sidebar';
import { useChatStore } from '../store/useChatStore';
import { ArrowLeft, MenuIcon } from 'lucide-react';

const Home = () => {
  const { selectedUser } = useChatStore();
  const [isMobile, setIsMobile] = useState(false);
  const [showChat, setShowChat] = useState(false);

  useLayoutEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setShowChat(false);
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (selectedUser && isMobile) {
      setShowChat(true);
    }
  }, [selectedUser, isMobile]);

  const handleBackClick = () => {
    setShowChat(false);
  };

  return (
    <section className='flex flex-1 items-center justify-center min-h-screen sm:px-2'>
      <div className='max-w-6xl w-full bg-amber-100 h-[calc(100vh-1rem)] md:h-[80vh] rounded-lg shadow-lg flex relative'>
        <div className={`${isMobile && showChat ? 'hidden' : 'flex w-full md:w-auto'} bg-amber-100 z-20`}>
          <Sidebar />
        </div>
        
        <div className={`flex flex-1 h-full w-full ${isMobile && !showChat ? 'hidden' : 'block'}`}>
          {isMobile && showChat && (
            <button
              onClick={handleBackClick}
              className="absolute top-4 left-4 z-30 p-2 bg-amber-200 rounded-md"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
          )}
          {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
        </div>
      </div>
    </section>
  );
};

export default Home;
