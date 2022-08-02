import React, { createContext, useState } from 'react';
// import { garage } from '../data/garage';
import { ICar } from '../types';

interface IModalContext {
//   carState:boolean
//   updateCarState: ()=>void
//   updatedCarState: ()=>void
  selectState:ICar | null
  select: (car: ICar | null ) => void


}


export const ModalContext = createContext<IModalContext>({
//   carState:false,
//   updateCarState:()=>{},
//   updatedCarState:()=>{},

  selectState:null,
  select:()=>{},

});

export const ModalState = ({ children }:{ children:React.ReactNode }) =>{

  //   const [carState, setCarState] = useState(true);
  //   const updateCarState = () => {setCarState(true);};
  //   const updatedCarState = () => {setCarState(false);};
  const [selectState, setSelectState] = useState<ICar | null>(null);
  const select = (car:ICar | null) => {setSelectState(car);};




  return (
        <ModalContext.Provider value={{ selectState, select }}>
            { children}
        </ModalContext.Provider>

  );
};