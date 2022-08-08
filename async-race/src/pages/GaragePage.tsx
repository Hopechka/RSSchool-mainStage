import React, { useContext, useState } from 'react';
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







export function GaragePage() {

  const { cars, loading, error, addCar, updateCar, removeCar, totalCount, changePage, totalPages } = useCars();
  const { selectState, select, screenGarage } = useContext(ModalContext);
  const [pages, setPages] = useState(1);
  const [raceSwitcher, setRaceSwitcher] = useState(false);
  const [winner, setWinner] = useState<IdAndTime[]>([]);


  
  function sendWinner(value:IdAndTime) {
    // console.log('value: ', winner);
    setWinner(prev=>[...prev, value]);

  }
  //   console.log('winner: ', winner);



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
  //   console.log('cars(Garage): ', cars);
  //   console.log('pages(Garage): ', pages);

  async function handelStartAllCars() {
    setRaceSwitcher(true);
    setWinner([]); 
  
  }

  function handelResetAllCars() {
    setRaceSwitcher(false);
    setWinner([]);
  }
  function raceSwitcherOff() {
    setRaceSwitcher(false);
    setWinner([]);
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
            
            <ShowWinner winner = {winner} cars = {cars} raceSwitcher = {raceSwitcher} />
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
