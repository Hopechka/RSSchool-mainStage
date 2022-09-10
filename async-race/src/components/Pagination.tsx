import React, { useState } from 'react';
import { useCars } from '../hooks/car';


interface MyButtonProps {
//   page:number, 
  onClick:()=>void,
  title:string
  disabled:boolean
}

function MyButton({ onClick, title, disabled }:MyButtonProps) {
  return (
      <button className='button' disabled = {disabled} onClick={onClick}>
         {title} 
      </button>
  );
}

interface PaginationProps {
  handlePages:(page:number)=>void
  totalPages:number
  totalCount:number
  raceSwitcherOff:()=>void
}



export function Pagination({ handlePages, totalPages, totalCount, raceSwitcherOff }:PaginationProps) {
  const { limit } = useCars();
  const [page, setPage] = useState(1);
 
  
  const hasPrev = page >= 2;
  const hasNext = page < totalPages && totalCount > limit;

  function handleClickPlus() {
    if (hasNext) {
      setPage(page + 1);
    }

    handlePages(page + 1);
    raceSwitcherOff();
    
  }
  function handleClickMinus() {

    if (hasPrev) {
      setPage(page - 1);
    }

    handlePages(page - 1);
    raceSwitcherOff();
  }
  

  return (<div>
    <MyButton title = {'PREVIOUS'} disabled={!hasPrev} onClick={handleClickMinus} />
    <MyButton title = {'NEXT'} disabled={!hasNext} onClick={handleClickPlus} />
    </div>

            
  );
}
