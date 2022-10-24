import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Category = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleAssignmentUpdate(props.id, yourGrade, maxGrade, assignmentName);
    setassignmentName("");
    setyourGrade("");
    setmaxGrade("");
  };
  const [assignmentName, setassignmentName] = useState("");
  const [yourGrade, setyourGrade] = useState("");
  const [maxGrade, setmaxGrade] = useState("");

  return (
    <div className="categoryDiv">
      <h1 className="categoryHeader">
        {props.name} <h2> WEIGHT: {props.weight}%</h2>
      </h1>
      <form onSubmit={handleSubmit}>
        <label className="">
          <input
              className="input-left"
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
              className="border-t-4 border-b-4 border-main text-center text-xl"
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
              className="input-right"
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
          <button className="plus-button" type={"submit"}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </label>
      </form>
      <div className="categoryGrade">
        CATEGORY GRADE: {Math.round(props.average * 100) / 100}
      </div>

      <table>
        <tr className="tableHeaders">
          <th id="nameHeader">Name</th>
          <th>Your Grade</th>
          <th>Max Grade</th>
          <th>Percentage</th>
        </tr>
        {props.assignments.map((assignment) => (
          <tr>
            <td id="assignmentName">{assignment.name}</td>
            <td>{assignment.yourGrade}</td>
            <td>{assignment.maxGrade}</td>
            <td>
              {Math.round(
                (assignment.yourGrade / assignment.maxGrade) * 10000
              ) / 100}
              %
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default Category;
