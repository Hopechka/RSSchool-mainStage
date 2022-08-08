import React, { createContext, useState } from 'react';
// import { garage } from '../data/garage';
import { ICar } from '../types';

interface IModalContext {
//   carState:boolean
//   updateCarState: ()=>void
//   updatedCarState: ()=>void
  selectState:ICar | null
  select: (car: ICar | null ) => void

  screenScore:string
  screenScoreOff : ()=>void
  screenScoreOn : ()=>void
  screenGarage:string
  screenGarageOff : ()=>void
  screenGarageOn : ()=>void
}


export const ModalContext = createContext<IModalContext>({
//   carState:false,
//   updateCarState:()=>{},
//   updatedCarState:()=>{},

  selectState:null,
  select:()=>{},

  screenScore:'none',
  screenScoreOff :()=>{},
  screenScoreOn :()=>{},
  screenGarage:'flex',
  screenGarageOff :()=>{},
  screenGarageOn: ()=>{},

});

export const ModalState = ({ children }:{ children:React.ReactNode }) =>{

  //   const [carState, setCarState] = useState(true);
  //   const updateCarState = () => {setCarState(true);};
  //   const updatedCarState = () => {setCarState(false);};
  const [selectState, setSelectState] = useState<ICar | null>(null);
  const select = (car:ICar | null) => {setSelectState(car);};

  const [screenScore, setScreenScore] = useState('none');
  const screenScoreOff = () => {setScreenScore('none');};
  const screenScoreOn = () => {setScreenScore('flex');};
  const [screenGarage, setScreenGarage] = useState('flex');
  const screenGarageOff = () => {setScreenGarage('none');};
  const screenGarageOn = () => {setScreenGarage('flex');};



  return (
        <ModalContext.Provider value={{ selectState, select, screenScore, screenScoreOff, screenScoreOn, screenGarage, screenGarageOff, screenGarageOn }}>
            { children}
        </ModalContext.Provider>

  );
};