import React, { useState } from 'react';
import './App.css';
import EnterCategory from './components/Categories/enterCategory';

function App() {

  const [catInfo, setcatInfo] = useState([]);
  let catList = []
  catList.push([catInfo])

  return (
    <div>
      <h1>THE GRADEULATOR</h1>
      
      <EnterCategory setcatInfo={setcatInfo}/>
    </div>
  );
}

export default App;