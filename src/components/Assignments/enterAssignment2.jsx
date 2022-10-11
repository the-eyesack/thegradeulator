import React, {  useState } from "react";
import Assignment from "./assignments";
import { v4 as uuid } from "uuid";
import { useStateWithCallback } from "../useStateWithCallback";

const EnterAssignment2 = (props) => {
  //user inputs
  const [assignmentName, setassignmentName] = useState("");
  const [yourGrade, setyourGrade] = useState("");
  const [maxGrade, setmaxGrade] = useState("");

  const [assignments, setAssignments] = useState([]);

  //the part where it does math
  const [totalGrade, modifyTotalGrade] = useStateWithCallback(0);
  const [maximumGrade, modifyMaximumGrade] = useStateWithCallback(0);
  const [catAvg, setCatAvg] = useState();
  const calculateCatAvg = (x, y) => {
    let p;
    modifyTotalGrade(totalGrade + parseInt(x), (prevValue, newValue) => {
      return (p = newValue);
    });

    modifyMaximumGrade(maximumGrade + parseInt(y), (prevValue, newValue) => {
      console.log("maximumGrade = ", newValue);
      let ca = Math.round((p / newValue) * 100);
      console.log("catAvg = ", ca);
      setCatAvg(ca);
      props.setAverage(ca);
    });
  };

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
    setAssignments((oldList) => [newAssignment, ...oldList]);

    calculateCatAvg(yourGrade, maxGrade);
    //reset inputs
    setassignmentName("");
    setyourGrade("");
    setmaxGrade("");
  };
  return (
    <div>
      <h3>
        Category Average: <h3 className="catAvg">{catAvg}</h3>
      </h3>
      <form onSubmit={handleSubmit}>
        <label>
          {" "}
          Add Assignment:
          <input
            required
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
            autoCapitalize="words"
            autoComplete="off"
            type="number"
            name="assignment-task"
            placeholder="Max Grade"
            value={maxGrade}
            onChange={(e) => setmaxGrade(e.target.value)}
          />
          <input type="submit" value="+" />
        </label>
      </form>
      {/* displaying new assignment */}
      {assignments.map((a) => {
        return (
          <Assignment
            key={a.key}
            name={a.assignmentName}
            yourGrade={a.yourGrade}
            maxGrade={a.maxGrade}
            className="assignment"
          />
        );
      })}
    </div>
  );
};
export default EnterAssignment2