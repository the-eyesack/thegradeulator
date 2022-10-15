import React, { useState } from "react";
import EnterAssignment from "../Assignments/enterAssignment";
import './categoryTemplate.style.css';
const Category = React.memo((props) => {
  const [avg, setAverage] = useState(0);

  const updatedCat = {
    name: props.name,
    weight: props.weight,
    average: avg,
  };
  props.getNewCat((oldList) => [updatedCat, ...oldList]);

  return (
    <div className="categoryDiv">
      <h1 className="categoryHeader">{props.name}</h1>
      <h2>Weight: {props.weight}%</h2>
      <EnterAssignment setAverage={setAverage} />
    </div>
  );
});

export default Category;