import React from 'react';
import { ICar, Winners } from '../types';
import { ReactComponent as CarSvg }  from '../assets/images/car-05.svg';

interface TableWinnersProps {
  winner:Winners
 
  allCarsList:ICar[]

}

export function TableWinners({ winner, allCarsList }:TableWinnersProps) {
  //   const numberRef = useRef(1);

  
  //   console.log('winner(TableWinners): ', winner);
  //   console.log('allCarsList(TableWinners): ', allCarsList);
  const car = allCarsList.filter(item=>item.id === winner.id);
  console.log('car in TableWinners', car);


  
  //   function plusNumber() {
  //     numberRef.current += 1;
  //   }


  return (
    
 <tr> 
  <td>{winner.id}</td>
  <td>
  <CarSvg className='table-svg' style={{ fill: `${car[0].color}` }}/>
    </td>
  <td>{car[0].name}</td>
  <td>{winner.wins}</td>
  <td>{winner.time}</td>
 </tr>



  );
}