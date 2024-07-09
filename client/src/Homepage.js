import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'


function Homepage() {
  const navigate = useNavigate();
  return(
    <>
      <button onClick={()=>{navigate('/new-deck')}}>make deck</button>
    </>
  )
}

export default Homepage;
