import React from 'react'
import './App.scss'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavigationBar from './components/NavigationBar/NavigationBar'
import Editor from './pages/editor/Editor'
import WorkManager from './pages/workmanager/index.jsx'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<WorkManager />} />
        <Route path='/editor' element={< Editor />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
