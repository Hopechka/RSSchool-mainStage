import React from 'react';
import { ICar } from '../types';
import axios from 'axios';


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
  const carModal = [
    'Durango', 'Ram', 'Challenger', 'Charger', 'Grand Caravan', 'X7', 'X5', 'X3', 'X6 M', 'X6', 'X1', 'X4', 'C3 Aircross', 'C5 Aircross', 'Duster', 'CR-V', 'Corolla',
    'C4 Cactus', 'DS3 Crossback', 'C1', 'C3', 'Berlingo Multispace', 'DS4 Crossback', 'UX 250h', 'NX 300h', 'LC 500', 'RX 350/200t', 'Rapid', 'Largus',
    'IS 200t', 'LS 500h', 'RX', 'ES 200/250/350', 'Hatchback', 'CX-5', 'Sedan', 'CX-30', 'CX-9', 'CX-3', 'MX-5 Roadster', 'Phantom', 'Camry', 'Polo',
    'Cullinan', 'Ghost', 'Dawn', 'Duster', 'Arkana', 'Sandero', 'Logan', 'Trafic Fourgon', 'Logan MCV', 'Captur', 'Kadjar', 'RAV4', 'Rio', 'Creta', 'Solaris',
  ];

  function generateColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }
  function generateName() {
    return [carBrand, carModal].map(arr=>{
      const rand = Math.floor(Math.random() * arr.length);
      return arr[rand];
      
    }).join(' ');
  }

  const randomCars : ICar[] = [];

  for (let i = 0; i < 100; i++) {
    randomCars.push({ color:generateColor(), name:generateName() });
  }
  
  async function addHandler() {
    for (const car of randomCars) {
      const response = await axios.post<ICar>('http://127.0.0.1:3000/garage', car);
      onCreate(response.data);
    }
  }
  
  return (

   <button className='button' onClick= {()=>{addHandler();}}>GENERATE CARS</button> 
       
  );
  
}