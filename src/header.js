import React, { useEffect, useState } from 'react'
import './App.css';
import Temp from './tem';


function Header({ curr,day,toggleday}) {
  const [arr, setArr] = useState([]);

  useEffect(
    () => {
      let icon=!day?'🌙':'☀️';
      if (curr != null && curr.name) {
        setArr([<Temp key={0} curr={curr}/>,
        <div key={1} className='curr'>{Math.round(curr.main.temp)}°C</div>,
        <div key={2} className='curr'>{curr.name}, {curr.sys.country}</div>,
        <div key={3} className="curr">{icon}</div>])
      }else{
        setArr([<div key={0} className='curr'>{icon}</div>])
      }
    }, [curr, day]
  )

  return (
    <div className="header">
      <div className="logo">Weather APP</div>
      <div className='nav'>
        {arr}
      </div>
    </div>
  );
}

export default Header;