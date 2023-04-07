import React from 'react';
import './App.css';
import { Registration } from './components';
import DailyFoodGuide from './pages/DailyFoodGuide/DailyFoodGuide';

function App() {
  return (
    <div className="App">
      <Registration></Registration>
      <DailyFoodGuide />
    </div>
  );
}

export default App;
