"use client"

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [className, setClassName] = useState<string>("");
  const [grade, setGrade] = useState<string>("");
  const [classDifficulty, setClassDifficulty] = useState<string>("");
  const [numTests, setNumTests] = useState<string>("");
  const [daysUntilNextTest, setDaysUntilNextTest] = useState<string>("");

  const [classes, setClasses] = useState<any>([]);

  return (
    <div className="p-2 space-y-2">
      <h1 className="text-2xl">Welcome to Risk2Reward!</h1>

      <form onSubmit={(e) => {
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
      }} className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Class Name"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          required
          className="p-2 border-transparent border-2 focus:outline-0 focus:border-b-emerald-600 border-b-neutral-600"
        />
        <input
          type="number"
          placeholder="Class Grade"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          className="p-2 border-transparent border-2 focus:outline-0 focus:border-b-emerald-600 border-b-neutral-600"
        />
        <input
          type="number"
          placeholder="Difficulty (1-10)"
          value={classDifficulty}
          onChange={(e) => setClassDifficulty(e.target.value)}
          required
          className="p-2 border-transparent border-2 focus:outline-0 focus:border-b-emerald-600 border-b-neutral-600"
        />
        <input
          type="number"
          placeholder="How many tests left"
          value={numTests}
          onChange={(e) => setNumTests(e.target.value)}
          required
          className="p-2 border-transparent border-2 focus:outline-0 focus:border-b-emerald-600 border-b-neutral-600"
        />
        <input
          type="number"
          placeholder="How many days until next test?"
          value={daysUntilNextTest}
          onChange={(e) => setDaysUntilNextTest(e.target.value)}
          required
          className="p-2 border-transparent border-2 focus:outline-0 focus:border-b-emerald-600 border-b-neutral-600"
        />
        <button type="submit" className="bg-emerald-600 rounded-2xl p-2 active:scale-95 text-white">Add Class</button>
      </form>
      <div className="w-full">
        <h2 className="text-xl">Your Classes</h2>
        <ul>
          {classes && classes.map((c: any, index: number) => (
            <li key={index} className="flex bg-white shadow p-2 rounded-2xl gap-2 justify-start items-center">
              <div className="leading-none p-4 text-lg bg-emerald-600 rounded-xl text-white">{c.grade}</div>
              <div className="leading-none p-4 text-lg">{c.name}</div>
              Difficulty: {c.difficulty}, Tests Left: {c.tests}, Days Until Next Test: {c.days}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
