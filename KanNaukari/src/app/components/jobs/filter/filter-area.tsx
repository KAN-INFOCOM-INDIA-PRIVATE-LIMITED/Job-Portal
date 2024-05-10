"use client"
import React, { useState } from 'react';
import JobLocations from './job-locations';
import JobType from './job-type';
import JobExperience from './job-experience';
import Jobcategory from './job-category';
import JobTags from './job-tags';
import JobPrices from './job-prices';
import { useAppDispatch } from '@/redux/hook';
import { resetExperience, resetFilter, resetSkills, setExperience, setLocation, setcategory } from '@/redux/features/filterSlice';
import { IJobType } from '@/types/job-data-type';

// prop type 
type IProps = {
  priceValue: number[]
  setPriceValue: React.Dispatch<React.SetStateAction<number[]>>;
  maxPrice:number;
  filterCity:IJobType[];
  filterItem:IJobType[];
  skills:IJobType[];
  minExperience:number[];
  MaxExperience:number[];
  dataCategoryArray:string[];
  dataExperienceArray:string[];
  sendData: (data: any) => void;
}
const FilterArea = ({priceValue,setPriceValue,maxPrice,filterCity,filterItem,skills,minExperience,MaxExperience,sendData,dataCategoryArray,dataExperienceArray}:IProps) => {
  const dispatch = useAppDispatch();
  const [categoryChecked, setCategoryChecked] = useState("Category");
  const [experienceChecked, setExperienceChecked] = useState("Experience");


  const handleReset = () => {
    dispatch(resetFilter());
    setPriceValue([0,maxPrice])
    const reset={ "from": "reset","value": ""};
    sendData(reset);
  }
  const handleCategory = (data: any) => {
    // console.log("Data received from child:", data);
   
    if (data) {
      if(data.from==="category"){
        dispatch(resetExperience())
        dispatch(setLocation("Select Location"))
        setExperienceChecked("Category")
        setCategoryChecked("Category")
      }else{

        dispatch(resetExperience())
        dispatch(resetSkills())
      }
      sendData(data);
    }
  };
  const handleExperience = (data: any) => {
    // console.log("Data received from child:", data);
    setCategoryChecked("Experience")
    setExperienceChecked("Experience")
    
    if (data) {
      dispatch(resetSkills())
      dispatch(setLocation(""))
      sendData(data);
    }
  };
  return (
    <div className="filter-area-tab offcanvas offcanvas-start" id="filteroffcanvas">
      <button type="button" className="btn-close text-reset d-lg-none" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      <div className="light-bg border-20 pe-4 main-title " style={{paddingLeft:'8%',paddingTop:'8%'}}>Filter By
        <div className="filter-block bottom-line pt-25"></div>
      </div>
      <div className="light-bg border-20 ps-4 pe-4 pt-25 pb-30 ">
        <div className="filter-block bottom-line pb-25">
          {/* <a className="filter-title fw-500 text-dark" data-bs-toggle="collapse" href="#collapseLocation" role="button" aria-expanded="false">Location</a> */}
          <p>Location</p>
          <div className="collapse show" id="collapseLocation">
            <div className="main-body">
              <JobLocations filterItem={filterCity} sendData={handleCategory}/>
            </div>
          </div>
        </div>
        {/* <!-- /.filter-block --> */}
        {/* <div className="filter-block bottom-line pb-25 mt-25">
          <a className="filter-title fw-500 text-dark" data-bs-toggle="collapse" href="#collapseJobType" role="button" aria-expanded="false">Job Type</a>
          <div className="collapse show" id="collapseJobType">
            <JobType/>
          </div> 
        </div> */}
        {/* <!-- /.filter-block --> */}
        <div className="filter-block bottom-line pb-25 mt-25">
          {/* <a className="filter-title fw-500 text-dark" data-bs-toggle="collapse" href="#collapseExp" role="button" aria-expanded="false">Experience</a> */}
          <p>Experience</p>
          <div className="collapse show" id="collapseExp">
            <JobExperience filterItem={filterItem} sendData={handleExperience} experienceChecked={experienceChecked} dataExperienceArray={dataExperienceArray}/>
          </div>
        </div>
        {/* <!-- /.filter-block --> */}
        {/* <div className="filter-block bottom-line pb-25 mt-25">
          <a className="filter-title fw-500 text-dark" data-bs-toggle="collapse" href="#collapseSalary" role="button" aria-expanded="false">Salary</a>
          <div className="collapse show" id="collapseSalary">
            <JobPrices priceValue={priceValue} setPriceValue={setPriceValue} maxPrice={maxPrice}/>
          </div>
        </div> */}
        {/* <!-- /.filter-block --> */}
        <div className="filter-block bottom-line pb-25 mt-25">
          {/* <a className="filter-title fw-500 text-dark collapsed" data-bs-toggle="collapse" href="#collapsecategory" role="button" aria-expanded="false">Skills</a> */}
          <p>Skills</p>
          <div className="collapse show" id="collapsecategory">
            <Jobcategory filterItem={skills} sendData={handleCategory} filterItemFull={filterItem} categoryChecked={categoryChecked} dataCategoryArray={dataCategoryArray}/>
          </div>
        </div>
        {/* <!-- /.filter-block --> */}
        {/* <div className="filter-block bottom-line pb-25 mt-25">
          <a className="filter-title fw-500 text-dark collapsed" data-bs-toggle="collapse" href="#collapseTag" role="button" aria-expanded="false">Tags</a>
          <div className="collapse" id="collapseTag">
            <JobTags/>
          </div>
        </div> */}
        {/* <!-- /.filter-block --> */}

        <button onClick={handleReset} className="btn-ten fw-500  w-100 text-center tran3s mt-30">Reset Filter</button>
      </div>
    </div>
  );
};

export default FilterArea;