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

  // console.log('switchAnimationActive RaceCars: ', switchAnimationActiveRef.current);


  const carRef = useRef<HTMLDivElement>(null);
  const carRoadRef = useRef<null | HTMLDivElement>(null);
  const [disabled, setDisabled] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  //   const winnerRef = useRef('none');

  async function handelStartProcess() {
    setDisabled(true);
    await handelStart(car.id as number);
    await setShouldAnimate(true);
    handelStartDrive(car.id as number);
    
  }

  function reset() {
    // disabledRef.current = false;
    setDisabled(false);
    handelStop(car.id as number);
    (carRef as MutableRefObject<HTMLDivElement>).current .style.left = '0';
    setShouldAnimate(false);
    // winnerRef.current = 'none';
  
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
    // const carRoadWidth = carRoad.clientWidth - (carRoad.clientWidth * 0.20);
    const carRoadWidth = carRoad.clientWidth - 180;

    if (car) {
      if (progress < 1) {
        activeCar.style.left = `${carRoadWidth * progress}px`;
        if (switchAnimationActiveRef.current) {
          activeCar.style.left = `${carRoadWidth * progress}px`;
          setShouldAnimate(false);
          //   winnerRef.current = 'none';
        //   console.log('brocken point:', carRoadWidth * progress);
        }
        
      } else {
        switchAnimationActiveRef.current = true;
        setShouldAnimate(false);
        activeCar.style.left = `${carRoadWidth}px`;
        // winnerRef.current = 'inline-block';
        sendWinner(idAndTimeRef.current);
        // console.log('normal point:', carRoadWidth);
        // console.log('car id on finish:', car.id);
        // console.log('idAndTimeRef(after race):', idAndTimeRef.current);
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
        {/* <h3 className = 'h3 winner-message' style={{ display: `${winnerRef.current}` }}>`id: {idAndTimeRef.current.id} time: {Math.floor(idAndTimeRef.current.time)}`</h3> */}
    <div className='activeCar' ref={carRef}  >
    <CarSvg className='car-svg'  style={{ fill: `${car.color}` }}/>
    </div>
    <FlagSvg className='flag-svg'/>
    
    </div>


  );
}

