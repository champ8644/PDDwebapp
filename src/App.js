import React from 'react';
import logo from './logo.svg';
import './App.css';
import HideText from './component/HideText';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello, world</p>
      </header>

      <body>
        <HideText text="Temptext"/>
      </body>
    </div>
  );
}

export default App;
