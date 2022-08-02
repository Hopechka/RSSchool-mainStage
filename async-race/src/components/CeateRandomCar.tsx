import React from 'react';
import { ICar } from '../types';
import axios from 'axios';


const carData:ICar = {
  name:'',
  color:'',
};

interface CreateCarProps {
  onCreate:(product:ICar) => void
}

export function CreateRandomCar({ onCreate }:CreateCarProps) {

  const carBrand = [
    'Acura', 'Alfa Romeo', 'Alpine', 'Apollo', 'Apple', 'Aston Martin', 'Audi', 'Automobili Pininfarina', 'Bentley', 'BMW', 'Bollinger', 
    'Brilliance', 'Bugatti', 'Buick', 'BYD', 'Cadillac', 'Chana', 'Chery', 'Chevrolet', 'Chrysler', 'Citroen', 'Continental', 'CUPRA',
    'Dacia', 'Daewoo', 'Daihatsu', 'Datsun', 'Detroit Electric', 'Dodge', 'DS Automobiles', 'FAW', 'Ferrari', 'Fiat', 'Fisker', 'Ford',
    'Foxtron', 'Geely', 'Genesis', 'GMC', 'Great Wall', 'Haval', 'Honda', 'Hummer', 'Hyundai', 'Ineos', 'Infiniti', 'Iran Khodro', 'JAC',
    'Jaguar', 'Jeep', 'JETOUR', 'KIA', 'Koenigsegg', 'Lada', 'Lamborghini', 'Lancia', 'Land Rover', 'Lexus', 'Lifan', 'Lincoln', 'Lordstown', 
    'Lotus', 'Lucid', 'LvChi', 'Lynk & Co', 'Maserati', 'Maybach', 'Mazda', 'MCLaren', 'Mercedes-Benz', 'MG', 'MINI', 'Mitsubishi', 'Nikola', 
    'NIO', 'Nissan', 'Opel', 'Pagani', 'Peugeot', 'Polestar', 'Porsche', 'Qoros', 'Range Rover', 'Ravon', 'Renault', 'Rimac', 'Rivian',
    'Rolls-Royce', 'Saab', 'Saipa', 'SEAT', 'Skoda', 'smart', 'SsangYong', 'SSC North America', 'Stellantis', 'Subaru', 'Suzuki', 'Tata',
    'Tesla', 'Torsus', 'Toyota', 'VinFast', 'Volkswagen', 'Volvo', 'Xpeng', 'Zotye',
  ];

  function generateColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }
  function generateName() {
    const rand = Math.floor(Math.random() * carBrand.length);
    return carBrand[rand];
  }

  const randomCars : ICar[] = [];

  for (let i = 0; i < 10; i++) {
    randomCars.push({ color:generateColor(), name:generateName() });
  }
  
  async function addHandler() {
    for (const car of randomCars) {
    
      console.log('carData:', carData);
      const response = await axios.post<ICar>('http://127.0.0.1:3000/garage', car);
      console.log('response.data:', response.data);
      onCreate(response.data);
    }
  }
  
  return (

   <button className='button' onClick= {()=>{addHandler();}}>GENERATE CARS</button> 
       
  );
  
}