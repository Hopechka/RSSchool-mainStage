import React, {  useRef } from 'react';
// import { useWinnersTable } from '../hooks/winners';
// import { useWinnersTable } from '../hooks/winners';
import { ICar, IdAndTime } from '../types';


interface ShowWinnerProps {
  winner: IdAndTime[]
  cars:ICar[]
  raceSwitcher:boolean
}

export function ShowWinner({ winner, cars, raceSwitcher }:ShowWinnerProps) {
  const phraseRef = useRef('No winners');
  const styleRef = useRef('none');
  //   const { addWinner } = useWinnersTable();

  
  if (!raceSwitcher) {
    styleRef.current = 'none';
  }

  
  if (winner.length > 0 && raceSwitcher) {
    const car = cars.filter(item=>item.id === winner[0].id);
    // console.log('car: ', car);
    phraseRef.current = `CAR NAME ${car[0].name }(id: ${winner[0].id}) WON! Best time:  ${(winner[0].time / 2160 ).toFixed(2)} s`;
    styleRef.current = 'inline-block';
    // addWinner({ id:winner[0].id, time:((winner[0].time / 2160 ).toFixed(2)), wins: 1 }); 
    
    // useEffect(()=>{
    //   addWinner({ id:winner[0].id, time:((winner[0].time / 2160 ).toFixed(2)), wins: 1 }); 

    
    // }, []);
  } else {phraseRef.current = 'No winners';}
  
  return (
    <div className='car-race-winner' style={{ display: `${styleRef.current}` }}>
       {phraseRef.current}
        </div>
       
  );
}