import React from 'react';
import logo from './logo.svg';
import './App.css';
import HideText from './component/HideText';
import AutoComplete from "./component/AutoComplete";

function App() {
  return (
    <div className="App">
      {/*
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello, world</p>
        <HideText text="Temptext"/>
      </header>
      */}

      <body>
        
        <AutoComplete />
      </body>
    </div>
  );
}

export default App;
