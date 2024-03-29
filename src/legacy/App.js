import React from 'react';
import firebase from 'firebase';
import logo from './logo.svg';
import './App.css';
import HideText from '../views/Tempapp/legacy/HideText';
import AutoComplete from "../views/Tempapp/legacy/AutoComplete";
import IntegrationAutosuggest from "../views/Tempapp/legacy/IntegrationAutosuggest";
import DbUpdate from "../views/Tempapp/legacy/dbUpdate"

//<script src="https://www.gstatic.com/firebasejs/5.10.1/firebase.js"></script>
//Initialized firebase
firebase.initializeApp({
  apiKey: "AIzaSyDBgYHAo60KllU1Iecxyw6z0GNPqU0eSUw",
  authDomain: "pd-diary.firebaseapp.com",
  databaseURL: "https://pd-diary.firebaseio.com",
  projectId: "pd-diary",
  storageBucket: "pd-diary.appspot.com",
  messagingSenderId: "482238828132"
});

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

function App() {
  return (
    <div className="App">

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello, world</p>
        <HideText text="Temptext"/>
      </header>

      <div>
        <DbUpdate database={db}/>
        <AutoComplete />
        <div style={{width:"50%", margin:"auto"}}>
          <IntegrationAutosuggest placeholder="I'm feeling lucky!"/>
          <IntegrationAutosuggest placeholder="Hello switt!"/>
          <IntegrationAutosuggest placeholder="Hello CP!"/>
          <IntegrationAutosuggest placeholder="Hello Swamp!"/>
          <IntegrationAutosuggest placeholder="Hello Aj!"/>
          <IntegrationAutosuggest placeholder="Hello Something!"/>
        </div>
      </div>
    </div>
  );
}

export default App;
