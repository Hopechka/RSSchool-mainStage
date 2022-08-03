import { useEffect, useState } from 'react';
import { ICar } from '../types';
import axios, { AxiosError } from 'axios';
// import { getPageCount } from  '../utils/pages';


// Работа с логикой
export function useCars() {
  const [cars, setCars] = useState<ICar[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [totalCount, setTotalCount] = useState(0);
  //   const [totalPages, setTotalPages] = useState(0);

  

  function addCar(car:ICar) {
    console.log('addCar:', car);
    setCars(prev=>[...prev, car]);

  }
  function removeCar(idCar: number) {
    const filteredCars = cars.filter(({ id }) => id !== idCar);
    setCars(filteredCars);
  }

  
  async function fetchCar(limit = 10, page = 1) {
    try {
      setError('');
      setLoading(true);
      const response = await axios.get<ICar[]>('http://127.0.0.1:3000/garage', { params:{ _limit:limit, _page:page } });
      setCars(response.data);
      setTotalCount(+response.headers['x-total-count']);
      setLoading(false);

      console.log('response.headers[x-total-count]: ', response.headers['x-total-count']);
      
      
  
    } catch (e:unknown) {
      const err = e as AxiosError;
      setLoading(false);
      setError(err.message);
    }


  }
  
  function updateCar() {
    fetchCar();
 
  }

  function changePage( page:number, limit = 10) {
    fetchCar(limit, page);
 
  }
  

  useEffect(()=>{

    fetchCar();

  }, []);



  return { cars, error, loading, addCar, updateCar, removeCar, totalCount, changePage };
}
