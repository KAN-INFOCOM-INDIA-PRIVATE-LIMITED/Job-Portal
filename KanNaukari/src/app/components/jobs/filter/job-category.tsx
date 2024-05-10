import React, { useEffect, useState } from "react";
import job_data from "@/data/job-data";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { resetSkills, setcategory } from "@/redux/features/filterSlice";
import { IJobType } from "@/types/job-data-type";

type IProps = {
  filterItem:IJobType[];
  filterItemFull:IJobType[];
  categoryChecked:string;
  dataCategoryArray:string[];
  sendData: (data: any) => void;
}
type SendDataCallback = (data: any) => void;

// const Jobcategory = ({filterItem}:IProps,{ sendData }: { sendData: SendDataCallback }) => {
const Jobcategory = ({filterItem,sendData,filterItemFull,categoryChecked,dataCategoryArray}:IProps) => {
  const uniqueCategories = filterItem ? [...new Set(filterItem.map(job => job.skills))] : [];
  // const uniqueCategories = [
  //   // "Java",".Net","Android","IOS","Flutter","Java"
  //   ...new Set(filterItem.flatMap((job) => job.skills)),
  // ];
  const [isShowMore, setIsShowMore] = useState(false);
  const [isDataArray, setIsDataArray] = useState(false);
  const [dataArray, setDataArray] = useState<string[]>([]);
  const { job_skills } = useAppSelector((state) => state.filter);
  const dispatch = useAppDispatch();
  const [selectedOption, setSelectedOption] = useState(null);
  const [checkboxes, setCheckboxes] = useState<boolean[]>([]);
  const [selectedLabels, setSelectedLabels] = useState([]);
  const filteredArray:string[] = [];
  let newArray:IJobType[]=[];

  const visibleCategories = isShowMore
    ? uniqueCategories
    : uniqueCategories.slice(0, 5);

  const handleSendData=(c:any,i:any)=>{
    // handleCheckboxChange(i)
    dispatch(setcategory(c!));
    const label=uniqueCategories[i];
    const isValuePresent = dataArray.includes(c);
    // const isLabelSelected = selectedLabels.includes(c);
    // if (isValuePresent) {
    //   removeData(dataArray.indexOf(c));
    // } else {
    //   addData(c);
    // }
    // Update the state based on the checkbox change
    if (isValuePresent) {
      // If label is selected, remove it from the array
    setDataArray((prevLabels) => prevLabels.filter((item) => item !== c));
    setIsDataArray(true)
    
    } else if(dataArray.length===0){
      setDataArray([c]);
    }
    else {
      // If label is not selected, add it to the array
      // newArray.push(c);
      // newArray=[...newArray, c];
      // setSelectedLabels(newArray);
      // if(selectedLabels[0]===""){
      //   removeData(0);
      // }else{
        setDataArray((prevLabels) => [...prevLabels, c]);
      // }
      
    }
   
    
  };
  const addData = (data:string) => {
    // Use the spread operator to create a new array with the existing data and the new data
    setDataArray(prevData => [...prevData, data]);
    // filteredArray.push(data);
    // setDataArray(prevData => [...prevData, filteredArray]);
  };
  const handleCheckboxChange = (i:any) => {
    const updatedCheckboxes = [...checkboxes];
    updatedCheckboxes[i] = !updatedCheckboxes[i];
    setCheckboxes(updatedCheckboxes);
    // setSelectedOption(i);
  };
  const removeData = (indexToRemove: number) => {
    // Use filter to create a new array without the element to be removed
    const newArray = selectedLabels.filter((_, index) => index !== indexToRemove);
    setSelectedLabels(newArray);
  };

  useEffect(() => {
    // Incorrect: Causing an infinite loop
    if(dataArray.length!==0 || isDataArray){
   
  const cat={ "from": "category","value": dataArray};
  sendData(cat);
  setIsDataArray(false)
}
  }, [dataArray]);

  useEffect(() => {
    // Incorrect: Causing an infinite loop
   
  if(dataCategoryArray && dataCategoryArray.length===0){
    setDataArray([])
  }
  }, [dataCategoryArray.length]);
 

 
  return (
    <div className="main-body">
      <ul className="style-none filter-input">
        {visibleCategories.map((c, i) => (
          <li key={i}>
            <input
              onChange={() => handleSendData(c,i)}
              type="checkbox"
              name={c}
              defaultValue={c}
              checked={categoryChecked!=='Category'?false:job_skills.includes(c!)}
              // checked={selectedOption === i}
            />
            <label>
              {c}{" "}
              <span>
                {filterItemFull.filter((job) => job.job_skills!.includes(c!)).length}
              </span>
            </label>
          </li>
        ))}
      </ul>
      <>
      {visibleCategories.length >= 5 ? (
      <div
        onClick={() => setIsShowMore((prevState) => !prevState)}
        className="more-btn"
      >
        <i className="bi bi-dash"></i> Show {isShowMore ? "Less" : "More"}
      </div>
      ) : (
        ""
      )}</>
    </div>
    
  );
};

export default Jobcategory;

