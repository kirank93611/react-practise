import { useEffect, useState } from 'react';
import './App.css';
import Axios from 'axios';
import Header from './components/Header';
import Nav from './components/Nav';

function App() {
  //Setting up the initial state using the react hook "useState"
  return(
    <div>
      <Header/>
      <Nav/>
    </div>
  )
}


export default App;
