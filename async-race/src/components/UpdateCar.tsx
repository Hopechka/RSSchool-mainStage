import React, { useState } from 'react';
import { ICar } from '../types';
import axios from 'axios';
import { ErrorMessage } from './ErrorMessage';
import { CreateForm } from './Form';

const carData:ICar = {
  name:'',
  color:'',
};

interface CreateCarProps {
  selectState:ICar | null
  onUpdate:() => void
}

export function UpdateCar({ selectState, onUpdate }:CreateCarProps) {
//   console.log('selectState: ', selectState);
  
  
  if (selectState === null) {
    return <CreateForm />;
  }
 
  const [valueText, setValueText] = useState(selectState.name);
  const [valueColor, setValueColor] = useState(selectState.color);
  const [error, setError] = useState('');

  //   console.log('valueText: ', valueText);
  //   console.log('valueColor: ', valueColor);
  
  async function submitHandler(event:React.FormEvent) {
    event.preventDefault();

    setError('');
  
    if (valueText.trim().length === 0) {
      setError('Please enter valid name.');
      return;
    }
  
    carData.name = valueText;
    carData.color = valueColor;
  
 
    await axios.patch<ICar>(`http://127.0.0.1:3000/garage/${selectState?.id}`, carData);
    onUpdate();
  }
  
  function changeHandlerText(event:React.KeyboardEvent<HTMLInputElement>) {
    setValueText(event.target.value);
  }
  function changeHandlerColor(event:React.KeyboardEvent<HTMLInputElement>) {
    setValueColor(event.target.value);
  }
 
  
  return (
      <form onSubmit={submitHandler}>
          <input type="text"
          className='input'
          placeholder= 'Update a new car...'
          value = {valueText}
          onChange = {changeHandlerText}
          />
          {error && <ErrorMessage error= {error}/>}
  
          <input type="color"
          value = {valueColor}
          onChange = {changeHandlerColor}
          ></input>
          <button type="submit" className='button' >UPDATE</button>
          
      </form> 
  );
}