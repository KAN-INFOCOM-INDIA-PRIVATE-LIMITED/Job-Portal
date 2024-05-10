import NiceSelect from "@/ui/nice-select";
import React from "react";

const GenderSelect = () => {
  const handleGender = (item: { value: string; label: string }) => {};
  return (
    <NiceSelect
      options={[
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
        { value: "other", label: "Other" },
      ]}
      defaultCurrent={0}
      onChange={(item) => handleGender(item)}
      name="Gender"
    />
  );
};

export default GenderSelect;
