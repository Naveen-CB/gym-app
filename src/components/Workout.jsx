import React from 'react'
import SectionWrapper from './SectionWrapper';
import ExerciseCard from './ExerciseCard';

const Workout = (props) => {
  const{workout} = props;
  return (
    <SectionWrapper header={"welcome to"} title={["The", "DANGER", "Zone"]} id={'workout'}>
      <div className="flex flex-col gap-4">
        {workout.map((exercise, i) =>{
          return(
            <ExerciseCard exercise={exercise} key={i} index={i}/>
          )
        })}
      </div>
    </SectionWrapper>
  )
}

export default Workout