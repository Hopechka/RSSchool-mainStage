import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { GaragePage } from './pages/GaragePage';
import { ScorePage } from './pages/ScorePage';


function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<GaragePage />} />
        <Route path="/about" element={<ScorePage />} />
      </Routes>
    </>
  );
}

export default App;
