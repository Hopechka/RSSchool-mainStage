import { ICar, Winners } from '../types';
import axios, { AxiosError } from 'axios';
import { useEffect,  useRef,  useState } from 'react';
import { getPageCount } from '../utils/pages';





// Работа с логикой
export function useWinnersTable() { 

  const [winners, setWinners] = useState<Winners[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  //   const [allCarsList, setAllCarsList] = useState<ICar[]>([]);
  const allCarsListRef = useRef<ICar[]>([]);

 

  

  const limit = 5;
    
  async function fetchWinners( p:number) {
    setPage(p);
    try {
      setError('');
      setLoading(true);
      const response = await axios.get<Winners[]>(`http://127.0.0.1:3000/winners?_sort=id&_order=asc&_limit=${limit}&_page=${p}`);
      setWinners(response.data);
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


  
  function addWinner(winner:Winners ) {
    // console.log('addwinner:', winner);
    setWinners(prev=>[...prev, winner]);
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
    // setAllCarsList(response.data);
    allCarsListRef.current = response.data;
    // console.log('response.data(getAllCarsList): ', response.data);
    
  }
  useEffect(()=>{
    getAllCarsList();

  }, [allCarsListRef]);

  return { addWinner, winners, loading, error, totalCount, totalPages, changePage, getAllCarsList, allCarsListRef };
}

 