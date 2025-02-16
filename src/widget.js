import React, { useEffect, useState } from 'react'
import './App.css';


function Weidget({weather,day}) {

  const [classname,setClassname]=useState("");
  useEffect(
    ()=>{
      if(day){setClassname("temp colday");}else{setClassname("temp colnig")}
    },[day]
  )

  return (

    <div className="weather">
        <h2>{weather.name}, {weather.sys.country}</h2>
        <p>{new Date(weather.dt*1000).toLocaleString()}</p>
        <div className={classname}>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <span>{Math.round(weather.main.temp)}°C</span>
        </div>
        <p>
            Feels like {Math.round(weather.main.feels_like)}°C.{" "}
            {weather.weather[0].description}.
        </p>
        <p>
            💨 {weather.wind.speed} m/s | 💧 {weather.main.humidity}% | Pressure:{" "}
            {weather.main.pressure} hPa
        </p>
    </div>
  );
}

export default Weidget;