import React, { useState } from 'react';
import { useCars } from '../hooks/car';


interface MyButtonProps {
  page:number, 
  onClick:()=>void,
  title:string
  disabled:boolean
}

function MyButton({ page, onClick, title, disabled }:MyButtonProps) {
  return (
      <button className='button' disabled = {disabled} onClick={onClick}>
         {title}: {page} 
      </button>
  );
}

interface PaginationProps {
  handlePages:(page:number)=>void
  totalPages:number
  totalCount:number
}



export function Pagination({ handlePages, totalPages, totalCount }:PaginationProps) {
  const { limit } = useCars();
  const [page, setPage] = useState(1);
 

  console.log('totalPages(Pag): ', totalPages);
  
  const hasPrev = page >= 2;
  const hasNext = page < totalPages && totalCount > limit;

  function handleClickPlus() {
    if (hasNext) {
      setPage(page + 1);
    }

    handlePages(page + 1);
    
  }
  function handleClickMinus() {

    if (hasPrev) {
      setPage(page - 1);
    }

    handlePages(page - 1);
  }
  

  return (<div>
    <MyButton title = {'PREVIOUS'} page={page} disabled={!hasPrev} onClick={handleClickMinus} />
    <MyButton title = {'NEXT'} page={page} disabled={!hasNext} onClick={handleClickPlus} />
    </div>

            
  );
}
