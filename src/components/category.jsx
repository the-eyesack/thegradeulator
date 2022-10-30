import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- i

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

  const removeAssignment = (key, categoryId) => {
    props.removeAssignment(key, categoryId)
  }

  return (
    <div className="ml-2">
      <h1 className="categoryHeader">
        <h2 className="text-4xl mt-4 uppercase font-black inline-block">
          {props.name}
        </h2>
        <h2 className="inline-block text-xl ml-2 font-bold text-secondary">
          {" "}
          WEIGHT: {props.weight}% |
        </h2>
        <h2 className="inline-block text-xl ml-2 font-bold text-secondary">
          GRADE: {Math.round(props.average * 100) / 100}
        </h2>
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
              className="input"
              required
              maxLength="50"
              autoCapitalize="words"
              autoComplete="off"
              type="text"
              name="assignment-task"
              placeholder="Assignment Name"
              value={assignmentName}
              onChange={(e) => setassignmentName(e.target.value)}
          />
          <input
              className="input"
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
              className="input"
              required
              autoCapitalize="words"
              autoComplete="off"
              type="number"
              name="assignment-task"
              placeholder="Max Grade"
              value={maxGrade}
              onChange={(e) => setmaxGrade(e.target.value)}
          />
        </div>
          <button className="plus-button" type={"submit"}>
            <FontAwesomeIcon icon={solid('plus')} />
          </button>
      </form>
      <table className="table-fixed w-[45%]">
        <tr>
          <th className="border-r-2 border-primary w-1/2">Name</th>
          <th>Your Grade</th>
          <th>Max Grade</th>
          <th>Percentage</th>
        </tr>
        {props.assignments.map((assignment) => (
          <tr>
            <td className="border-r-2">{assignment.name}</td>
            <td className="text-center">{assignment.yourGrade}</td>
            <td className="text-center">{assignment.maxGrade}</td>
            <td className="text-center">
              {Math.round(
                (assignment.yourGrade / assignment.maxGrade) * 10000
              ) / 100}
              %
            </td>
            <button onClick={ (e)=> {
              e.preventDefault();
              removeAssignment(assignment.key, props.id)
            } }><FontAwesomeIcon icon={solid('trash')} className="opacity-25 hover:opacity-100"/></button>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default Category;