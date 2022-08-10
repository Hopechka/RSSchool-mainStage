import React, { useRef } from 'react';
import { ICar, Winners } from '../types';
import { ReactComponent as CarSvg }  from '../assets/images/car-05.svg';

interface TableWinnersProps {
  winner:Winners
 
  allCarsList:ICar[]
  index:number
  page:number
}

export function TableWinners({ winner, allCarsList, index, page }:TableWinnersProps) {
  const numberRef = useRef('1');

  const car = allCarsList.filter(item=>item.id === winner.id);

 
  if (page === 1) {numberRef.current = index.toString();} else {
    if (index < 10) {numberRef.current = page.toString() + index.toString();} else {numberRef.current = page.toString() + '0';}
  }
  


  return (
    
 <tr> 
  <td>{numberRef.current}</td>
  <td>
  <CarSvg className='table-svg' style={{ fill: `${car[0].color}` || 'red' }}/>
    </td>
  <td>{car[0].name || 'none'}</td>
  <td>{winner.wins}</td>
  <td >{winner.time}</td>
 </tr>



  );
}