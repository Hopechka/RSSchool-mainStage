import React, { useContext, useRef, useState } from 'react';
import { ErrorMessage } from '../components/ErrorMessage';
import { Footer } from '../components/Footer';
import { Loader } from '../components/Loader';
import { Pagination } from '../components/Pagination';
import { TableWinners } from '../components/TableWinners';
import { ModalContext } from '../context/ModalContext';
import { useWinnersTable } from '../hooks/winners';

// interface ScorePageProps {
//   screenScore:string
// }

export function ScorePage() {
  const { loading, error, totalCount, totalPages, 
    changePage, allCarsList, sortByWins, sortByTime } = useWinnersTable();
  const [pages, setPages] = useState(1);
  const {  winnersForTable } = useContext(ModalContext);
  const sortByWinsRef = useRef(false);
  const sortByTimeRef = useRef(false);
  const sortByOrderRef = useRef('ASC');




  function handlePages(value:number) {
    setPages(value);
    changePage(value);
  }

  function raceSwitcherOff() {
    // console.log('raceSwitcherOff');
  }
  function handleSortByWins() {
    if (!sortByWinsRef.current) {
      sortByOrderRef.current = 'desc';
      sortByWinsRef.current = true;
    } else {
      sortByOrderRef.current = 'asc';
      sortByWinsRef.current = false;
      
    }
    sortByWins('wins', sortByOrderRef.current);
    
  }
  function handleSortByTime() {
    if (!sortByTimeRef.current) {
      sortByOrderRef.current = 'desc';
      sortByTimeRef.current = true;
    } else {
      sortByOrderRef.current = 'asc';
      sortByTimeRef.current = false;
        
    }
    sortByTime('time', sortByOrderRef.current);
  }

  return ( 
  
  <div className='container' id='score'>
    <h1>{`Winners (${totalCount})`}</h1>
    <h2>{`Page (${pages})`}</h2>
    <table>
  <thead> 
  <tr> 
    <th>Number</th>
    <th>Car</th>
    <th>Name</th>
    <th  onClick={handleSortByWins} >Wins</th>
    <th onClick={handleSortByTime}>Best time(seconds)</th>
  </tr>
  </thead>
  <tbody>
  {winnersForTable.map((winner, index) => (
          <TableWinners winner={winner} allCarsList ={allCarsList } 
          index={index + 1} page={pages} key={winner.id} /> 
  ))}
  </tbody> 
   
    </table>
  {loading && <Loader/>}
  {error && <ErrorMessage error={error}/>}
  <Pagination  handlePages={handlePages} totalPages={totalPages} totalCount = {totalCount} raceSwitcherOff={raceSwitcherOff}/>
  <Footer/>
  </div>
  );
}

