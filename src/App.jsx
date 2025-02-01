// App.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import "./App.css";
import SideBar from "./pages/SideBar";
import Home from "./pages/Home";
import PomodoroTimer from "./pages/PomodoroTimer";
import AnalogClock from "./pages/AnalogClock";
import Todo from "./pages/Todo";
import Footer from "./pages/Footer";

function VideoMessage() {
  return (
    <div className="video-message">
      <h5>
        <span className="typed-text typing-cursor">Hi! I am Xippo</span>
      </h5>
      <p>Let's Boost your Productivity together</p>
    </div>
  );
}

function App() {
  return (
    <>
      <div className="App">
        <SideBar />
        <div className="content">
          <Routes>
            <Route path="/" element={<><Home /><AnalogClock /></>} />
            <Route path="/todo" element={<><Todo /><AnalogClock /></>} />
            <Route path="/pomodoro" element={<><PomodoroTimer /><AnalogClock /></>} />
            <Route path="*" element={<div>not found</div>} />
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
