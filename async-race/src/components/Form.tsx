import React from 'react';




export function CreateForm() {
  function submitHandler(event:React.FormEvent) {
    event.preventDefault();
  }
  return (
        <form onSubmit={submitHandler}>
            <input type="text"
            className='input'
            placeholder= 'Update a new car...'
            disabled
            />
    
            <input type="color" disabled
            ></input>
            <button type="submit" className='button' disabled>UPDATE</button>
            
        </form> 
  );
}