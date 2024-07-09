import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';
import CreateDeck from './CreateDeck.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router basename='/'>
    <Routes>
      <Route path='/' element={<Homepage/>} />
      <Route path='/new-deck' element={<CreateDeck/>}/>
    </Routes>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
