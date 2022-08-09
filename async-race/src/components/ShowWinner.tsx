import React, {   useRef } from 'react';
import { ICar, IdAndTime } from '../types';


interface ShowWinnerProps {
  winner: IdAndTime
  cars:ICar[]
  raceSwitcher:boolean
  winnersRef:boolean
}

export function ShowWinner({ winner, cars, raceSwitcher, winnersRef }:ShowWinnerProps) {
  const phraseRef = useRef('No winners');
  const styleRef = useRef('none');

  if (!raceSwitcher) {
    styleRef.current = 'none';
  }

  if (!winnersRef && raceSwitcher) {
    const car = cars.filter(item=>item.id === winner.id);
    phraseRef.current = `CAR NAME ${car[0].name }(id: ${winner.id}) WON! Best time:  ${winner.time} s`;
    styleRef.current = 'inline-block';
  } 

  return (
    <div className='car-race-winner' style={{ display: `${styleRef.current}` }}>
       {phraseRef.current}
        </div>
       
  );
}