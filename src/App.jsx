import React from "react";
import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import Editor from "./pages/editor/Editor";
import WorkManager from "./pages/workmanager/WorkManager.jsx";
import MyWork from "./pages/MyWork/MyWork";
import TemplateCentre from "./pages/TemplateCentre/TemplateCentre";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WorkManager />}>
          <Route index element={<MyWork />}></Route>
          <Route path="/template" element={<TemplateCentre />}></Route>
        </Route>
        <Route path="/editor" element={<Editor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
