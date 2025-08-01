import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Sider from './components/sider'
import ChatList from './components/ChatList'
import Header from './components/Header'
import Groups from './components/Groups'
import Chat from './components/Chat'

function App() {
 const [selectedUserId, setSelectedUserId] = useState(null);

  return (
    <div>
      <Header />

      <div className="relative h-screen w-screen bg-gray-100 flex">
        <Sider />

        {/* Wrap both columns in a flex row */}
        <div className="pl-20  flex gap-5">
          {/* Left Column (ChatList + Groups) */}
          <div className="flex flex-col gap-1 w-[280px] ">
            <ChatList onUserClick={setSelectedUserId}/>
            <Groups />
          </div>

          {/* Right Column (Chat) */}
          <div className="flex-1 w-[850px]">
           <Chat selectedUserId={selectedUserId} currentUserId={5} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
