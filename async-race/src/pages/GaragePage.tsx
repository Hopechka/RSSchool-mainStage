import React, { useContext, useRef, useState } from 'react';
import { Car } from '../components/Car';
import { useCars } from '../hooks/car';
import { Loader } from '../components/Loader';
import { ErrorMessage } from '../components/ErrorMessage';
import { CreateCar } from '../components/CreateCar';
import { UpdateCar } from '../components/UpdateCar';
import { ICar, IdAndTime } from '../types';
import { ModalContext } from '../context/ModalContext';
import { CreateRandomCar } from '../components/CreateRandomCar';
import { Pagination } from '../components/Pagination';
import { RaceButton } from '../components/RaceButton';
import { ShowWinner } from '../components/ShowWinner';
import { Footer } from '../components/Footer';
import { useWinnersTable } from '../hooks/winners';

export function GaragePage() {

  const { cars, loading, error, addCar, updateCar, removeCar, totalCount, changePage, totalPages } = useCars();
  const { selectState, select, screenGarage } = useContext(ModalContext);
  const [pages, setPages] = useState(1);
  const [raceSwitcher, setRaceSwitcher] = useState(false);
  const winnerValueRef = useRef<IdAndTime>({});
  const winnersRef = useRef(true);
  const { createWinner } = useWinnersTable();



  
  function sendWinner(value:IdAndTime) {
    if (winnersRef.current) {
      winnersRef.current = false;
      winnerValueRef.current = value;
      createWinner(value);
    }
  }
  

  console.log('winner(GaragePage): ', winnerValueRef.current);


  function handlePages(value:number) {
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


  async function handelStartAllCars() {
    setRaceSwitcher(true);
    winnersRef.current = true;
    winnerValueRef.current = {};

   
  }

  function handelResetAllCars() {
    setRaceSwitcher(false);
    winnersRef.current = true;
    winnerValueRef.current = {};


  }
  function raceSwitcherOff() {
    setRaceSwitcher(false);
    winnersRef.current = true;
    winnerValueRef.current = {};
 
  }


  
 
  return (
    
    <div className='container' id='garage' style={{ display:`${screenGarage}` }}>
        {loading && <Loader/>}
        {error && <ErrorMessage error={error}/>}
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
            
            <ShowWinner winner = {winnerValueRef.current} cars = {cars} raceSwitcher = {raceSwitcher}  winnersRef={winnersRef.current}/>
            <h1>{`Garage (${totalCount})`}</h1>
            <h2>{`Page (${pages})`}</h2>
            {cars.map((car) => (
          <Car car={car} removeCar={removeCar} raceSwitcher = {raceSwitcher} sendWinner={sendWinner} key={car.id} /> 
            ))}
            
            <Pagination  handlePages={handlePages} totalPages={totalPages} totalCount = {totalCount} raceSwitcherOff = {raceSwitcherOff}/>
        </div>
        <Footer/>
    </div>
    
  );
  
}
