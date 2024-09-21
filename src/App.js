import { useEffect, useState } from 'react';
import './App.css';
import Axios from 'axios';
import Header from './components/Header';
import Nav from './components/Nav';
import Main from './components/Main';

function App() {
  //Setting up the initial state using the react hook "useState"
  return(
    <div>
      <Header/>
      <div className="main-container">
      <Nav/>
      <Main/>
      </div>
    </div>
  )
}


export default App;
