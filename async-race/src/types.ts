export interface ICar  {
  name: string
  color: string
  id?: number
    
}

export interface IEngine {
  velocity: number,
  distance: number
}

export type NextAnimationFrameHandler = (progress:number) => void; 