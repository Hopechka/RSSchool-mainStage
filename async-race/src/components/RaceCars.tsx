import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import { ReactComponent as CarSvg }  from '../assets/images/car-05.svg';
import { ReactComponent as FlagSvg }  from '../assets/images/finish-line-flag.svg';
import { useRaceCars } from '../hooks/race';
import { ICar, IdAndTime } from '../types';
import { RaceButton } from '../components/RaceButton';

interface RaceCarsProps {
  car: ICar;
  handleRaceSwitcher : ()=>boolean
  sendWinner:(winner:IdAndTime)=>void

}


export function RaceCars({ car, handleRaceSwitcher, sendWinner }:RaceCarsProps) {
  const { useAnimationFrame, handelStart, handelStartDrive, handelStop, switchAnimationActiveRef, idAndTimeRef } = useRaceCars();


  const carRef = useRef<HTMLDivElement>(null);
  const carRoadRef = useRef<null | HTMLDivElement>(null);
  const [disabled, setDisabled] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  async function handelStartProcess() {
    setDisabled(true);
    await handelStart(car.id as number);
    await setShouldAnimate(true);
    handelStartDrive(car.id as number);
    
  }

  function reset() {
    setDisabled(false);
    handelStop(car.id as number);
    (carRef as MutableRefObject<HTMLDivElement>).current .style.left = '0';
    setShouldAnimate(false);
  
  }

  useEffect(()=>{
    if (handleRaceSwitcher()) {
      handelStartProcess();
    } else {
      reset();  
    } 
  }, [handleRaceSwitcher()]);
  

  const nextAnimationFrameHandler = (progress:number) : void => {

    const activeCar = (carRef  as MutableRefObject<HTMLDivElement>).current;
    const carRoad = (carRoadRef  as MutableRefObject<HTMLDivElement>).current;
    const carRoadWidth = carRoad.clientWidth - 180;

    if (car) {
      if (progress < 1) {
        activeCar.style.left = `${carRoadWidth * progress}px`;
        if (switchAnimationActiveRef.current) {
          activeCar.style.left = `${carRoadWidth * progress}px`;
          setShouldAnimate(false);
        }
        
      } else {
        switchAnimationActiveRef.current = true;
        setShouldAnimate(false);
        activeCar.style.left = `${carRoadWidth}px`;
        sendWinner(idAndTimeRef.current);
      }

    }
  };
 

  

  useAnimationFrame({
    nextAnimationFrameHandler,
    shouldAnimate,
  });

 
 

  return (
        <div className='car-road' ref={carRoadRef}>
        <RaceButton className = {'button small-btn'} title = {'START'}  disabled={disabled} onClick={handelStartProcess} />
        <RaceButton className = {'button small-btn'} title = {'STOP'}  disabled={!disabled} onClick={() => reset()} />
    <div className='activeCar' ref={carRef}  >
    <CarSvg className='car-svg'  style={{ fill: `${car.color}` }}/>
    </div>
    <FlagSvg className='flag-svg'/>
    
    </div>


  );
}

