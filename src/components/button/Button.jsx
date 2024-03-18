import React from 'react'
import { useGlobalContext } from '../../hooks/useGlobalContext'

const Button = () => {

  const {setShowSignUp} = useGlobalContext()
  
  return (
    <div>
        <button className=' bg-blue-500 text-white-100 text h-8 rounded-lg w-32 text-xl' onClick={() => setShowSignUp(true)}>
            Get Started
        </button>
    </div>
  )
}

export default Button