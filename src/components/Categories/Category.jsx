import React, { useState } from "react";
import EnterAssignment2 from "../Assignments/enterAssignment2";

const Category = React.memo((props) => {
  const [avg, setAverage] = useState(0);

  const updatedCat = {
    name: props.name,
    weight: props.weight,
    average: avg,
  };
  props.getNewCat((oldList) => [updatedCat, ...oldList]);

  return (
    <div>
      <h1 className="categoryHeader">Name: {props.name}</h1>
      <h2>Weight: {props.weight}%</h2>
      <EnterAssignment2 setAverage={setAverage} />
      <br />
      -----------
    </div>
  );
});

export default Category;