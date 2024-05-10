import NiceSelect from "@/ui/nice-select";
import React from "react";

const SpecializationSelect = () => {
  const handleSpecialization = (item: { value: string; label: string }) => {};
  return (
    <NiceSelect
      options={[
        { value: "mathematic", label: "Mathematics" },
        { value: "computer_science", label: "Computer Science" },
        { value: "social_science", label: "Social Science" },
        { value: "science", label: "Science" },
        { value: "statestics", label: "Statestics" },
        { value: "language", label: "Language" },
        // { value: "social_science", label: "Social Science" },
        // { value: "social_science", label: "Social Science" },
        // { value: "social_science", label: "Social Science" },
        // { value: "social_science", label: "Social Science" },
        // { value: "social_science", label: "Social Science" },
        // { value: "social_science", label: "Social Science" },
        // { value: "social_science", label: "Social Science" },
      ]}
      defaultCurrent={0}
      onChange={(item) => handleSpecialization(item)}
      name="Specialization"
    />
  );
};

export default SpecializationSelect;