import React, { useState } from 'react';
import { useCars } from '../hooks/car';
import { getPageCount } from '../utils/pages';


interface MyButtonProps {
  page:number, 
  onClick:()=>void,
  title:string
}

function MyButton({ page, onClick, title }:MyButtonProps) {
  return (
      <button className='button' onClick={onClick}>
         {title}: {page} 
      </button>
  );
}

interface PaginationProps {
//   totalPages:number, 
//   page:number, 
  changePage:(page:number)=>void
}


// export function Pagination({ totalPages, page, changePage }:PaginationProps) {
export function Pagination({ changePage }:PaginationProps) {
  const { totalCount } = useCars();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

   
  console.log('totalPages: ', totalPages);

  function handleClickPlus() {
    setTotalPages(getPageCount(totalCount, 10));
    if (page < totalPages) {
      setPage(page + 1);
    }
    changePage(page);
    
  }
  function handleClickMinus() {
    setTotalPages(getPageCount(totalCount, 10));
    if (page >= 2) {
      setPage(page - 1);
    }
    changePage(page);
  }
  

  return (<div>
    <h2>{`Page (${page})`}</h2>
    <MyButton title = {'PREVIOUS'} page={page} onClick={handleClickMinus} />
    <MyButton title = {'NEXT'} page={page} onClick={handleClickPlus} />
    </div>

            
  );
}
