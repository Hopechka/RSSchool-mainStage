import React, { useState } from 'react';
import { ErrorMessage } from '../components/ErrorMessage';
import { Footer } from '../components/Footer';
import { Loader } from '../components/Loader';
import { Pagination } from '../components/Pagination';
import { TableWinners } from '../components/TableWinners';
import { useWinnersTable } from '../hooks/winners';


export function ScorePage() {
  const { winners, loading, error, totalCount, totalPages, changePage  } = useWinnersTable();
  const [pages, setPages] = useState(1);

  //   console.log('winners(ScorePage): ', winners);


  function handlePages(value:number) {
    setPages(value);
    changePage(value);
  }

  function raceSwitcherOff() {
    // console.log('raceSwitcherOff');
  }

  return ( 
  
  <div className='container'>
    <h1>{`Winners (${totalCount})`}</h1>
    <h2>{`Page (${pages})`}</h2>
    <table>
  <thead> 
  <tr> 
    <th>Number</th>
    <th>Car</th>
    <th>Name</th>
    <th>Wins</th>
    <th>Best time(seconds)</th>
  </tr>
  </thead>
    {winners.map((winner) => (
          <TableWinners winner={winner} key={winner.id} /> 
    ))}
    </table>
  {loading && <Loader/>}
  {error && <ErrorMessage error={error}/>}
  <Pagination  handlePages={handlePages} totalPages={totalPages} totalCount = {totalCount} raceSwitcherOff={raceSwitcherOff}/>
  <Footer/>
  </div>
  );
}

