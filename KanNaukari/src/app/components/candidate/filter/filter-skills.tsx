import React from "react";
import candidate_data from "@/data/candidate-data";
import NiceSelect from "@/ui/nice-select";

const Filterskills = () => {
  const uniqueskills = [...new Set(candidate_data.flatMap((c) => c.skills))];
  const options = uniqueskills.map((c) => {
    return { value: c, label: c };
  });
  const handleskills = (item: { value: string; label: string }) => {};
  return (
    <NiceSelect
      options={options}
      defaultCurrent={0}
      onChange={(item) => handleskills(item)}
      cls="bg-white"
      name="category"
    />
  );
};

export default Filterskills;
