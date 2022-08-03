import React, { useContext } from 'react';
import { Car } from '../components/Car';
import { useCars } from '../hooks/car';
import { Loader } from '../components/Loader';
import { ErrorMessage } from '../components/ErrorMessage';
import { CreateCar } from '../components/CreateCar';
import { UpdateCar } from '../components/UpdateCar';
import { ICar } from '../types';
import { ModalContext } from '../context/ModalContext';
import { CreateRandomCar } from '../components/CreateRandomCar';
import { Pagination } from '../components/Pagination';



export function GaragePage() {

  const { cars, loading, error, addCar, updateCar, removeCar, totalCount, changePage } = useCars();
  const { selectState, select } = useContext(ModalContext);

  
  //   const [limit, setLimit] = useState(10);
  //   const [page, setPage] = useState(1);

  function createHandler(car:ICar) {
    addCar(car);
  }
  function updateHandler() {
    updateCar();
    {select(null);}
  }
  console.log('cars: ', cars);
 
  return (
    
    <div className='container'>
        <div className='main'>
            {/* <button className='button middle-btn-grey' onClick={addCar(car)}>CREATE</button> */}
            <div className='forms'>
            {<CreateCar onCreate = {createHandler}/>}
            {<UpdateCar selectState={selectState} onUpdate = {updateHandler}/>}
            {<CreateRandomCar onCreate = {createHandler}/>}
            </div>
            <h1>{`Garage (${totalCount})`}</h1>
            <h2>Page</h2>
            {cars.map((car) => (
          <Car car={car} removeCar={removeCar}  key={car.id} />
            ))}
            {loading && <Loader/>}
            {error && <ErrorMessage error={error}/>}
            <Pagination changePage={changePage}/>
          
        </div>
        
    </div>
    
  );
  
}
