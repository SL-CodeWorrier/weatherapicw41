import React, { useState } from "react";
import "./App.css";
import MapContainer from "./components/map_container";

const App = () => {

  return (
    <div className="container" style={{display: "flex", flexDirection:"column",padding: "20px", justifyContent: "center", alignItems:"center", gap: "20px"}}>
            <MapContainer />
    </div>
  );
};

export default App;
