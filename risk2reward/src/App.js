import './App.css';
import React, { useState } from "react";

function App() {
  const [className, setClassName] = useState("");
  const [grade, setGrade] = useState("");
  const [classDifficulty, setClassDifficulty] = useState("");
  const [numTests, setNumTests] = useState("");
  const [daysUntilNextTest, setDaysUntilNextTest] = useState("");

  const [classes, setClasses] = useState([]);

  const submit = (e) => {
    e.preventDefault();

    const newClass = {
      name: className || "Unnamed Class",
      grade: grade ? parseInt(grade) : 0,
      difficulty: classDifficulty ? parseInt(classDifficulty) : 5,
      tests: numTests ? parseInt(numTests) : 0,
      days: daysUntilNextTest ? parseInt(daysUntilNextTest) : 0
    };

    setClasses([...classes, newClass]);

    setClassName("");
    setGrade("");
    setClassDifficulty("");
    setNumTests("");
    setDaysUntilNextTest("");
  };

  return (
    <div>
      <h1> Welcome to Risk2Reward!</h1>

      <form onSubmit={submit}>
        <input
          type="text"
          placeholder="Class Name"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Class Grade"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
        />
        <input
          type="number"
          placeholder="Difficulty (1-10)"
          value={classDifficulty}
          onChange={(e) => setClassDifficulty(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="How many tests left"
          value={numTests}
          onChange={(e) => setNumTests(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="How many days until next test?"
          value={daysUntilNextTest}
          onChange={(e) => setDaysUntilNextTest(e.target.value)}
          required
        />
        <button type="submit">Add Class</button>
      </form>

      <h2>Your Classes:</h2>
      <ul>
        {classes.map((c, index) => (
          <li key={index}>
            {c.name} - Grade: {c.grade}, Difficulty: {c.difficulty}, Tests Left: {c.tests}, Days Until Next Test: {c.days}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
