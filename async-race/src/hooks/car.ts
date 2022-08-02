import { useEffect, useState } from 'react';
import { ICar } from '../types';
import axios, { AxiosError } from 'axios';


// Работа с логикой
export function useCars() {
  const [cars, setCars] = useState<ICar[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  

  function addCar(car:ICar) {
    console.log('addCar:', car);
    setCars(prev=>[...prev, car]);

  }
  function removeCar(idCar: number) {
    const filteredCars = cars.filter(({ id }) => id !== idCar);
    setCars(filteredCars);
  }

  
  async function fetchCar() {
    try {
      setError('');
      setLoading(true);
      const response = await axios.get<ICar[]>('http://127.0.0.1:3000/garage?limit=5');
      setCars(response.data);
      setLoading(false);

      console.log('response.data: ', response.data);
      
      
  
    } catch (e:unknown) {
      const err = e as AxiosError;
      setLoading(false);
      setError(err.message);
    }


  }
  
  function updateCar() {
    fetchCar();
 
  }
  

  useEffect(()=>{

    fetchCar();

  }, []);



  return { cars, error, loading, addCar, updateCar, removeCar };
}
