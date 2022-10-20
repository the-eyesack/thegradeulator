import React, {  useEffect, useState } from "react";
import Assignment from "./assignmentTemplate";
import { v4 as uuid } from "uuid";
import { useStateWithCallback } from "../useStateWithCallback";
import  "./enterAssignment.style.css"
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const EnterAssignment = (props) => {
  //user inputs
  const [assignmentName, setassignmentName] = useState("");
  const [yourGrade, setyourGrade] = useState("");
  const [maxGrade, setmaxGrade] = useState("");

  const [assignments, setAssignments] = useState([]);

  //the part where it does math
  const [totalGrade, modifyTotalGrade] = useStateWithCallback(0);
  const [maximumGrade, modifyMaximumGrade] = useStateWithCallback(0);
  const [catAvg, setCatAvg] = useState();

  const calculateCatAvg = (yourGrade, maxGrade) => {
    let p;
    modifyTotalGrade(totalGrade + parseInt(yourGrade), (prevValue, newValue) => {
      return (p = newValue);
    });

    modifyMaximumGrade(maximumGrade + parseInt(maxGrade), (prevValue, newValue) => {
      console.log("maximumGrade = ", newValue);
      let ca = (p / newValue) * 100;
      console.log("catAvg = ", ca);
      setCatAvg(ca);
      props.setAverage(ca);
    });
  };

  useEffect(() => {
    let assignmentList = props.assignmentList
    console.log("assignmentList = ", assignmentList);
    setAssignments(assignmentList)

    for(let i = 0; i < assignmentList.length; i++) {
      console.log(assignmentList[i]['yourGrade'])
      //TODO: calculateCatAvg values get overriden, try using something similar to const totalWeight = categories.reduce((acc, curr) => acc + parseInt(curr.weight), 0)
      calculateCatAvg(assignmentList[i]['yourGrade'], assignmentList[i]['maxGrade']);
    }
  }, [])

  //average grade variables
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Handling assignment submission...");

    console.log("Assignment submission all good!");

    //creating assignment object
    const newAssignment = {
      assignmentName: assignmentName,
      yourGrade: yourGrade,
      maxGrade: maxGrade,
    };
    setAssignments((oldList) => [newAssignment, ...oldList]);

    calculateCatAvg(yourGrade, maxGrade);
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
        <label className="enterAssignment">
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
        </label>
      </form>

      {/* displaying new assignment */}
      <table>
        <tr className="headers">
          <th id="nameHeader">Name</th>
          <th>Your Grade</th>
          <th>Max Grade</th>
          <th>Percentage</th>
        </tr>
      {assignments.map((a) => {
          return (
                <Assignment
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