import React, { useContext } from 'react';
import { ModalContext } from '../context/ModalContext';


// const localPath = '/hopechka-JSFE2022Q1/async-race-build';
// const localPath = '/';

export function Navigation() {
  const { showScreenGarage, showScreenScore, screenGarageOn, screenGarageOff } = useContext(ModalContext);
  
  
  function handleScreenGarage(event:React.FormEvent) {
    event.preventDefault();
    showScreenGarage();
    screenGarageOn();
    

  
  }
  function handleScreenScore(event:React.FormEvent) {
    event.preventDefault();
    showScreenScore();
    screenGarageOff();
 
  }

  return (
    <nav className="navigation">
        <button className="button middle-btn-yellow" onClick = {handleScreenGarage} > 
        <a href="garage">TO GARAGE</a>
        </button>
        <button className="button middle-btn-yellow" onClick = {handleScreenScore} > 
        <a href="score">TO WINNERS</a>
        </button>
      </nav>
  );
}
