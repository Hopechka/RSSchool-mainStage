import React from 'react';

interface ErrorMessageProps {
  error:string
    
}

export function ErrorMessage({ error }:ErrorMessageProps) {
  return (
        <p className='error-message'>{error} </p>
  );
}