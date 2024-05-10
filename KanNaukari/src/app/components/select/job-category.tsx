import React from "react";
import NiceSelect from "@/ui/nice-select";
import job_data from "@/data/job-data";
import slugify from "slugify";

const JobcategorySelect = ({
  setcategoryVal,
}: {
  setcategoryVal: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const uniqueCategories = [
    "Java",".Net","Android","IOS","Flutter"
    // ...new Set(job_data.flatMap((job) => job.category)),
  ];
  // category_option
  const category_option = uniqueCategories.map((c) => {
    return {
      value: slugify(c.split(",").join("-").toLowerCase(), "-"),
      label: c,
    };
  });
  const handlecategory = (item: { value: string; label: string }) => {
    setcategoryVal(item.label);
  };
  return (
    <NiceSelect
      options={category_option}
      defaultCurrent={0}
      onChange={(item) => handlecategory(item)}
      name="category"
      cls="category"
    />
  );
};

export default JobcategorySelect;
