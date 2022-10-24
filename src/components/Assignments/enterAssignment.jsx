import React, {  useEffect, useState } from "react";
import Assignment from "./assignmentTemplate";
import { v4 as uuid } from "uuid";
import  "./enterAssignment.style.css"
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const EnterAssignment = (props) => {
  //user inputs
  const [assignmentName, setassignmentName] = useState("");
  const [yourGrade, setyourGrade] = useState("");
  const [maxGrade, setmaxGrade] = useState("");

  //the part where it does math
  const totalGrade = props.assignmentList.reduce((prev, current) => prev + parseInt(current.yourGrade), 0)
  const maximumGrade = props.assignmentList.reduce((prev, current) => prev + parseInt(current.maxGrade), 0)
  const [catAvg, setCatAvg] = useState();

  const calculateCatAvg = (totalGrade, maximumGrade) => {
    console.log("totalGrade = ", totalGrade)
    console.log("maximumGrade = ", maximumGrade)

    console.log(totalGrade/maximumGrade)
    setCatAvg(totalGrade/maximumGrade * 100)
    props.setAverage(totalGrade/maximumGrade * 100);
  }

  useEffect( ()=>{
      console.log(props.assignmentList.length)

      for(let i = 0; i < props.assignmentList.length; i++) {
        calculateCatAvg(totalGrade, maximumGrade)
      }
  }, [props.assignmentList])

  //average grade variables
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Handling assignment submission...");

    console.log("Assignment submission all good!");

    //creating assignment object
    const newAssignment = {
      key: uuid(),
      assignmentName: assignmentName,
      yourGrade: yourGrade,
      maxGrade: maxGrade,
    };
    props.setAssignmentList((oldList) => [newAssignment, ...oldList]);
    console.log(props.assignmentList)

    //reset inputs
    setassignmentName("");
    setyourGrade("");
    setmaxGrade("");
  };

  return (
    <div className="categoryMeat">
      <h3 className="categoryGrade">
        Category GRADE: <h4>{Math.round(catAvg * 100)/100}</h4>
      </h3>
      <form onSubmit={handleSubmit}>
          <input
              required
              maxLength="50"
              id="assignmentName"
              autoCapitalize="words"
              autoComplete="off"
              type="text"
              name="assignment-task"
              placeholder="Assignment Name"
              value={assignmentName}
              onChange={(e) => setassignmentName(e.target.value)}
          />
          <input
              required
              id="assignmentYourGrade"
              autoCapitalize="words"
              autoComplete="off"
              type="number"
              name="assignment-task"
              placeholder="Your Grade"
              value={yourGrade}
              onChange={(e) => setyourGrade(e.target.value)}
          />
          <input
              required
              id="assignmentMaxGrade"
              autoCapitalize="words"
              autoComplete="off"
              type="number"
              name="assignment-task"
              placeholder="Max Grade"
              value={maxGrade}
              onChange={(e) => setmaxGrade(e.target.value)}
          />
          <button id="addAssignment" type={"submit"}><FontAwesomeIcon icon={faPlus}/></button>
      </form>

       {/*displaying new assignment*/}
      <table>
        <tr className="headers">
          <th id="nameHeader">Name</th>
          <th>Your Grade</th>
          <th>Max Grade</th>
          <th>Percentage</th>
        </tr>
      {props.assignmentList.map((a) => {
          return (
                <Assignment
                    // key={a.key}
                    name={a.assignmentName}
                    yourGrade={a.yourGrade}
                    maxGrade={a.maxGrade}
                />
          );
        })}
      </table>


    </div>
  );
};
export default EnterAssignment