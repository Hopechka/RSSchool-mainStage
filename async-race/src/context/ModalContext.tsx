import React, { createContext, useState } from 'react';
// import { garage } from '../data/garage';
import { ICar } from '../types';

interface IModalContext {
  // updateCar:boolean
  // updateCarWork: ()=>void
  // updatedCar: ()=>void
  selectState:ICar | null
  select: (car: ICar | null ) => void

}


export const ModalContext = createContext<IModalContext>({
  // updateCar:false,
  // updateCarWork:()=>{},
  // updatedCar:()=>{},

  selectState:null,
  select:()=>{},

});

export const ModalState = ({ children }:{ children:React.ReactNode }) =>{

  // const [updateCar, setUpdateCar] = useState(false)
  // const updateCarWork = () => {setUpdateCar(true)}
  // const updatedCar = () => {setUpdateCar(false)}
  const [selectState, setSelectState] = useState<ICar | null>(null);
  const select = (car:ICar | null) => {setSelectState(car);};


  return (
        <ModalContext.Provider value={{ selectState, select }}>
            { children}
        </ModalContext.Provider>

  );
};