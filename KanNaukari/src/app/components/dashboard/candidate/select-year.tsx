import NiceSelect from "@/ui/nice-select";
import React, { useEffect, useRef, useState } from "react";
import { number } from "yup";
type IProps={
  value: any;
  value1:string;
}

const SelectYear = (value1:IProps) => {
  const handleYear = (item: { value: string; label: string }) => {};
  const [selectedValue, setSelectedValue] = useState(0);
  
  let matchPosition = 0;
  const options=[
    { value: "2014", label: "2014" },
    { value: "2015", label: "2015" },
    { value: "2016", label: "2016" },
    { value: "2017", label: "2017" },
    { value: "2018", label: "2018" },
    { value: "2019", label: "2019" },
    { value: "2020", label: "2020" },
    { value: "2021", label: "2021" },
    { value: "2022", label: "2022" },
    { value: "2023", label: "2023" },
    { value: "2024", label: "2024" },
    { value: "2025", label: "2025" },
    { value: "2026", label: "2026" },
    { value: "2027", label: "2027" },
    { value: "2028", label: "2028" },
  ];
  const getDefaultValue = () => {
    // Your dynamic logic to determine the default value
    
      for(let i=0;i<options.length;i++){
        if(options[i].label===value1.value){
          setSelectedValue(i)
          break;
        }
      }
     // For example, set the default value to the first option
  };

const year=value1;
  
  // const value1=value;
  // const indexValue=options.indexOf({value});

  useEffect(() => {
    getDefaultValue();
  }, [value1.value]);
  // positions;

  return (
    <div className="dash-input-wrapper mb-30">
      {/* <NiceSelect
        options={options}
        defaultValue={0}
        onChange={(item) => handleYear(item)}
        name="Year"
      /> */}
    </div>
  );
};

export default SelectYear;
