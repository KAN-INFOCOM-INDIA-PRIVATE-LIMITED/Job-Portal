"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import screen_1 from '@/assets/images/assets/screen_10.png';
import screen_2 from '@/assets/images/assets/screen_11.png';
import screen_3 from '@/assets/images/assets/screen_12.png';
import screen_4 from '@/assets/images/assets/screen_13.png';
import iconSearch from '@/assets/images/icon/icons8-search.svg';
import JobLocationSelect from '../select/job-location';
import JobcategorySelect from '../select/job-category';
import useSearchFormSubmit from '@/hooks/use-search-form-submit';
import { redirect, useRouter } from "next/navigation";
import AutoSuggest from 'react-autosuggest';
import { Autocomplete } from '@nextui-org/react';
import AutocompleteComponent from '../AutocompleteComponent';
import JobSearchAutocompleteComponent from '../JobSearchAutoCompleteComponent';

const HeroBannerFour = () => {
  const { setSearchText } = useSearchFormSubmit();
  const [categoryVal, setcategoryVal] = useState([]);
  const [LocationVal, setLocationVal] = useState([]);
  const [inputLocationValue, setInputLocationValue] = useState('');
  const [inputSkillsValue, setInputSkillsValue] = useState('');
  const [location, setLocation] = useState(['Mumbai', 'Pune', 'Bangalore', 'Chennai']);
  const [skills, setSkills] = useState(['Java', '.net', 'Python', 'Android']);

  const handleCategoryVal = (data:any) => {
    setcategoryVal(data);
    // console.log(data);
  };
  const handleLocationVal = (data:any) => {
    setLocationVal(data);
    // console.log(data);
  };

  const router = useRouter();
   // handleSearchInput
   
   const handleSearchInput = (e:React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }
  // const handleCategoryVal = (categoryVal:any) => {
  //   setcategoryVal(categoryVal);
  // };
  // const handleLocationVal = (LocationVal:any) => {
  //   setLocationVal(LocationVal);
  // };
  const combinedString = categoryVal + "," + LocationVal;
  const handleSubmit=()=>{
    useEffect
    redirect('/job-list-v1');
  }
  const handleLocationInputChange = (e:any) => {
    const value = e.target.value;
    setInputLocationValue(value);
  };
  const handleSkillsInputChange = (e:any) => {
    const value = e.target.value;
    setInputSkillsValue(value);
  };
  const filteredLocationSuggestions = location.filter(suggestion =>
    suggestion.toLowerCase().includes(inputLocationValue.toLowerCase())
  );
  const filteredSkillsSuggestions = skills.filter(suggestion =>
    suggestion.toLowerCase().includes(inputSkillsValue.toLowerCase())
  );
  const handleSelectLocation = (selectedSuggestion:any) => {
    setInputLocationValue(selectedSuggestion);
    // You can perform additional actions when a suggestion is selected
  };
  const handleSelectSkills = (selectedSuggestion:any) => {
    setInputSkillsValue(selectedSuggestion);
    // You can perform additional actions when a suggestion is selected
  };


  return (
    <>
      {/* <div className="hero-banner-four position-relative pt-170 lg-pt-150 pb-300 lg-pb-150 md-pb-100"> */}
      <div className="hero-banner-four position-relative pt-170 lg-pt-150 pb-300 lg-pb-150 md-pb-100">
        <div className="container">
          <div className="position-relative pb-30 sm-pb-20">
            <div className="row">
              <div className="col-xxl-7 col-lg-8 m-auto text-center">
                <h1 className="wow fadeInUp" data-wow-delay="0.3s">Find your job without any hassle.</h1>
                <p className="text-md mt-25 mb-45 md-mb-30 wow fadeInUp" data-wow-delay="0.4s">Jobs & Job search. Find jobs in global. Executive jobs & work.</p>
              </div>
            </div>
            <div className="position-relative">
              <div className="row">
                <div className="col-xxl-8 col-xl-9 col-lg-10 m-auto">
                <div className="Wrapper ">
        <div>
            <div className="logoContainer">
              
            <Image src={iconSearch} alt="Search Icon" width={20}  height={20} style={{marginRight:"2%"}}/>
              {/* <input type='text' placeholder="Enter Skills" className="sugginput" id="input1"/> */}
              <JobSearchAutocompleteComponent className='sugginput' options={filteredSkillsSuggestions} name='Job Skills' sendData={handleCategoryVal} id="input1"/>
              <div className="pipe1"></div>
              <JobSearchAutocompleteComponent className='sugginput' options={filteredLocationSuggestions} name='Location' sendData={handleLocationVal} id="input2"/>

              
              <input type="submit" className="search" value="Search" onClick={() => router.push(`/job-list-v1?category=${categoryVal}&location=${LocationVal}`)}></input>
                {/* <AutocompleteComponent className='sugginput' sValue={[]} options={filteredSkillsSuggestions} name='Job Skills' sendData={handleCategoryVal}/> */}
            </div>
        </div>
    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Image src={screen_1} alt="screen" className="lazy-img shapes shape_01" />
        <Image src={screen_2} alt="screen" className="lazy-img shapes shape_02" />
        <Image src={screen_3} alt="screen" className="lazy-img shapes shape_03" />
        <Image src={screen_4} alt="screen" className="lazy-img shapes shape_04" />
      </div>
    </>
  );
};

export default HeroBannerFour;