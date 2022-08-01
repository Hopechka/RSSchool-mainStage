import React, { useContext } from 'react';
import { Car } from '../components/Car';
import { useCars } from '../hooks/car';
import { Loader } from '../components/Loader';
import { ErrorMessage } from '../components/ErrorMessage';
import { CreateCar } from '../components/CreateCar';
import { UpdateCar } from '../components/UpdateCar';
import { ICar } from '../types';
import { ModalContext } from '../context/ModalContext';

export function GaragePage() {

  const { cars, loading, error, addCar, updateCar } = useCars();
  const { selectState } = useContext(ModalContext);

  function createHandler(car:ICar) {
    addCar(car);
  }
  function updateHandler() {
    updateCar();
  }


  return (
    <div className='container'>
        <div className='main'>
            {/* <button className='button middle-btn-grey' onClick={addCar(car)}>CREATE</button> */}
            <div className='forms'>
            {<CreateCar onCreate = {createHandler}/>}
            {<UpdateCar selectState={selectState} onUpdate = {updateHandler}/>}
            </div>
            <h1>Garage</h1>
            <h2>Page</h2>
            {cars.map(car => <Car car = {car} key = {car.id}/>)}
            {loading && <Loader/>}
            {error && <ErrorMessage error={error}/>}
          
        </div>
        
    </div>
  );
}
