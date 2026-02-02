"use client";

import { useState } from "react";
import useCookie from "../util/cookies";

type schoolClass = {
  name: string,
  grade: number,
  difficulty: number,
  tests: number,
  days: number,
}

export default function Home() {
  const [className, setClassName] = useState<string>("");
  const [grade, setGrade] = useState<string>("");
  const [classDifficulty, setClassDifficulty] = useState<string>("");
  const [numTests, setNumTests] = useState<string>("");
  const [daysUntilNextTest, setDaysUntilNextTest] = useState<string>("");

  const [deleteMode, setDeleteMode] = useState<boolean>(false);
  const [calculateMode, setCalculateMode] = useState<boolean>(false);

  const [classes, setClasses] = useCookie<schoolClass[]>("classes", []);
  const [risks, setRisks] = useState<number[]>([]);

  function gradeColor(grade: number) {
    if (grade >= 90) return "bg-green-500 text-white";
    if (grade >= 80 && grade <= 89.49) return "bg-blue-500 text-white";
    if (grade >= 70 && grade <= 79.99) return "bg-orange-500 text-white";
    return "bg-red-500 text-white";
  }

  function calculateRisk(
    classDifficulty: number,
    numTests: number,
    daysUntilNextTest: number,
    grade: number
  ) {
    return (classDifficulty * numTests) / (daysUntilNextTest + 1) - grade / 100;
  }

  const handleClassClick = (index: number) => {
    if (deleteMode) {
      setClasses(classes.filter((_, i) => i !== index));
      setRisks(risks.filter((_, i) => i !== index));
    } else if (calculateMode) {
      const c = classes[index];
      const riskValue = calculateRisk(c.difficulty, c.tests, c.days, c.grade);
      const newRisks = [...risks];
      newRisks[index] = riskValue;
      setRisks(newRisks);
    }
  };

  return (
    <div className="p-4 space-y-4 max-w-3xl mx-auto">
      <h1 className="text-2xl text-center font-bold">Welcome to Risk2Reward!</h1>

      <div className="flex gap-4 justify-center">
        <button
          className="bg-violet-600 rounded-2xl p-3 active:scale-95 text-white font-bold"
          onClick={() => setCalculateMode(!calculateMode)}
        >
          {calculateMode ? "Hide Risk Calculation" : "Show Risk Calculation"}
        </button>

        <button
          className="bg-red-600 rounded-2xl p-3 active:scale-95 text-white font-bold"
          onClick={() => setDeleteMode(!deleteMode)}
        >
          {deleteMode ? "Exit Delete Mode" : "Remove A Class"}
        </button>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const newClass = {
            name: className || "Unnamed Class",
            grade: grade ? parseFloat(grade) : 0,
            difficulty: classDifficulty ? parseInt(classDifficulty) : 5,
            tests: numTests ? parseInt(numTests) : 0,
            days: daysUntilNextTest ? parseInt(daysUntilNextTest) : 0,
          };
          setClasses([...classes, newClass]);
          setClassName("");
          setGrade("");
          setClassDifficulty("");
          setNumTests("");
          setDaysUntilNextTest("");
        }}
        className="flex flex-col gap-2"
      >
        <input
          type="text"
          placeholder="Class Name"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          required
          className="p-2 border-2 border-transparent focus:outline-none focus:border-b-emerald-600 border-b-neutral-600 rounded"
        />
        <input
          type="number"
          placeholder="Class Grade"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          className="p-2 border-2 border-transparent focus:outline-none focus:border-b-emerald-600 border-b-neutral-600 rounded"
        />
        <input
          type="number"
          placeholder="Difficulty (1-10)"
          value={classDifficulty}
          onChange={(e) => setClassDifficulty(e.target.value)}
          required
          className="p-2 border-2 border-transparent focus:outline-none focus:border-b-emerald-600 border-b-neutral-600 rounded"
        />
        <input
          type="number"
          placeholder="How many tests left"
          value={numTests}
          onChange={(e) => setNumTests(e.target.value)}
          required
          className="p-2 border-2 border-transparent focus:outline-none focus:border-b-emerald-600 border-b-neutral-600 rounded"
        />
        <input
          type="number"
          placeholder="How many days until next test?"
          value={daysUntilNextTest}
          onChange={(e) => setDaysUntilNextTest(e.target.value)}
          required
          className="p-2 border-2 border-transparent focus:outline-none focus:border-b-emerald-600 border-b-neutral-600 rounded"
        />
        <button
          type="submit"
          className="bg-emerald-600 rounded-2xl p-2 active:scale-95 text-white font-bold cursor-pointer"
        >
          Add Class
        </button>
      </form>

      <div>
        <h2 className="text-xl font-semibold">Your Classes</h2>
        <ul className="space-y-2">
          {classes && classes.map((c, index) => (
            <li
              key={index}
              onClick={() => handleClassClick(index)}
              className={`flex flex-col md:flex-row bg-white shadow p-2 rounded-2xl gap-2 justify-between items-center cursor-pointer pr-6 ${deleteMode ? "hover:bg-red-100" : "hover:bg-gray-100"}`}
            >
              <div className="flex flex-col md:flex-row items-center gap-2">
                <div
                  className={`leading-none p-4 text-lg ${gradeColor(c.grade)} rounded-xl min-w-[60px] text-center`}
                >
                  {c.grade}
                </div>
                <div className="text-lg font-medium text-black">{c.name}</div>
                <div className="text-sm text-black">
                  Difficulty: {c.difficulty} | Tests Left: {c.tests} | Days Until Next Test: {c.days}
                </div>
              </div>
              {risks[index] !== undefined && (
                <div className="text-sm font-semibold text-red-700">
                  Risk: {risks[index]?.toFixed(2)}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}



