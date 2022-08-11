import React, { createContext, useState } from 'react';
// import { garage } from '../data/garage';
import { ICar, Winners } from '../types';

interface IModalContext {

  selectState:ICar | null
  select: (car: ICar | null ) => void

  screenScore:string
  screenScoreOff : ()=>void
  screenScoreOn : ()=>void
  screenGarage:string
  screenGarageOff : ()=>void
  screenGarageOn : ()=>void

  winnersForTable:Winners[]
  putWinnersForTable:(winners:Winners[])=>void
}


export const ModalContext = createContext<IModalContext>({

  selectState:null,
  select:()=>{},

  screenScore:'none',
  screenScoreOff :()=>{},
  screenScoreOn :()=>{},
  screenGarage:'flex',
  screenGarageOff :()=>{},
  screenGarageOn: ()=>{},

  winnersForTable:[],
  putWinnersForTable:()=>{},

});

export const ModalState = ({ children }:{ children:React.ReactNode }) =>{

  const [selectState, setSelectState] = useState<ICar | null>(null);
  const select = (car:ICar | null) => {setSelectState(car);};

  const [screenScore, setScreenScore] = useState('none');
  const screenScoreOff = () => {setScreenScore('none');};
  const screenScoreOn = () => {setScreenScore('flex');};
  const [screenGarage, setScreenGarage] = useState('flex');
  const screenGarageOff = () => {setScreenGarage('none');};
  const screenGarageOn = () => {setScreenGarage('flex');};

  const [winnersForTable, setWinnersForTable] = useState<Winners[]>([]);
  const putWinnersForTable = (winners:Winners[]) => {setWinnersForTable(winners);};




  return (
        <ModalContext.Provider value={{ selectState, select, screenScore, screenScoreOff, screenScoreOn, 
          screenGarage, screenGarageOff, screenGarageOn, winnersForTable, putWinnersForTable }}>
            { children}
        </ModalContext.Provider>

  );
};