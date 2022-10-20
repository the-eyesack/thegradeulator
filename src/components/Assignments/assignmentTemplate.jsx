import React from "react";
import "./assignmentTemplate.style.css"

const AssignmentTemplate = React.memo((props) => {
  console.log("ASSIGNMENT " + JSON.stringify(props));
  return (
      <tr>
          <td id="name">{props.name}</td>
          <td>{props.yourGrade}</td>
          <td>{props.maxGrade}</td>
          <td>{Math.round((props.yourGrade / props.maxGrade) * 100)}%</td>
      </tr>
  );
});

export default AssignmentTemplate;