//App.js

import React from 'react';
import './styles.css';
import Header from './components/Header';
import Nav from './components/Nav';
import Main from './components/Main';

function App() {
  return (
    <div>
      <Header />
      <div class="main-container">
      <Nav />
      <Main />
      </div>
    </div>
  );
}

export default App;
