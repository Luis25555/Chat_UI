import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Sidebar from './components/sider'

function App() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 bg-gray-100 p-4">
        {/* Other components will go here */}
        <h1 className="text-xl font-bold">Welcome to Chat UI</h1>
      </div>
    </div>
  );
}

export default App;


