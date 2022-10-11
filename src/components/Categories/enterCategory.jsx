import React, { useState } from "react";
import Category from "./Category";
import { v4 as uuid } from "uuid";

function EnterCategory(props) {
  const [catName, setcatName] = useState("");
  const [catWeight, setcatWeight] = useState("");
  const [categories, setCategories] = useState([]);
  let allGood = false;

  const handleSubmit = (e) => {
    e.preventDefault();
    let totalWeight = 0;
    if (catWeight <= 100 && totalWeight <= 100) {
      allGood = true;
    }
    if (catWeight < 1) {
      allGood = false;
    }
    if (allGood) {
      //creating object to go into the array
      let newCat = {
        key: uuid(),
        name: catName,
        weight: catWeight,
        average: 0,
      };
      totalWeight += parseInt(newCat["weight"]);
      console.log("totalWeight = ", totalWeight);
      //adding it into array
      setCategories((oldList) => [newCat, ...oldList]);
      setcatName("");
      setcatWeight("");
    } else alert("Something went wrong!");
  };

  const [updatedCats, setUpdatedCats] = useState([]);
  const [fg, sfg] = useState(0);

  let finalGrade = 0;
  function handleCalculate() {
    //removing duplicates from updatedCats

    const uniqueCats = [];

    const unique = updatedCats.filter((element) => {
      const isDuplicate = uniqueCats.includes(element.name);

      if (!isDuplicate) {
        uniqueCats.push(element.name);

        return true;
      }

      return false;
    });

    console.log("unique = ", unique);

    finalGrade = 0;
    console.log("calculating final grade...");
    for (let i = 0; unique.length; i++) {
      let categoryAverage = unique[i]["average"];
      let categoryWeight = unique[i]["weight"];
      finalGrade += categoryAverage * categoryWeight * 0.01;
      console.log("finalGrade = ", finalGrade);
      sfg(finalGrade);
    }
  }

  return (
    <div>
      <h1>YOUR GRADE IS {fg}%</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter Category Name:
          <input
            required
            autoCapitalize="words"
            autoComplete="off"
            type="text"
            name="cat-name"
            value={catName}
            onChange={(e) => {
              setcatName(e.target.value);
              e.preventDefault();
            }}
          />
          <br />
          Enter Category Weight:
          <input
            required
            autoComplete="off"
            type="number"
            name="cat-name"
            value={catWeight}
            onChange={(e) => setcatWeight(e.target.value)}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>

      <div id="display-categories">
        {/* Displaying the newly made category */}
        {categories.map((cat) => {
          return (
            <Category
              key={cat.key}
              name={cat.name}
              weight={cat.weight}
              getNewCat={setUpdatedCats}
              className="category"
            />
          );
        })}
      </div>
      <button type={"submit"} onClick={handleCalculate}>
        Calculate!
      </button>
    </div>
  );
}
export default EnterCategory;