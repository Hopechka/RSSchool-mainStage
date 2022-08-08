export interface ICar  {
  name: string
  color: string
  id?: number
    
}

export interface IEngine {
  velocity: number,
  distance: number
}

export interface IdAndTime {
  [key: string]: number 
 
}

export interface Winners {
  [key: string]: number | string
}

export type NextAnimationFrameHandler = (progress:number) => void; 