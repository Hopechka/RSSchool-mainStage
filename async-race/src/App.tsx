import React  from 'react';
import './App.css';
import { Navigation } from './components/Navigation';
import { GaragePage } from './pages/GaragePage';
import { ScorePage } from './pages/ScorePage';


function App() {



  return (
      <>
        <Navigation />
        <GaragePage />
        <ScorePage/>
      </> 
  );
}
  
export default App;

