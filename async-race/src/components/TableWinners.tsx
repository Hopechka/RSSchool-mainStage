import React from 'react';
import { useWinnersTable } from '../hooks/winners';
import { Winners } from '../types';

interface TableWinnersProps {
  winner:Winners
    
}

export function TableWinners({ winner }:TableWinnersProps) {
  const { allCarsListRef } = useWinnersTable();
  
  console.log('winner(TableWinners): ', winner);
  console.log('allCarsList(TableWinners): ', allCarsListRef.current);
  //   const car = allCarsListRef.current.filter(item=>item.id === winner[0].id);
  //   console.log('car in TableWinners', car);

  return (

    

 <tbody> 
 <tr> 
  <td>1</td>
  <td>{winner.id}</td>
  <td>name</td>
  <td>{winner.wins}</td>
  <td>{winner.time}</td>
 </tr>
 </tbody>


  );
}