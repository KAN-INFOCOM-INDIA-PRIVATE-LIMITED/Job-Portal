import React, { useState } from "react";
import useSearchFormSubmit from "@/hooks/use-search-form-submit";
import { useRouter, useSearchParams } from "next/navigation";
import AutocompleteComponent from "../AutocompleteComponent";
import { IJobType } from "@/types/job-data-type";
import iconSearch from '@/assets/images/icon/icons8-search.svg';
import { category_data } from "../category/category-section-2";
import Image from 'next/image';
import JobSearchAutocompleteComponent from "../JobSearchAutoCompleteComponent";


const SearchForm = ({ constMethod }:any) => {
  const { handleSubmit,setSearchText } =
    useSearchFormSubmit();
    const searchParams = useSearchParams();
    const category = searchParams.get('category');
   const locationV = searchParams.get('location');
  const [categoryVal, setcategoryVal] = useState(category);
  const [LocationVal, setLocationVal] = useState(locationV);
  const [dataVal, setDataVal] =  useState<IJobType[]>([]);
  const [location, setLocation] = useState(['Mumbai', 'Pune', 'Bangalore', 'Chennai']);
  const [skills, setSkills] = useState(['Java', '.net', 'Python', 'Android']);
  const [inputLocationValue, setInputLocationValue] = useState('');
  const [sendCategoryData, setCategoryData] = useState('');
  const [sendLocationData, setLocationData] = useState('');
  const [inputSkillsValue, setInputSkillsValue] = useState('');
  const [dataArray, setDataArray] = useState<string[]>([]);
  
  const router = useRouter();
  const reloadWithNewParameter = () => {
    
  };
  const handleCategoryVal = (data:any) => {
    // setcategoryVal(data);

    setCategoryData(data)
    // console.log(data);
  };
  const handleLocationVal = (data:any) => {
    setLocationData(data)
    // setDataArray(data);
  };

  const handleSearchInput = (e:React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }
  const filteredLocationSuggestions = location.filter(suggestion =>
    suggestion.toLowerCase().includes(inputLocationValue.toLowerCase())
  );
  const filteredSkillsSuggestions:string[] = skills.filter(suggestion =>
    suggestion.toLowerCase().includes(inputSkillsValue.toLowerCase())
  );

  const handleSendData=()=>{
    if(sendCategoryData==="" && sendLocationData===""){
      setCategoryData(category!)
      setLocationData(locationV!)
    }else if(sendCategoryData===""){
      setCategoryData(category!)
    }else if(sendLocationData===""){
      setLocationData(locationV!)
    }
    
    constMethod(sendCategoryData,sendLocationData);
  }

  

  return (
    <div className="Wrapper ">
    <div>
        <div className="logoContainer" style={{ display: 'flex', alignItems: 'center' }}>
        <Image src={iconSearch} alt="Search Icon" width={20}  height={20} style={{marginRight:"2%"}}/>
          {/* <input type='text' placeholder="Enter Skills" className="sugginput" id="input1"/> */}
          <JobSearchAutocompleteComponent sValue={category} className='sugginput' options={filteredSkillsSuggestions} name='Job Skills' sendData={handleCategoryVal} id="input1"/>
          <div className="pipe1"></div>
          <JobSearchAutocompleteComponent sValue={locationV} className='sugginput' options={filteredLocationSuggestions} name='Location' sendData={handleLocationVal} id="input2"/>

          
          <input type="submit" className="search" value="Search" onClick={handleSendData}></input>
            {/* <AutocompleteComponent className='sugginput' sValue={[]} options={filteredSkillsSuggestions} name='Job Skills' sendData={handleCategoryVal}/> */}
        </div>
    </div>
</div>
  );
};

export default SearchForm;
