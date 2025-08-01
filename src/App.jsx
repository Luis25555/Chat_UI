import { useEffect, useState } from 'react';
import './App.css';
import Sider from './components/sider';
import ChatList from './components/ChatList';
import Header from './components/Header';
import Groups from './components/Groups';
import Chat from './components/Chat';
import Profile from './components/Profile';
import User from './components/User';

function App() {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showChatList, setShowChatList] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showMobileProfile, setShowMobileProfile] = useState(false);
   const [showProfile, setShowProfile] = useState(false);
  // Watch screen resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      <Header />

      <div className="relative h-screen w-screen bg-gray-100 flex">
        <Sider showMobileProfile={showMobileProfile}
          onChatIconClick={() => {
            if (isMobile) setShowChatList(prev => !prev);
          }}
        />

        <div className="pl-20 flex gap-5">
          {/* Conditionally show chat list based on screen size */}
          {(showChatList || !isMobile) && (
            <div className="flex flex-col gap-1 w-[280px] transition-all duration-300">
              <ChatList
  onUserClick={(id) => {
    setSelectedUserId(id);
     setShowProfile(true);
     setShowMobileProfile(false);
    if (isMobile) setShowChatList(false); // auto-close on mobile
  }}
/>
              <Groups />
            </div>
          )}

          {/* Right Column */}
          <div className="flex-1 w-[850px]">
          <Chat isMobile={isMobile} selectedUserId={selectedUserId} currentUserId={5} onProfileClick={() => setShowProfile(true)}  onProfilePicClick={() => setShowMobileProfile(true)}/>
          <div className="absolute right-0 top-0 h-full">
          {showProfile && (
  <Profile
    userId={selectedUserId}
      onCloseProfile={() => {
    setShowProfile(false);
    setShowMobileProfile(false);
  }}
    showMobileProfile={showMobileProfile}
  />
)}
          </div>
          </div>
        </div>
      </div>

      <div>
        <User showProfile = {showProfile}/>
      </div>
    </div>
  );
}

export default App;
