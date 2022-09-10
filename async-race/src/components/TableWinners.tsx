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
  const colorRef = useRef('red');
  const nameRef = useRef('none');

  const car = allCarsList.filter(item=>item.id === winner.id);
  if (car.length !== 0) {
    nameRef.current = car[0].name;
    colorRef.current = car[0].color;
  } else {
    nameRef.current = 'none';
    colorRef.current = 'red';
  }

 
  if (page === 1) {numberRef.current = index.toString();} else {
    if (index < 10) {numberRef.current = page.toString() + index.toString();} else {numberRef.current = page.toString() + '0';}
  }
  


  return (
    
 <tr> 
  <td>{numberRef.current}</td>
  <td>
  <CarSvg className='table-svg' style={{ fill: `${colorRef.current}` }}/>
    </td>
  <td>{nameRef.current}</td>
  <td>{winner.wins}</td>
  <td >{winner.time}</td>
 </tr>



  );
}