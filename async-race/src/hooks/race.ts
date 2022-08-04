
import { IEngine, NextAnimationFrameHandler } from '../types';
import axios, { AxiosError } from 'axios';
import { useEffect, useRef, useState } from 'react';





// Работа с логикой
export function useRaceCars() {  
  const [duration, setDuration] = useState(0);
  const switchAnimationActiveRef = useRef(false);


  const getDurationTime = (data:IEngine) => setDuration(data.distance / data.velocity);
  console.log('durationTime: ', duration);
  
  async function handelStart(idCar:number) {
    switchAnimationActiveRef.current = false;
    const response = await axios.patch<IEngine>(`http://127.0.0.1:3000/engine?id=${idCar}&status=started`);
    console.log('response handelStart: ', response.data);
    getDurationTime(response.data);
  } 

  async function handelStop(idCar:number) {
    const response =  await axios.patch<IEngine>(`http://127.0.0.1:3000/engine?id=${idCar}&status=stopped`);
    console.log('response handelStop: ', response.data);
    setDuration(0);
  }

  async function handelStartDrive(idCar:number) {
    try {
      const response = await axios.patch<IEngine>(`http://127.0.0.1:3000/engine?id=${idCar}&status=drive`);
      console.log('response handelStartDrive: ', response.data);
    } catch (e:unknown) {
      switchAnimationActiveRef.current = true;
      //   console.log('switchAnimationActive: ', switchAnimationActiveRef);
      const err = e as AxiosError;
      console.log('server error: ', err.message);
      handelStop(idCar);
    }
    
  }
  //   console.log('switchAnimationActive outside: ', switchAnimationActiveRef);
  
  interface IUseAnimationFrameProps {
    nextAnimationFrameHandler: NextAnimationFrameHandler
    shouldAnimate:boolean,
  }
    
  const useAnimationFrame = ({
    nextAnimationFrameHandler,
    shouldAnimate = true,
  }:IUseAnimationFrameProps) => {
    const frame = useRef(0);
    const firstFrameTime = useRef(performance.now());

    const animate = (now:number) => {
      let timeFraction = (now - firstFrameTime.current) / duration;
      if (timeFraction > 1) {
        timeFraction = 1;
      }

      if (timeFraction <= 1 ) {
        nextAnimationFrameHandler(timeFraction);
        if (timeFraction != 1 ) frame.current = requestAnimationFrame(animate);
      }
    };
    

    // useEffect(()=>{
    //   handelStart(id);
    
    // }, []);

    useEffect(() => {
      console.log(shouldAnimate);
   
      if (shouldAnimate) {
        
        firstFrameTime.current = performance.now();
        frame.current = requestAnimationFrame(animate);
      } else {
        cancelAnimationFrame(frame.current);
      }

      return () => cancelAnimationFrame(frame.current);
    }, [shouldAnimate]);
  };

  return { useAnimationFrame, handelStart, handelStartDrive, duration, handelStop, switchAnimationActiveRef };
}
