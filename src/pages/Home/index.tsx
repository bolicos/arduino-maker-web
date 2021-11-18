import React from "react";
import arduino from "@/assets/images/arduino.svg";
import "./index.scss";

const Home: React.FC = () => {

  return (
    <div className="Home">
      <header className="Home-header">
        <img src={arduino} className="Home-arduino" alt="arduino" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className="Home-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
};

export default Home;
