import React, { MutableRefObject, useRef, useState } from 'react';
import { ReactComponent as CarSvg }  from '../assets/images/car-05.svg';
import { ReactComponent as FlagSvg }  from '../assets/images/finish-line-flag.svg';
import { useRaceCars } from '../hooks/race';
import { ICar } from '../types';

interface RaceCarsProps {
  car: ICar;
}

export function RaceCars({ car }:RaceCarsProps) {
  const { useAnimationFrame, handelStart, handelStartDrive, handelStop, switchAnimationActiveRef } = useRaceCars();

  const carRef = useRef<HTMLDivElement>(null);
  const carRoadRef = useRef<null | HTMLDivElement>(null);

  const [shouldAnimate, setShouldAnimate] = useState(false);

  async function handelStartProcess() {
    await handelStart(car.id as number);
    await setShouldAnimate(true);
    handelStartDrive(car.id as number);
    
  }

  function reset() {
    handelStop(car.id as number);
    (carRef as MutableRefObject<HTMLDivElement>).current .style.left = '0';
    setShouldAnimate(false);
  
  }
  
  

  const nextAnimationFrameHandler = (progress:number) : void => {

    const activeCar = (carRef  as MutableRefObject<HTMLDivElement>).current;
    const carRoad = (carRoadRef  as MutableRefObject<HTMLDivElement>).current;
    // const carRoadWidth = carRoad.clientWidth - (carRoad.clientWidth * 0.20);
    const carRoadWidth = carRoad.clientWidth - 180;

    if (car) {
      if (progress < 1) {
        activeCar.style.left = `${carRoadWidth * progress}px`;
        if (switchAnimationActiveRef.current) {
          activeCar.style.left = `${carRoadWidth * progress}px`;
          setShouldAnimate(false);
          console.log('brocken point:', carRoadWidth * progress);
        }
        
      } else {
        setShouldAnimate(false);
        activeCar.style.left = `${carRoadWidth}px`;
      }

    }
  };
 

  

  useAnimationFrame({
    nextAnimationFrameHandler,
    shouldAnimate,
  });

 
 

  return (
        <div className='car-road' ref={carRoadRef}>
        <button className='button small-btn' onClick={handelStartProcess}>START</button>
        <button className='button small-btn' onClick={() => reset()}>STOP</button>
    <div className='activeCar' ref={carRef}  >
    <CarSvg className='car-svg'  style={{ fill: `${car.color}` }}/>
    </div>
    <FlagSvg className='flag-svg'/>
    
    </div>


  );
}
