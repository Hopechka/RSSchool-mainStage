import React, {   useRef } from 'react';
import { ICar, IdAndTime } from '../types';


interface ShowWinnerProps {
  winner: IdAndTime
  cars:ICar[]
  raceSwitcher:boolean
//   winnersRef:boolean
}

export function ShowWinner({ winner, cars, raceSwitcher }:ShowWinnerProps) {
  const phraseRef = useRef('No winners');

  if (raceSwitcher) {
    const car = cars.filter(item=>item.id === winner.id);
    phraseRef.current = `CAR NAME ${car[0].name }(id: ${winner.id}) WON! Best time:  ${winner.time} s`;

  } 

  return (
    <div className='car-race-winner'>
       {phraseRef.current}
        </div>
       
  );
}