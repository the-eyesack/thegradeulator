import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import Category from "./components/category";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuid } from "uuid";
const CryptoJS = require("crypto-js");

function App(props) {
  const [catName, setcatName] = useState("");
  const [catWeight, setcatWeight] = useState("");
  const [categories, setCategories] = useState([]);

  const totalWeight = categories.reduce(
    (acc, curr) => acc + parseInt(curr.weight),
    0
  );
  const handleSubmit = (e) => {
    e.preventDefault();

    const shouldUpdate =
      totalWeight <= 100 &&
      catWeight <= 100 &&
      totalWeight + parseInt(catWeight) <= 100;
    if (shouldUpdate) {
      let newCat = {
        id: uuid(),
        name: catName,
        weight: catWeight,
        yourGrade: 0,
        maxGrade: 0,
        average: 0,
        assignments: [],
      };

      //adding it into array
      setCategories((oldList) => [newCat, ...oldList]);
      setcatName("");
      setcatWeight("");
    } else {
      alert("Something went wrong!");
    }
  };

  const [datakey, setDatakey] = useState();
  const secondPtSaveKey = "th4%k5p03Ta&";
  const handleLoad = (e) => {
    e.preventDefault();

    var decrypted = CryptoJS.AES.decrypt(datakey, saveKey + secondPtSaveKey);
    try {
      JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
    } catch (error) {
      alert("Incorrect Credentials.");
    }
    let parsed = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));

    setCategories(
      parsed.map((category) => {
        let totalYourGrade = 0;
        let totalMaxGrade = 0;

        for (
          let assignment = 0;
          assignment < category["assignments"].length;
          assignment++
        ) {
          let currentAssignment = category["assignments"][assignment];
          totalYourGrade += parseInt(currentAssignment["yourGrade"]);
          totalMaxGrade += parseInt(currentAssignment["maxGrade"]);
        }

        return {
          ...category,
          average: Math.round((totalYourGrade / totalMaxGrade) * 10000) / 100,
          yourGrade: totalYourGrade,
          maxGrade: totalMaxGrade,
        };
      })
    );
  };

  const [saveKey, setSaveKey] = useState();
  const exportSave = (e) => {
    e.preventDefault();
    let genSaveKey = JSON.stringify(Math.round(Math.random() * 10000));

    let encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(categories),
      genSaveKey + secondPtSaveKey
    ).toString();
    navigator.clipboard.writeText(encrypted);
    alert("Save key copied to clipboard. Your passcode is " + genSaveKey);
  };

  //updating assignments
  const [totalGrade, setTotalGrade] = useState(0);
  const handleAssignmentUpdate = (
    id,
    yourGradeToAdd,
    maxGradeToAdd,
    assignmentName
  ) => {
    setCategories(
      categories.map((category) => {
        let newYourGrade = category.yourGrade + parseInt(yourGradeToAdd);
        let newMaxGrade = category.maxGrade + parseInt(maxGradeToAdd);
        let newAssignment = {
          key: uuid(),
          name: assignmentName,
          yourGrade: parseInt(yourGradeToAdd),
          maxGrade: parseInt(maxGradeToAdd),
        };
        let newAverage = newYourGrade / newMaxGrade;

        if (category.id === id) {
          return {
            ...category,
            average: newAverage * 100,
            yourGrade: newYourGrade,
            maxGrade: newMaxGrade,
            assignments: [newAssignment, ...category.assignments],
          };
        } else {
          return category;
        }
      })
    );
  };

  //calculate final grade
  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    let grade = 0;
    for (let i = 0; i < categories.length; i++) {
      grade += Math.round(categories[i].average * categories[i].weight) / 100;
    }
    setTotalGrade(grade);
  }, [categories]);

  return (
    <div>
      <div className="border-t-4 border-main pt-4">
        <div className="text-[12em] inline-block text-main/70 font-black absolute right-10 top-40">
          {Math.round(totalGrade * 100) / 100}%
        </div>
        <form onSubmit={handleSubmit}>
          <label>
            <input
              className="ml-2 input-left"
              id="catNameInput"
              required
              maxLength="50"
              placeholder="Enter Category Name"
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
            <input
              className="input-right"
              id="catWeightInput"
              required
              maxLength="3"
              placeholder="Weight (% of 100)"
              autoComplete="off"
              type="number"
              name="cat-name"
              value={catWeight}
              onChange={(e) => setcatWeight(e.target.value)}
            />
          </label>
          <button className="plus-button">
            <FontAwesomeIcon icon={faPlus} className="text-white" />
          </button>
        </form>
      </div>

      <div id="display-categories">
        {categories.map((category) => (
          <Category
            id={category.id}
            {...category}
            handleAssignmentUpdate={handleAssignmentUpdate}
            setCategories={setCategories}
          />
        ))}
      </div>

      {/* "saving" */}
      <div className="absolute inline-block text-center right-20 top-[10vh]">
        <form onSubmit={handleLoad}>
          <input
            className="input-left"
            required
            placeholder="Enter Key"
            type="text"
            value={datakey}
            onChange={(e) => setDatakey(e.target.value)}
          />
          <input
            className="input-right"
            placeholder="Enter Passcode"
            type="number"
            value={saveKey}
            onChange={(e) => setSaveKey(e.target.value)}
            required
          />
          <button className="plus-button">
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </form>
        <button
          className=" plus-button mt-2 text-xl"
          type="button"
          onClick={exportSave}
        >
          Export Data!
        </button>
      </div>
    </div>
  );
}

export default App;