import React, { useEffect, useState } from 'react'
import './App.css';


function Title({day}) {

  const [classname,setClassname]=useState("");
  useEffect(
    ()=>{
      if(day){setClassname("colday");}else{setClassname("colnig")}
    },[day]
  )

  return (
    <div className="title">
      <h1 className={classname}>Weather App</h1>
      <h2>Know the weather,</h2>
      <h2>plan your day!</h2>
    </div>
  );
}

export default Title;