<<<<<<< HEAD
import React from 'react'
import './App.scss'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavigationBar from './components/NavigationBar/NavigationBar'
import Editor from './pages/editor/Editor'
import WorkManager from './pages/workmanager/WorkManager.jsx'
import MyWork from './pages/MyWork/MyWork'
import TemplateCentre from './pages/TemplateCentre/TemplateCentre'
import EssentialData from './pages/EssentialData/EssentialData'
=======
import React from "react";
import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import Editor from "./pages/editor/Editor";
import WorkManager from "./pages/workmanager/WorkManager.jsx";
import MyWork from "./pages/MyWork/MyWork";
import TemplateCentre from "./pages/TemplateCentre/TemplateCentre";
import Login from "./pages/Login";
import Register from "./pages/Register";
>>>>>>> 9a92dc1c44a6a51bc2d2ab0afb10cd12d844190c

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WorkManager />}>
          <Route path="/essentialdata1" element={<EssentialData />}></Route>
          <Route index element={<MyWork />}></Route>
          <Route path="/template" element={<TemplateCentre />}></Route>
        </Route>
        <Route path="/login" element={<Login domain="lowcode.wyy.ink" />} />
        <Route path="/register" element={<Register domain="lowcode.wyy.ink" />} />
        <Route path="/editor" element={<Editor />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
