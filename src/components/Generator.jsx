import React, { useState } from 'react'
import SectionWrapper from './SectionWrapper'
import { SCHEMES, WORKOUTS } from '../utils/swoldiers';
import Button from './Button';

const Header = (props) =>{
  const {index, title, description} = props;
  
  return(
    <div className='flex flex-col gap-4' >
      <div className='flex items-center justify-center gap-2'>
        <p className='text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-400'>{index}</p>
        <h4 className='text-xl sm:text-2xl md:text-3xl'>{title}</h4>
      </div>
      <p className='text-sm sm:text-base mx-auto'>{description}</p>
    </div>
  )
}

const Generator = (props) => {
  const{poison, setPoison, muscles, setMuscles, goal, setGoal, updateWorkout} = props
  const [showModal, setShowModal] = useState(false);
  
  const toggleModal = () =>{
    setShowModal(!showModal);
  }

  const updateMuscle = (muscleGroup) =>{
    if(muscles.includes(muscleGroup)){
      setMuscles(muscles.filter(val => val !== muscleGroup));
      return;
    }
    if(muscles.length > 2){
      return;
    }
    if(poison !== 'individual'){
      setMuscles([muscleGroup]);
      setShowModal(false);
      return;
    }
    setMuscles([...muscles, muscleGroup]);
    if(muscles.length === 2){
      setShowModal(false);
    }
  }

  return (
    <SectionWrapper header={"generate your workout"} title={["It's", "huge", "o'clock"]} id={"generate"}>
      
      <Header index = {'01'} title={"Pick your poison"} description={"select workout to enjoy!"} />
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {Object.keys(WORKOUTS).map((type, typeIndex)=>{
        return (
        <button onClick={()=>{
          setMuscles([]);
          setPoison(type)
          }} key={typeIndex} className={'bg-slate-950 border  duration-200 hover:border-blue-600 py-3 rounded-lg px-4' + (type === poison ? ' border-blue-600' : ' border-blue-400')} >
          <p>{type.replaceAll('_', " ")}</p>
        </button>
        )
      })}
      </div>
      
      <Header index = {'02'} title={"lock on target"} description={"select the muscle group to train"} />
      <div className='bg-slate-950 p-3  border border-solid border-blue-400 rounded-lg flex flex-col'>
        <button onClick={toggleModal} className="relative flex items-center justify-center">
          <p>{muscles.length == 0 ? 'select muscle groups': muscles.join(' ')}</p>
          <i className="fa-solid absolute right-3 top-1/2 -translate-y-1/2 fa-caret-down"></i>
        </button>
        {
          showModal && (
            <div className="flex flex-col px-3 pb-3">
              {(poison === 'individual' ? WORKOUTS[poison] : Object.keys(WORKOUTS[poison])).map((muscleGroup, muscleGroupIndex) =>{
                return(
                  <button onClick={()=>{
                    updateMuscle(muscleGroup)
                    
                  }} key={muscleGroupIndex} className={'hover:text-blue-400 duration-200 ' + (muscles.includes(muscleGroup) ? 'text-blue-400' : '')}>
                    <p>{muscleGroup.replaceAll('_', ' ')}</p>
                  </button>
                )
              })}
            </div>
          )
        }
      </div>

      <Header index = {'03'} title={"Pick your schemes"} description={"select scheme to make progress!"} />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {Object.keys(SCHEMES).map((schemes, schemeIndex)=>{
        return (
          <button onClick={()=>setGoal(schemes)} key={schemeIndex} className={'bg-slate-950 border  duration-200 hover:border-blue-600 py-3 rounded-lg px-4' + (schemes === goal ? ' border-blue-600' : ' border-blue-400')} >
          <p>{schemes.replaceAll('_', " ")}</p>
        </button>
        )
      })}
      </div>
      <Button func={updateWorkout} text={"Formulate"} />
    </SectionWrapper>
  )
}

export default Generator