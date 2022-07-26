import React from 'react'
import { Outlet } from 'react-router'
import './App.scss'
import NavigationBar from './components/NavigationBar/NavigationBar'

function App() {

  return (
    <div className="App">
      <NavigationBar />
      <div className='App_render'>
        <Outlet />
      </div>
    </div>
  )
}

export default App
