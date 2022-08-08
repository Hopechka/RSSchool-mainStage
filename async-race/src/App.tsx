import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { GaragePage } from './pages/GaragePage';
import { ScorePage } from './pages/ScorePage';

// const localPath = '/hopechka-JSFE2022Q1/async-race-build';
const localPath = '/';
function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path={localPath} element={<GaragePage />} />
        <Route path={`${localPath}/score`} element={<ScorePage />} />
      </Routes>
    </>
  );
}

export default App;
