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
import { AuthRoute } from "./components/AuthRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<AuthRoute><WorkManager /></AuthRoute>}>
            <Route index element={<MyWork />}></Route>
            <Route path="/template" element={<TemplateCentre />}></Route>
          </Route>
          <Route path="/editor" element={<AuthRoute><Editor /></AuthRoute>} />
        <Route path="/login" element={<Login domain="lowcode.wyy.ink" />} />
        <Route
          path="/register"
          element={<Register domain="lowcode.wyy.ink" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
