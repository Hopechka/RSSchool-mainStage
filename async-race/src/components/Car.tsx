import React, { useContext } from 'react';
import { ModalContext } from '../context/ModalContext';
import { ICar } from '../types';
import { ReactComponent as CarSvg }  from '../assets/images/car-05.svg';
import axios from 'axios';
// import { useCars } from '../hooks/car';

interface CarProps {
  car: ICar;
  removeCar: (idCar: number) => void;
}

export function Car({ car, removeCar }:CarProps) {
  const { select } = useContext(ModalContext);


  async function handelRemove() {
    await axios.delete<ICar>(`http://127.0.0.1:3000/garage/${car.id}`);
    removeCar(car.id as number);
  }
 

  return (
        <div className='car-race'>
            <div>
                <button className='button' onClick={()=>{select(car);}}>SELECT</button>
                <button className='button' onClick={handelRemove}>REMOVE</button>
                <h3 className='h3'>{car.name}</h3>
            </div>
            <div className='car-road'>
                <button className='button small-btn'>A</button>
                <button className='button small-btn'>B</button>
            
            <CarSvg className='car' style={{ fill: `${car.color}` }}/>
            </div>

        </div>
  );
}