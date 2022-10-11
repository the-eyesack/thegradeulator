import React, { useState } from 'react';
import './App.css';
import EnterCategory from './components/Categories/enterCategory';
import CalculateButton from "./components/calculate"

function App() {

  const [catInfo, setcatInfo] = useState([]);
  const [catGrade, setCatGrade] = useState([])
  let catList = []
  catList.push([catInfo])

  return (
    <div>
      <h1>GRADE CALCULATOR</h1>
      
      <EnterCategory setcatInfo={setcatInfo} setCatGrade={setCatGrade}/>
    </div>
  );
}

export default App;
