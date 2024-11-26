import React from 'react'

const Button = (props) => {
  const {text, func} = props
  return (
    <button onClick={func} className='px-8 py-4 rounded-md bg-slate-950 border-blue-400 border-solid blueShadow duration-200 mx-auto border-[2px]'>
      <p>{text}</p>
    </button>
  )
}

export default Button