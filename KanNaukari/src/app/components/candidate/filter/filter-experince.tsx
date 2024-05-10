import React, { useState } from "react";
import candidate_data from "@/data/candidate-data";

const FilterCandidateExperience = () => {
  const uniqueExperiences = [
    ...new Set(candidate_data.map((c) => c.Experience)),
  ];
  const [Experience, setExperience] = useState<string[]>([]);
  // handle Experience
  const handleExperience = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newExperience = e.target.value;
    if(Experience.includes(newExperience)){
      const remaining = Experience.filter(e => e !== newExperience)
      setExperience(remaining)
    }
    else {
      setExperience(prevExperience => [...prevExperience, newExperience]);
    }
  };
  return (
    <ul className="style-none filter-input">
      {uniqueExperiences.map((e, index) => (
        <li key={index}>
          <input
            onChange={(event) => handleExperience(event)}
            type="checkbox"
            name={e}
            defaultValue={e}
            checked={Experience.includes(e)}
          />
          <label>{e}</label>
        </li>
      ))}
    </ul>
  );
};

export default FilterCandidateExperience;
