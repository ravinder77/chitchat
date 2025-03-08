import ChatContainer from '../components/ChatContainer';
import NoChatSelected from '../components/NoChatSelected';
import Sidebar from '../components/Sidebar';
import { useChatStore } from '../store/useChatStore';

const Home = () => {
  const { selectedUser} = useChatStore();
  return (
    <section className='flex items-center justify-center min-h-screen px-2'>
      <div className='max-w-6xl w-full bg-amber-100 h-screen md:h-[80vh] rounded-lg shadow-lg flex'>
        <div className='hidden md:flex'>
          <Sidebar />
        </div>
        <div className='flex flex-1 h-full w-full'>
          {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
        </div>
      </div>
    </section>
  );
};

export default Home;
