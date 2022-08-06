import React, { useContext, useState } from 'react';
import { Car } from '../components/Car';
import { useCars } from '../hooks/car';
import { Loader } from '../components/Loader';
import { ErrorMessage } from '../components/ErrorMessage';
import { CreateCar } from '../components/CreateCar';
import { UpdateCar } from '../components/UpdateCar';
import { ICar } from '../types';
import { ModalContext } from '../context/ModalContext';
import { CreateRandomCar } from '../components/CreateRandomCar';
import { Pagination } from '../components/Pagination';
import { RaceButton } from '../components/RaceButton';
// import { useRaceCars } from '../hooks/race';





export function GaragePage() {

  const { cars, loading, error, addCar, updateCar, removeCar, totalCount, changePage, totalPages } = useCars();
  const { selectState, select } = useContext(ModalContext);
  const [pages, setPages] = useState(1);
  const [raceSwitcher, setRaceSwitcher] = useState(false);
  //   const { startAllCars } = useRaceCars();




  
  //   const [limit, setLimit] = useState(10);
  function handlePages(value:number) {
    // console.log('value(Garage): ', value);
    setPages(value);
    changePage(value);
  }

  function createHandler(car:ICar) {
    addCar(car);
  }
  function updateHandler() {
    updateCar();
    {select(null);}
  }
  console.log('cars(Garage): ', cars);
  //   console.log('pages(Garage): ', pages);

  async function handelStartAllCars() {
    // startAllCars(cars);
    setRaceSwitcher(true);
  }

  function handelResetAllCars() {
    setRaceSwitcher(false);
  }
 
  return (
    
    <div className='container'>
        <div className='main'>
            <div className='forms'>
            {<CreateCar onCreate = {createHandler}/>}
            {<UpdateCar selectState={selectState} onUpdate = {updateHandler}/>}
            <div className='cars-btns'>
            {<RaceButton className={'button'} title = {' RACE '}  disabled={raceSwitcher} onClick={handelStartAllCars} />}
            {<RaceButton className={'button'} title = {'RESET'}  disabled={!raceSwitcher} onClick={handelResetAllCars} />}
            {<CreateRandomCar onCreate = {createHandler}/>}
            </div>

            </div>
            <h1>{`Garage (${totalCount})`}</h1>
            <h2>{`Page (${pages})`}</h2>
            {cars.map((car) => (
          <Car car={car} removeCar={removeCar} raceSwitcher = {raceSwitcher} key={car.id} /> 
            ))}
            {loading && <Loader/>}
            {error && <ErrorMessage error={error}/>}
            <Pagination  handlePages={handlePages} totalPages={totalPages} totalCount = {totalCount}/>
          
        </div>
        
    </div>
    
  );
  
}
