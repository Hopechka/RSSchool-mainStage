import React, { useContext } from 'react';
import { ModalContext } from '../context/ModalContext';
import { ICar } from '../types';
import { ReactComponent as CarSvg }  from '../assets/images/car-05.svg';

interface CarProps {
  car: ICar
}

export function Car({ car }:CarProps) {
  const { select } = useContext(ModalContext);


  return (
        <div className='car-race'>
            <div>
                <button className='button' onClick={()=>{select(car);}}  >SELECT</button>
                <button className='button' >REMOVE</button>
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