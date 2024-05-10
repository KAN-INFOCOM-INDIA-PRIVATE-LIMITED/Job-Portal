import React from "react";
import slugify from "slugify";
import job_data from "@/data/job-data";
import NiceSelect from "@/ui/nice-select";
import { useAppDispatch } from "@/redux/hook";
import { setcategory } from "@/redux/features/filterSlice";

const Filtercategory = () => {
  const dispatch = useAppDispatch()
  const uniqueCategories = [
    "Java",".Net","Android","IOS","Flutter"
    // ...new Set(job_data.flatMap((job) => job.category)),
  ];
  const options = uniqueCategories.map((c) => {
    return { value: slugify(c, "-"), label: c };
  });
  const handlecategory = (item: { value: string; label: string }) => {
    dispatch(setcategory(item.value))
  };
  return (
    <div className="filter-block pb-50 lg-pb-20">
      <div className="filter-title fw-500 text-dark">category</div>
      <NiceSelect
        options={options}
        defaultCurrent={0}
        onChange={(item) => handlecategory(item)}
        cls="bg-white"
        name="category"
      />
    </div>
  );
};

export default Filtercategory;
