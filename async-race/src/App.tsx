import React, { useContext }  from 'react';
import './App.css';
import { Navigation } from './components/Navigation';
import { ModalContext } from './context/ModalContext';
import { GaragePage } from './pages/GaragePage';
import { ScorePage } from './pages/ScorePage';


function App() {
  const { showScreen } = useContext(ModalContext);


  return (
      <>
        <Navigation />
        {/* {showScreen && <GaragePage />} */}
        <GaragePage />
        {!showScreen && <ScorePage/>}
      </> 
  );
}
  
export default App;




