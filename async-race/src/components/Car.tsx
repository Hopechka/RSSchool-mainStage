import React, { useContext, useRef } from 'react';
import { ModalContext } from '../context/ModalContext';
import { ICar } from '../types';
// import { ReactComponent as CarSvg }  from '../assets/images/car-05.svg';
import axios from 'axios';
import { RaceCars } from './RaceCars';


interface CarProps {
  car: ICar;
  removeCar: (idCar: number) => void;
  raceSwitcher:boolean;
}

export function Car({ car, removeCar, raceSwitcher }:CarProps) {
  const { select } = useContext(ModalContext);
  const animateRaceSwitcherRef = useRef(false);


  async function handelRemove() {
    await axios.delete<ICar>(`http://127.0.0.1:3000/garage/${car.id}`);
    removeCar(car.id as number);
  }
  function handleRaceSwitcher() {
    animateRaceSwitcherRef.current = false;
    if (raceSwitcher) {animateRaceSwitcherRef.current = true;}
    return animateRaceSwitcherRef.current;
  }
  
 

  return (
        <div className='car-race'>
            <div>
                <button className='button' onClick={()=>{select(car);}}>SELECT</button>
                <button className='button' onClick={handelRemove}>REMOVE</button>
                <h3 className='h3'>{car.name}</h3>
            </div>
            <RaceCars car = {car} handleRaceSwitcher ={handleRaceSwitcher }/>

        </div>
  );
}