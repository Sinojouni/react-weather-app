import React, { useEffect, useState } from "react";
import "./App.css";
import "./sidebar.css";
import Sidebar from "./menubar.js";
import Header from "./header";
import Tab1 from "./tab1";
import Tab2 from "./tab2";
import Tab3 from "./tab3";
import Alert from "./alert";

const App = () => {

  const [currweather, setCurrweather] = useState(null);
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [day, setDay] = useState(true);
  const [appclass, setAppclass] = useState("");
  const [alr, setAlr] = useState([]);
  const [imgclass, setImgclas] = useState("");

  const [showSidebar, setShowSidebar] = useState(false);
  const [activeTab, setActiveTab] = useState("weather");

  useEffect(
    () => {
      function getmylocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            const url = `https://weather-proxy-production.up.railway.app/api/weather/LatLon?lat=${latitude}&lon=${longitude}`;
            try {
              const res = await fetch(url);
              const data = await res.json();
              if (data != null && data.dt) {
                if (data.dt > data.sys.sunset || data.dt < data.sys.sunrise) { setDay(false) }
                setCurrweather(data);
              }
              if (data != null && data.cod) {
                if (data.cod === '404') { setMessage("Faild to featch api"); setShowAlert(true); }
              }
            } catch (error) {
              console.error(error);
            }
          },
            (error) => {
              console.error("Error getting location:", error.message);
              setMessage("Error getting location or connection problem"); setShowAlert(true);
            });
        } else {
          console.error("Geolocation is not supported by this browser.");
        }
      }
      getmylocation();
    }, []
  )

  useEffect(
    () => {
      if (day) {
        setAppclass(""); setImgclas("img-day");
      } else {
        setImgclas(""); setAppclass("app img-nig");
      }
    }, [day]
  )

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  const closeAlert = () => {
    setShowAlert(false);
  };

  useEffect(() => {
    if (showAlert) {
      setAlr([<Alert key={0} mess={message} closeAlert={closeAlert} />]);
    } else {
      setAlr([]);
    }
  }, [showAlert, message]);

  const toggleday = () => {
    setDay(prevDay => !prevDay);
  };


  return (
    <div className={appclass}>
      <Header curr={currweather} day={day} toggleday={toggleday} />
      <button onClick={toggleSidebar} className="hamburger">
        ☰
      </button>
      <Sidebar isOpen={showSidebar} toggleSidebar={toggleSidebar} setActiveTab={setActiveTab} />
      <div>
        {activeTab === "weather" && <Tab1 day={day} setMessage={setMessage} setShowAlert={setShowAlert} imgclass={imgclass} ></Tab1>}
        {activeTab === "model" && <Tab2 />}
        {activeTab === "train" && <Tab3 />}
      </div>
      <div>
        {alr}
      </div>
    </div>
  );
};


export default App;

