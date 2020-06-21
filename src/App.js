import React from 'react';
import Screen from './components/Screen';
import Controls from './components/Controls';
import { controls } from './state/state';
import { Provider } from 'react-redux';
import './App.css';

function App() {
  return (
    <div className="App">
      <Provider store={ controls }>
        <Screen />
        <Controls />
      </Provider>
    </div>
  );
}

export default App;
