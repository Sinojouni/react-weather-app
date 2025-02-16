import React, { useEffect, useState } from 'react'
import './App.css';


function Search({ city, setCity, fetch_data, day }) {
    const [classname,setClassname]=useState("");
    useEffect(
      ()=>{
        if(day){setClassname("backday");}else{setClassname("backnig")}
      },[day]
    )


    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        fetch_data();
      }
    };

    return (
        <div className="search">
            <input type="text" onKeyDown={handleKeyPress} placeholder="Search city" value={city} onChange={(val) => setCity(val.target.value)  } />
            <button className={classname} onClick={fetch_data}>Search</button>
        </div>
    );
}

export default Search;