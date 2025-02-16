import React from 'react'
import './App.css';


function Temp({curr}) {

    return (
        <div className="curr">
            <img src={`https://openweathermap.org/img/wn/${curr.weather[0].icon}@2x.png`} alt={curr.weather[0].description} />
        </div>
    );
}

export default Temp;