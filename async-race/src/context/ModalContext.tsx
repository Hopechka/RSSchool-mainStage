import React, { createContext, useState } from 'react';
// import { garage } from '../data/garage';
import { ICar, Winners } from '../types';

interface IModalContext {

  selectState:ICar | null
  select: (car: ICar | null ) => void

  showScreen:boolean
  showScreenGarage: ()=>void
  showScreenScore : ()=>void

  screenGarage:string
  screenGarageOff : ()=>void
  screenGarageOn : ()=>void

  winnersForTable:Winners[]
  putWinnersForTable:(winners:Winners[])=>void
}


export const ModalContext = createContext<IModalContext>({

  selectState:null,
  select:()=>{},

  showScreen:true,
  showScreenGarage: ()=>{},
  showScreenScore : ()=>{},

  screenGarage:'flex',
  screenGarageOff :()=>{},
  screenGarageOn: ()=>{},

  winnersForTable:[],
  putWinnersForTable:()=>{},



});

export const ModalState = ({ children }:{ children:React.ReactNode }) =>{

  const [selectState, setSelectState] = useState<ICar | null>(null);
  const select = (car:ICar | null) => {setSelectState(car);};

  const [showScreen, setShowScreen] = useState(true);
  const showScreenGarage = ()=>{setShowScreen(true);};
  const showScreenScore = ()=>{setShowScreen(false);};

  const [screenGarage, setScreenGarage] = useState('flex');
  const screenGarageOff = () => {setScreenGarage('none');};
  const screenGarageOn = () => {setScreenGarage('flex');};

  const [winnersForTable, setWinnersForTable] = useState<Winners[]>([]);
  const putWinnersForTable = (winners:Winners[]) => {setWinnersForTable(winners);};




  return (
        <ModalContext.Provider value={{ selectState, select, winnersForTable, putWinnersForTable, 
          showScreen, showScreenGarage, showScreenScore, screenGarageOff, screenGarageOn, screenGarage }}>
            { children}
        </ModalContext.Provider>

  );
};