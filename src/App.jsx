import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Sider from './components/sider'
import ChatList from './components/ChatList'
import Header from './components/Header'
function App() {
  return (
    <div>

   <Header/>
    <div className="relative h-screen w-screen bg-gray-100">
      <Sider />
      
     
      <div className="pl-20 p-4">
        <ChatList />
      </div>
    </div>
    </div>
  );
}

export default App;
