import { ICar, IdAndTime, Winners } from '../types';
import axios, { AxiosError } from 'axios';
import { useContext, useEffect,  useRef,  useState } from 'react';
import { getPageCount } from '../utils/pages';
import { ModalContext } from '../context/ModalContext';





// Работа с логикой
export function useWinnersTable() { 

  const [winners, setWinners] = useState<Winners[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [allCarsList, setAllCarsList] = useState<ICar[]>([]);
  const winnerRef = useRef<IdAndTime>({});
  const {  putWinnersForTable } = useContext(ModalContext);

 

  //   console.log('winners(useWinnersTable): ', winners);

  const limit = 10;
    
  async function fetchWinners(p:number, sort = 'id', order = 'asc') {
    setPage(p);
    try {
      setError('');
      setLoading(true);
      const response = await axios.get<Winners[]>(`http://127.0.0.1:3000/winners?_sort=${sort}&_order=${order}&_limit=${limit}&_page=${p}`);
      setWinners(response.data);
      putWinnersForTable(response.data);
      setTotalCount(+response.headers['x-total-count']);
      setTotalPages(getPageCount(+response.headers['x-total-count'], limit));
      setLoading(false);
  
      //   console.log('response.headers[x-total-count](fetchWinners): ', response.headers['x-total-count']);
      //   console.log('response.data(fetchWinners): ', response.data);
    
    } catch (e:unknown) {
      const err = e as AxiosError;
      setLoading(false);
      setError(err.message);
    }
  
  
  }
  function sortByWins(sort:string, order:string) {
    fetchWinners(page, sort, order);
  }
  function sortByTime(sort:string, order:string) {
    fetchWinners(page, sort, order);
  }
 
  
  function addWinner(winner:IdAndTime) {
    setWinners(prev=>[...prev, winner]);
    putWinnersForTable(winners);
    fetchWinners(page); 
  }

  function updateWinner(winner:IdAndTime) {
    const newWinners =  winners.map(item => {
      if (item.id === winner.id) {
        item.wins = +item.wins + winner.wins;
        if (winner.time < item.time) { item.time = winner.time; }    
      }
      return item;
    } );
    // console.log('newWinners: ', newWinners);
    setWinners(newWinners);
    putWinnersForTable(newWinners);

    fetchWinners(page); 
  }

  //   function forTry(winner:IdAndTime[]) {
  // if (winner.length === 1) {
  //   return winner[0];
  // }
  //   }
  async function deleteWinner(id:number) {
    const repeatWin = winners.filter(item=> item.id === id);
    console.log('repeatWin: ', repeatWin);
    if (repeatWin.length > 0) {
      await axios.delete<IdAndTime>(`http://127.0.0.1:3000/winners/${id}`);
      const filteredWin = winners.filter(({ item }) => item !== id);
      setWinners(filteredWin);
      putWinnersForTable(filteredWin);
    }
    
  }

  const data = { wins: 0, time: 0 };
  async function updateWinnerOnServer(winner:IdAndTime, winnerFromData:Winners) {  
    data.wins = +winnerFromData.wins + 1;
    data.time = winner.time > winnerFromData.time ? +winnerFromData.time : winner.time;
    // console.log('data updateWinnerOnServer: ', data);
    const headers = {
      'Content-Type': 'application/json',
    };
    const response = await axios.put<IdAndTime>(`http://127.0.0.1:3000/winners/${winner.id}`, data, {
      headers: headers,
    });
    winnerRef.current = response.data;
    updateWinner(response.data);

  }
  async function addWinnerOnServer(winnerInstant:IdAndTime) {
    const response = await axios.post<IdAndTime>('http://127.0.0.1:3000/winners', winnerInstant);
    winnerRef.current = response.data;
    addWinner(response.data);
  }

  async function createWinner(winner:IdAndTime) {
    const win =  winners.filter(item=>item.id === winner.id);
    if (win.length !== 0) {updateWinnerOnServer(winner, win[0]);} else {addWinnerOnServer(winner); }
  }
  
  function updateTable() {
    fetchWinners(page);
 
  }
  


  useEffect(()=>{
    fetchWinners(page);
    
  }, []);

  function changePage( p:number) {
    // console.log('p: ', p);
    fetchWinners(p);
  }

  async function getAllCarsList() { 
    const response = await axios.get<ICar[]>('http://127.0.0.1:3000/garage');
    setAllCarsList(response.data);
    return response.data; 
  }
  useEffect(()=>{
    getAllCarsList();

  }, [winners]);


  return { addWinner,  winners, loading, error, totalCount, totalPages, changePage, 
    getAllCarsList, allCarsList, createWinner, winnerRef, updateTable, deleteWinner,
    sortByWins, sortByTime };
}

 