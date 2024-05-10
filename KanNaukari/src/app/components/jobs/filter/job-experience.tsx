import React, { useEffect, useState } from "react";
import job_data from "@/data/job-data";
import { setExperience } from "@/redux/features/filterSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { IJobType } from "@/types/job-data-type";

type IProps = {
  filterItem:IJobType[];
  sendData: (data: any) => void;
  experienceChecked:string;
  dataExperienceArray:string[];
}

export function JobExperienceItems({filterItem,sendData,experienceChecked,dataExperienceArray}:IProps) {
  const showLength=true;
  const [isChecked, setChecked] = useState(false);
  const [dataArray, setDataArray] = useState<string[]>([]);
  // const [exper, setExper] = useState([""]);
  const uniqueExperiences = filterItem ? [...new Set(filterItem.map(job => job.job_experience))] : [];
  // const uniqueExperiences = [
  //   // "0","1","2","3","4","5","6"
  //   ...new Set(filterItem.map(job => job.job_experience!))
  //   // ...new Set(exper.map((job) => job))
  // ];
  
  const {Experience } = useAppSelector((state) => state.filter);
  const dispatch = useAppDispatch();
  const [selectedOption, setSelectedOption] = useState(null);

  const handleExperience = (item:any,i:any) => {
    // handleCheckboxChange(i); 
    dispatch(setExperience(item));
  
    const label=uniqueExperiences[i];
    const isValuePresent = dataArray.includes(label!);
    if (isValuePresent) {
      // If label is selected, remove it from the array
    setDataArray((prevLabels) => prevLabels.filter((item) => item !== label));
    const loc={ "from": "experience","value": label};
    sendData(loc);
    } else if(dataArray.length===0){
      setDataArray([label!]);
    }
    else {
      // If label is not selected, add it to the array
      // newArray.push(c);
      // newArray=[...newArray, c];
      // setSelectedLabels(newArray);
      // if(selectedLabels[0]===""){
      //   removeData(0);
      // }else{
        setDataArray((prevLabels) => [...prevLabels, label!]);
      // }
      
    }
  
  };
  const handleCheckboxChange = (i:any) => {
    setSelectedOption(i);
  };

  useEffect(() => {
    // Incorrect: Causing an infinite loop
    if(dataArray.length!==0){
  const loc={ "from": "experience","value": dataArray};
  sendData(loc);
    }
  }, [dataArray]);

  useEffect(() => {
    // Incorrect: Causing an infinite loop
   
  if(dataExperienceArray && dataExperienceArray.length===0){
    setDataArray([])
  }
  }, [dataExperienceArray.length]);


  // useEffect(() => {
  //   filterItem.map((l:any)=>{
  //         const exp=l.job_experience?.split(' ').map((fruit:any) => fruit.trim());
  //         setExper([...exper, exp[0]]);
  //         // setExper(exp[0])
          
  //       });
  // }, [filterItem]);
  return (
    <>
      {uniqueExperiences.map((e, index) => (
        <li key={index}>
          <input
            onChange={() => handleExperience(e,index)}
            type="checkbox"
            name={e}
            defaultValue={e}
            // checked={Experience.includes(e!)}
            checked={experienceChecked!=='Experience'?false:Experience.includes(e!)}
          />
          <label>
            {e}
            {showLength && (
              <span>
                {filterItem.filter((job) => job.job_experience === e).length}
              </span>
            )}
          </label>
        </li>
      ))}
    </>
  );
}

type IProps1 = {
  filterItem:IJobType[];
  sendData: (data: any) => void;
  experienceChecked:string;
  dataExperienceArray:string[];
}
const JobExperience = ({filterItem,sendData,experienceChecked,dataExperienceArray}:IProps1) => {
  
  return (
    <>
      <div className="main-body">
        <ul className="style-none filter-input">
          <JobExperienceItems filterItem={filterItem} sendData={sendData} experienceChecked={experienceChecked} dataExperienceArray={dataExperienceArray}/>
        </ul>
      </div>
    </>
  );
};

export default JobExperience;
