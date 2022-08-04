import { useEffect, useState } from 'react';
import { ICar } from '../types';
import axios, { AxiosError } from 'axios';
import { getPageCount } from '../utils/pages';



// Работа с логикой
export function useCars() {
  const [cars, setCars] = useState<ICar[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [totalCount, setTotalCount] = useState(0);
  //   const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const limit = 5;
  
  async function fetchCar( p:number) {
    setPage(p);
    try {
      setError('');
      setLoading(true);
      const response = await axios.get<ICar[]>('http://127.0.0.1:3000/garage', { params:{ _limit:limit, _page:p } });
      setCars(response.data);
      setTotalCount(+response.headers['x-total-count']);
      setTotalPages(getPageCount(+response.headers['x-total-count'], limit));
      setLoading(false);

      console.log('response.headers[x-total-count]: ', response.headers['x-total-count']);
     
      
      
  
    } catch (e:unknown) {
      const err = e as AxiosError;
      setLoading(false);
      setError(err.message);
    }


  }

  function addCar(car:ICar ) {
    // console.log('addCar:', car);
    setCars(prev=>[...prev, car]);
    fetchCar(page);
  }

  function removeCar(idCar: number) {
    const filteredCars = cars.filter(({ id }) => id !== idCar);
    setCars(filteredCars);
    fetchCar(page);
  }

  
  function updateCar() {
    fetchCar(page);
 
  }

  function changePage( p:number) {
    console.log('p: ', p);
    fetchCar(p);
  }
  

  useEffect(()=>{
    fetchCar(page);

  }, []);



  return { cars, error, loading, addCar, updateCar, removeCar, totalCount, changePage, totalPages, limit };
}
