import React from 'react'
import Sidebar from './components/Sidebar'
import CanvasEditor from './components/CanvasEditor'
import SettingsPanel from './components/SettingsPanel'
import Toolbar from './components/Toolbar'

const App = () => {
  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      <div className="flex-1 relative">
        <Toolbar />
        <CanvasEditor />
        <SettingsPanel />
      </div>
    </div>
  )
}

export default App