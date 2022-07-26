import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Editor from './pages/Editor/Editor'
import WorkManager from './pages/workmanager/index.jsx'
import App from './App'
import './index.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
  <HashRouter>
    <Routes>
      <Route path='/' element={<App />} >
        <Route path='/' element={<WorkManager />} />
        <Route path='editor' element={< Editor />} />
      </Route>
    </Routes>
  </HashRouter>
);