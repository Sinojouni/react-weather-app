import React, { useState,useEffect } from 'react'
import "./sidebar.css";

const Sidebar = ({ isOpen, toggleSidebar, setActiveTab }) => {
  const [classname, setClassname] = useState("");

  useEffect(
    () => {
      if (isOpen) { setClassname("sidebar open"); } else { setClassname("sidebar") }
    }, [isOpen]
  )
  return (
    <div className={classname}>
      <button className="close-btn" onClick={toggleSidebar}>×</button>
      <ul>
        <li onClick={() => { setActiveTab("weather"); toggleSidebar(); }}>🌤 Weather</li>
        <li onClick={() => { setActiveTab("model"); toggleSidebar(); }}>🤖 Beirut Model</li>
        <li onClick={() => { setActiveTab("train"); toggleSidebar(); }}>🗺 Train and predict</li>
      </ul>
    </div>
  );
};

export default Sidebar;
