"use client";
import React, { useState, useEffect } from "react";
import slugify from "slugify";
import FilterArea from "../filter/filter-area";
import job_data from "@/data/job-data";
import ListItemTwo from "./list-item-2";
import { IJobType } from "@/types/job-data-type";
import Pagination from "@/ui/pagination";
import JobGridItem from "../grid/job-grid-item";
import { useAppSelector } from "@/redux/hook";
import NiceSelect from "@/ui/nice-select";
import { baseUrl } from "@/utils/baseurl";
import { useRouter, useSearchParams } from "next/navigation";
import { notifyError } from "@/utils/toast";
import {ShiveringProgressDialog} from "../../../../utils/shiveringProgressDialog"
import Loading from "@/app/loading";
import { any } from "core-js/fn/promise";

const JobListThree = ({ itemsPerPage,grid_style=false,cat,loc }: { itemsPerPage: number;grid_style?:boolean;cat?:any;loc?:any; }) => {

  // const [all_jobs, setAll_Jobs] = useState<IJobType[] | null>(null);
  let all_jobs:IJobType[]=[];
  const maxPrice = job_data.reduce((max, job) => {
    return 1000 > max ? 100 : max;
  }, 0);
  const { job_skills, job_experience, job_type, job_city, tags } = useAppSelector(
    (state) => state.filter
  );
  const router = useRouter();
  const searchParams = useSearchParams();
  let category = searchParams.get('category');
  let location = searchParams.get('location');
  const [dataCategoryArray, setDataCategoryArray] = useState<string[]>([]);
  const [dataExperienceArray, setDataExperienceArray] = useState<string[]>([]);
  if(cat!==""){
    category=cat;
    location=loc;
  }
  
   const [loading, setLoading] = useState(true);
  const [currentItems, setCurrentItems] = useState<IJobType[] | null>(null);
  const [listItems, setListItems] = useState<IJobType[]>([]);
  const [filterSkillsItems, setFilterSkillsItems] = useState<IJobType[]>([]);
  const [filterLocationItems, setFilterLocationItems] = useState<IJobType[]>([]);
  const [filterItems, setFilterItems] = useState<IJobType[]>([]);
  const [filtercity, setFilterCity] = useState<IJobType[]>([]);
  const [filterSkillscity, setFilterSkillsCity] = useState<IJobType[]>([]);
  const [filterLocationcity, setFilterLocationCity] = useState<IJobType[]>([]);
  const [skillsData, setSkillsData] = useState<IJobType[]>([]);
  const [locationSkillsData, setLocationSkillsData] = useState<IJobType[]>([]);
  const [skills, setSkills] = useState<IJobType[]>([]);
  const [price, setPrice] = useState<number[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [jobType, setJobType] = useState(grid_style ?"grid" : "list");
  const [priceValue, setPriceValue] = useState([0, maxPrice]);
  const [shortValue, setShortValue] = useState('');
  const axios = require('axios');
  const [minExperience, setMinExperience] = useState([1]);
  const [maxExperience, setMaxExperience] = useState([2]);
  const [all_current_job, setAll_Current_Job] = useState<IJobType[] | null>(null);
  let priceArray: (number | undefined)[] = [];

 

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % currentItems!.length;
    setItemOffset(newOffset);
  };
// handleShort
const handleShort = (item: { value: string; label: string }) => {
  if(item.label==='low to high'){
    const sorted = [...currentItems!].sort((a, b) => a.job_salary - b.job_salary);
    setListItems(sorted);
  }else{
    const sorted = [...currentItems!].sort((a, b) => b.job_salary - a.job_salary);
    setListItems(sorted);
  }
  // setShortValue(item.value)
}

const removeDuplicates = (arr1: IJobType[], arr2: IJobType[]) => {
  const map = new Map<number, IJobType>();
  const oneFromDuplicates: IJobType[] = [];
  const remainingSingleObjects: IJobType[] = [];
  
  // Store items from arr1 in map
  arr1.forEach(item => {
    map.set(item.joB_ID, item);
  });

  // Check if items from arr2 exist in map, if so, add to oneFromDuplicates array
  // Otherwise, add to remainingSingleObjects array
  arr2.forEach(item => {
    if (map.has(item.joB_ID)) {
      remainingSingleObjects.push(item);
      map.delete(item.joB_ID); // Remove the duplicate from the map
    } else {
      remainingSingleObjects.push(item);
    }
  });

  // Add remaining items from arr1 to remainingSingleObjects array
  map.forEach(item => {
    remainingSingleObjects.push(item);
  });

  return remainingSingleObjects ;
};




const getSkillData=(job_skills:any)=>{
  
  let data = JSON.stringify({
    "job_skills":job_skills,
    "isRecentJob": false
  });
  
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: baseUrl+'/JobSearch',
    headers: { 
      'Content-Type': 'application/json', 
      // 'Authorization': 'Bearer '+token
    },
    data : data
  };
  
  axios.request(config)
  .then((response:any) => {
    if(response.status==200){
      if(response.data.obj.job_Search_List.length==0){
        setFilterSkillsItems([]);
      // setCurrentItems([]);
      setSkillsData([]);
      
      setFilterSkillsCity([]);
      }else{
      // setAll_Jobs(response.data.obj.job_Search_List);
      setFilterSkillsItems(response.data.obj.job_Search_List);
      // setCurrentItems(response.data.obj.job_Search_List);
      setSkillsData(response.data.obj.filter.skillsParameters);
      setFilterSkillsCity(response.data.obj.filter.cityParameters);
      // console.log(all_jobs);
      }
        setLoading(false);
      
    }else if(response.message=="Unauthorized"){
        localStorage.clear();
        router.push("/");
        setLoading(false);
        // setShowShiveringProgressDialog(false);
    }
    // console.log(JSON.stringify(response.data));
  })
  .catch((error:any) => {
    // console.log(error);
    // notifyError(error.message);
    setLoading(false);
    // setShowShiveringProgressDialog(false);
  });
  
}
useEffect(() => {
  // Incorrect: Causing an infinite loop
  if(category!==null && category!==""){
    if(cat!==""){
      setLoading(true);
      getSkillData(category);
    }else{
      const arr = category!.split(',');
      setLoading(true);
    getSkillData(arr);
    }
   
  }else{
    getSkillData([])
  } 
  // if(location!==undefined){
  //   const locArr=location!.split(',');
  //   getLocationData(locArr);
  // }else{
  //   getLocationData([])
  // } 
  
}, [category,location]);
useEffect(() => {
  let locArr:any;
  if(location!==null && location!==undefined && location[0]!=="" && location[0]!==undefined){
    if(cat!==""){
      locArr=location;
    }else{
     locArr=location!.split(',');
    }
  const combinedArray = filterSkillsItems.filter(obj => locArr.includes(obj.job_city!));
  const combinedLocation = filterSkillscity.filter(obj => locArr.includes(obj.city));
  const filtercombinedArray = filterSkillsItems.filter(obj => locArr.includes(obj.job_city!));
  const current=removeDuplicates(filterSkillsItems,combinedArray);
  const filter=removeDuplicates(filterSkillsItems,filtercombinedArray);
  const convertedJobTypes: IJobType[] = locArr.map((typeName:any, index:any) => ({
    joB_ID: index, // You can adjust how you generate IDs here
    city: typeName,
    job_salary:0
  }));
  if(combinedArray.length===0){
    if(locArr[0]!==""){
      setCurrentItems(combinedArray)
      setFilterItems(combinedArray!);
    setSkills(combinedArray);
    setFilterCity(combinedArray);
    setPageCount(Math.ceil(combinedArray.length / itemsPerPage));
    }else{
    setCurrentItems(filterSkillsItems)
    setFilterItems(filterSkillsItems!);
    setSkills(skillsData);
    setFilterCity(filterSkillsItems);
    setPageCount(Math.ceil(filterSkillsItems.length / itemsPerPage));
  }
    
  }else{
    setCurrentItems(combinedArray);
    setFilterItems(combinedArray!);
    setSkills(skillsData);
    setPageCount(Math.ceil(combinedArray.length / itemsPerPage));

    if(locArr[0]!==""){
      setFilterCity(combinedLocation);
    }else{
      setFilterCity(filterSkillscity);
    }
  }
  
  }else{
    setCurrentItems(filterSkillsItems);
  setFilterItems(filterSkillsItems!);
  setSkills(skillsData);
  setFilterCity(filterSkillscity);
  setPageCount(Math.ceil(filterSkillsItems.length / itemsPerPage));
  } 
  
  // Incorrect: Causing an infinite loop

}, [filterSkillsItems,filterLocationItems,filterSkillscity,filterLocationcity,category,location]);
useEffect(() => {
  if(filterItems){
  if (filterItems.length !== 0) {
    for (let i = 0; i < filterItems.length; i++) {
      // Check if job_salary is defined and is a number before parsing
      // if (typeof filterItems[i].job_salary === 'number') {
        priceArray.push(filterItems[i].job_salary);
      // }
    }
  }
}
  const filteredArray: number[] = priceArray.filter((value): value is number => value !== undefined);
  const maxFilteredArray=Math.max(...filteredArray);
  setPriceValue(filteredArray);
  // Incorrect: Causing an infinite loop
}, [filterItems]);
const filteredArray:IJobType[] = [];


const handleFilterDataReceived = (data:any) =>{
  // setFilterItems(filterSkillsItems);
  if(data.from=="category" && data.value.length!=0){
    setDataCategoryArray(data.value)
    setDataExperienceArray([])
    setListItems([])
    setListItems(prevArray => prevArray.splice(0, prevArray.length));
    if(data.value.length!=0){
      for(let i=0;i<data.value.length;i++){
        for(let j=0;j<filterItems.length;j++){
          if(filterItems[j].job_skills?.includes(data.value[i])){
            setListItems(prevItem=>[...prevItem,filterItems[j]])
          }
        
        }
      }    
    }
    else{
      setCurrentItems(filterItems);
      setPageCount(Math.ceil(filterItems.length / itemsPerPage));
    }
  // setCurrentItems(filterItems!.filter(item => item.job_skills!.includes(data.value)));
}else if (data.from=="experience"&& data.value.length!=0){
  if(data.value.length!==0){
  setDataExperienceArray(data.value)
  setDataCategoryArray([])
  setListItems([])
  setListItems(prevArray => prevArray.splice(0, prevArray.length));
    if(data.value.length!=0){
      for(let i=0;i<data.value.length;i++){
        for(let j=0;j<filterItems.length;j++){
          if(filterItems[j].job_experience?.includes(data.value[i])){
            setListItems(prevItem=>[...prevItem,filterItems[j]])
          }
        
        }
      }
    
    }
    
  }
  else{
    setCurrentItems(filterItems);
    setPageCount(Math.ceil(filterItems.length / itemsPerPage));
  }
}else if(data.from=="location"){
  const filtered = filterItems.filter(item => item.job_city?.includes(data.value));
  setListItems(filtered);
  // for(let j=0;j<filterItems.length;j++){
  //   if(filterItems[j].job_city?.includes(data.value)){
  //     setListItems(prevItem=>[...prevItem,filterItems[j]])
  //   }
  // }

}
else{
  setCurrentItems(filterItems);
  setPageCount(Math.ceil(filterItems.length / itemsPerPage));
}

}

useEffect(() => {
  // Incorrect: Causing an infinite loop
  if(listItems.length!=0){
  const uniqueArray = listItems.filter(
    (item, index, self) =>
      index === self.findIndex((t) => t.joB_ID === item.joB_ID)
  );
setCurrentItems(uniqueArray);
setPageCount(Math.ceil(uniqueArray.length / itemsPerPage));
}else{
  setCurrentItems(filterItems);
  setPageCount(Math.ceil(filterItems.length / itemsPerPage));
}
}, [listItems]);



  return (
    <>
    {loading ? <Loading /> : (
    <section className="job-listing-three pt-20 lg-pt-80 pb-20 xl-pb-150 lg-pb-80" style={{backgroundColor:'#F5F5F5'}}>
      <div className="container">
        <div className="row">
          <div className="col-xl-3 col-lg-4">
            <button
              type="button"
              className="filter-btn w-100 pt-2 pb-2 h-auto fw-500 tran3s d-lg-none mb-40"
              data-bs-toggle="offcanvas"
              data-bs-target="#filteroffcanvas"
            >
              <i className="bi bi-funnel"></i>
              Filter
            </button>
            {/* filter area start */}
            <FilterArea priceValue={priceValue} setPriceValue={setPriceValue} maxPrice={maxPrice} filterCity={filtercity} filterItem={filterItems} skills={skills} minExperience={minExperience} MaxExperience={maxExperience} sendData={handleFilterDataReceived}  dataCategoryArray={dataCategoryArray} dataExperienceArray={dataExperienceArray}/>
            {/* filter area end */}
          </div>

          <div className="col-xl-9 col-lg-8">
            <div className="job-post-item-wrapper ms-xxl-5 ms-xl-3">
              <div className="upper-filter d-flex justify-content-between align-items-center mb-20">
                <div className="total-job-found">
                  All <span className="text-dark">{currentItems?.length}</span> jobs
                  found
                </div>
                <div className="d-flex align-items-center">
                  <div className="short-filter d-flex align-items-center">
                    <div className="text-dark fw-500 me-2">Sort:</div>
                    <NiceSelect
                      options={[
                        {value:'',label:'Select'},
                        {value:'price-low-to-high',label:'low to high'},
                        {value:'price-high-to-low',label:'High to low'},
                      ]}
                      defaultCurrent={0}
                      onChange={(item) => handleShort(item)}
                      name="Select"
                    />
                  </div>
                  {/* <button
                    onClick={() => setJobType("list")}
                    className={`style-changer-btn text-center rounded-circle tran3s ms-2 list-btn 
                    ${jobType === "grid" ? "active" : ""}`}
                    title="Active List"
                  >
                    <i className="bi bi-list"></i>
                  </button>
                  <button
                    onClick={() => setJobType("grid")}
                    className={`style-changer-btn text-center rounded-circle tran3s ms-2 grid-btn 
                    ${jobType === "list" ? "active" : ""}`}
                    title="Active Grid"
                  >
                    <i className="bi bi-grid"></i>
                  </button> */}
                </div>
              </div>
              <div
                className={`accordion-box list-style ${jobType === "list" ? "show" : ""}`}
              >
                {currentItems &&
                  currentItems.map((job) => (
                    <ListItemTwo key={job.joB_ID} item={job} />
                  ))}
              </div>

              <div
                className={`accordion-box grid-style ${jobType === "grid" ? "show" : ""}`}
              >
                <div className="row">
                  {currentItems &&
                    currentItems.map((job) => (
                      <div key={job.joB_ID} className="col-sm-6 mb-30">
                        <JobGridItem item={job} />
                      </div>
                    ))}
                </div>
              </div>

              {currentItems && currentItems.length>0 && (
                <div className="pt-30 lg-pt-20 d-sm-flex align-items-center justify-content-between">
                  <p className="m0 order-sm-last text-center text-sm-start xs-pb-20">
                    Showing{" "}
                    <span className="text-dark fw-500">{itemOffset + 1}</span>{" "}
                    to{" "}
                    <span className="text-dark fw-500">
                      {Math.min(itemOffset + itemsPerPage, currentItems.length)}
                    </span>{" "}
                   
                  </p>
                  {currentItems.length > itemsPerPage && (
                    <Pagination
                      pageCount={pageCount}
                      handlePageClick={handlePageClick}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
   
   )}
    </>
  );
};
export default JobListThree;
