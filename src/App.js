import React, { useState } from 'react';
import './App.css';
import EnterCategory from './components/Categories/enterCategory';
import CalculateButton from "./components/calculate"

function App() {

  const [catInfo, setcatInfo] = useState([]);
  let catList = []
  catList.push([catInfo])
  console.log("catlist: ", catList)

  let totalGrade

  function handleSubmit() {
    console.log(catList)
    console.log("There are ", catList.length, " categories.")
    for (let i = 0; i < catList.length; i++) {
      console.log(catList[i]['average'])
      console.log(catList[i]['weight'])
      totalGrade += catList[i]['average'] * (catList[i]['weight'] * 0.01)
    }
    console.log(totalGrade)
  }
 

  return (
    <div>
      <h1>GRADE CALCULATOR</h1>
      <h2>Total Grade: </h2>
      <EnterCategory setcatInfo={setcatInfo}/>
      <button type={"submit"} onClick={handleSubmit}>Calculate!</button>
    </div>
  );
}

export default App;
