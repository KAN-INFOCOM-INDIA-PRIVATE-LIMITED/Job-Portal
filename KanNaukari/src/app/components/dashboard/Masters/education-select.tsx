import NiceSelect from "@/ui/nice-select";
import React from "react";

const EducationSelect = () => {
  const handleEducation = (item: { value: string; label: string }) => {};
  return (
    <NiceSelect
      options={[
        { value: "ssc", label: "Secondary School Certificate" },
        { value: "hsc", label: "Higher Secondary Certificate" },
        { value: "graduation", label: "Graduation" },
        { value: "diploma", label: "Diploma" },
        { value: "post_graduation", label: "Post Graduation" },
        { value: "Other", label: "Other" },
      ]}
      defaultCurrent={0}
      onChange={(item) => handleEducation(item)}
      name="Education"
    />
  );
};

export default EducationSelect;