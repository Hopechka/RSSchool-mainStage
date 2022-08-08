import React, { useState } from 'react';
import { ICar } from '../types';
import axios from 'axios';
import { ErrorMessage } from './ErrorMessage';

const carData:ICar = {
  name:'',
  color:'',
};

interface CreateCarProps {
  onCreate:(product:ICar) => void
}

export function CreateCar({ onCreate }:CreateCarProps) {
    
  const [valueText, setValueText] = useState('');
  const [valueColor, setValueColor] = useState('#050505');
  const [error, setError] = useState('');



  async function submitHandler(event:React.FormEvent) {
    event.preventDefault();

    setError('');

    if (valueText.trim().length === 0) {
      setError('Please enter valid name.');
      return;
    }

    carData.name = valueText;
    carData.color = valueColor;
  
    // console.log('carData(create):', carData);
    const response = await axios.post<ICar>('http://127.0.0.1:3000/garage', carData);
    // console.log('response.data(create):', response.data);
    setValueText('');
    onCreate(response.data);
  }

  function changeHandlerText(event:React.KeyboardEvent<HTMLInputElement>) {setValueText(event.target.value);}
  function changeHandlerColor(event:React.KeyboardEvent<HTMLInputElement>) {setValueColor(event.target.value);}

  return (
    <form onSubmit={submitHandler}>
        <input type="text"
        className='input'
        placeholder= 'Create a new car...'
        value = {valueText}
        onChange = {changeHandlerText}
        />
        

        <input type="color"
        value = {valueColor}
        onChange = {changeHandlerColor}
        ></input>
        <button type="submit" className='button'>CREATE</button>
        {error && <ErrorMessage error= {error}/>}
    </form> 
  );
}