import React from 'react';

interface RaceButtonProps {
  onClick:()=>void,
  title:string
  disabled:boolean
  className:string
}
    
export function RaceButton({ onClick, title, disabled, className }:RaceButtonProps) {
  return (
          <button className={className} disabled = {disabled} onClick={onClick}>
             {title}
          </button>
  );
}