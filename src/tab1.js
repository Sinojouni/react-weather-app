import React, { useEffect, useState } from 'react'
import './App.css';
import Map from "./map";
import Nomap from "./no_map";
import Weidget from "./widget";


function Tab1({ day, setMessage, setShowAlert, imgclass }) {

    const [weather, setWeather] = useState(null);
    const [arr, setArr] = useState([]);
    const [loading, setLoading] = useState(false);
    const [coordinates, setCoordinates] = useState([null, null]);
    const [showMap, setShowMap] = useState(false);
    const [classname, setClassname] = useState("");


    const fetch_data_lat_lon = async () => {
        const [lat, lon] = coordinates;
        if (lat == null || lon == null || loading) { return }
        setLoading(true);
        setShowAlert(false);
        try {
            const url = `https://weather-proxy-production.up.railway.app/api/weather/LatLon?lat=${lat}&lon=${lon}`;
            const res = await fetch(url);
            const data = await res.json();
            if (data != null && data.cod) { if (data.cod === '404') { setMessage(data.message); setShowAlert(true); } }
            if (data != null && data.name) { setWeather(data); }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(
        () => {
            if (weather != null && weather.name) {
                setArr([<Weidget key={0} weather={weather} day={day} />,]);
            }
        }, [weather, day]
    )

    useEffect(
        () => {
            if (day) { setClassname("backday"); } else { setClassname("backnig") }
        }, [day]
    )

    useEffect(() => {
        fetch_data_lat_lon();
    }, [coordinates]);




    return (
        <div>
            <div className={imgclass} >
                {showMap ? (
                    <div className='map' >
                        <Map setCoordinates={setCoordinates} />
                        <button onClick={() => setShowMap(false)}>x</button>
                    </div>
                ) : (
                    <div>
                        <Nomap setWeather={setWeather} setMessage={setMessage} setShowAlert={setShowAlert} day={day} loading={loading} setLoading={setLoading} setShowMap={setShowMap}></Nomap>
                        <div className='nomap'>
                            <button className={classname} onClick={() => setShowMap(true)}>open map</button>
                        </div>
                    </div>
                )}
            </div>
            {loading ? (
                <div className="loading">Loading...</div>
            ) :
                (
                    <div>
                        {arr}
                    </div>
                )}
        </div>
    );
}

export default Tab1;