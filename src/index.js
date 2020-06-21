import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import initGame from './game/gameOfLife.js';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

initGame();
