"use client";
import React, { useState } from "react";
import StateSelect from "../candidate/state-select";
import CountrySelect from "../candidate/country-select";
import NiceSelect from "@/ui/nice-select";
import Header4 from "@/layouts/headers/header-4";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { baseUrl } from "@/utils/baseurl";
import { notifyError, notifySuccess } from "@/utils/toast";
import { progressEnd, progressStart } from "@/utils/progress";
import { useRouter } from "next/navigation";
import { Resolver, useForm } from "react-hook-form";
import CitySelect from "../candidate/city-select";

// props type 
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>
}
type IFormData = {
  title: string;
  desc: string;
  category: string;
  type: string;
  salary: string;
  salary_duration: string;
  skills: string;
  Experience: string;
  language_known: string;
  address: string;
  country: string;
  state: string;
  city: string;
  employer_name: string;
};
// resolver
const resolver: Resolver<IFormData> = async (values) => {
  return {
    values: values.title ? values : {},
    errors: !values.title
      ? {
        title: {
          type: "required",
          message: "Title is required.",
        },
        desc: {
          type: "required",
          message: "Description is required.",
        },
        category: {
          type: "required",
          message: "category is required.",
        },
        skills: {
          type: "required",
          message: "skills is required.",
        },
        Experience: {
          type: "required",
          message: "Experience is required.",
        },
        language_known: {
          type: "required",
          message: "Language Known is required.",
        },
        address: {
          type: "required",
          message: "Address is required.",
        },
        employer_name: {
          type: "required",
          message: "Employer Name is required.",
        }
      }
      : {},
  };
};

const SubmitJobArea = ({setIsOpenSidebar}:IProps) => {
  const handlecategory = (item: { value: string; label: string }) => {};
  // const handleJobType = (item: { value: string; label: string }) => {};
  const handleSalary = (item: { value: string; label: string }) => {};
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedcity, setSelectedcity] = useState("");
  const [selectedJobType, setSelectedJobType] = useState("");
  const [selectedSalaryDuration, setSelectedSalaryDuration] = useState("");
  const [inputExperience, setInputExperience] = useState("");
  const axios = require('axios');
  const token = localStorage.getItem("token");
  const router = useRouter();
  const [inputSkill, setInputSkill] = useState('');
  const [inputMinExperience, setInputMinExperience] = useState(0);
  const [inputMaxExperience, setInputMaxExperience] = useState(0);
  const [skillList, setSkillList] = useState<string[]>([]);
  const array="2-4 years";

   // react hook form
   const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormData>({ resolver });

  const handleDateChange = (date:Date) => {
    setSelectedDate(date);
  };

  const handleCountrySelect = (selectedCountry:any) => {
    setSelectedCountry(selectedCountry.value);
  };
  const handleStateSelect = (selectedState:any) => {
    setSelectedState(selectedState.value);
  };
  const handlecitySelect = (selectedcity:any) => {
    setSelectedcity(selectedcity.value);
  };
  const handleJobType = (selectedJobType:any) => {
    setSelectedJobType(selectedJobType.value);
  };
  const handleSalaryDuration = (selectedSalaryDuration:any) => {
    setSelectedSalaryDuration(selectedSalaryDuration.value);
  };

  const onSubmit = (data: IFormData) => {
    progressStart();
    if (data) {
      addData(data);
    }
    reset();
  };

  const handleInputChange = (event:any) => {
    setInputSkill(event.target.value);
  };

  const handleSplitString = () => {
    // Split the string by commas and remove any leading/trailing spaces
    const skills1 = inputSkill.split(',').map((fruit) => fruit.trim());
    setSkillList(skills1);
    const Experience=inputMinExperience+" years";
    setInputExperience(Experience);
    const exp=array.split('-').map((fruit) => fruit.trim());
    const exper=exp[1].split(' ')
    // console.log(parseInt(exper[0]))
  };
  const handleInputMinExpChange = (event:any) => {
    setInputMinExperience(event.target.value);
  };
  const handleInputMaxExpChange = (event:any) => {
    setInputMaxExperience(event.target.value);
  };


  const addData=async (data1:IFormData)=>{
    if(selectedJobType==""){
      notifyError("Select Job Type")
    }else if(selectedSalaryDuration==""){
      notifyError("Select Salary Duration")
    }else if(inputSkill==""){
      notifyError("Enter Skills")
    }else if(inputExperience==""){
      notifyError("Enter Experience")
    }else if(selectedCountry==""){
      notifyError("Select Country")
    }else if(selectedState==""){
      notifyError("Select State")
    }else if(selectedcity==""){
      notifyError("Select City")
    }else{
    let data = JSON.stringify({
      "job_title": data1.title,
      "job_desc": data1.desc,
      "job_category": data1.category,
      "job_type": selectedJobType,
      // "salary": data1.salary,
      "job_salary": data1.salary,
      "job_salary_duration": selectedSalaryDuration,
      "job_skills": inputSkill,
      "job_experience": inputExperience,
      // "job_language_known": data1.language_known,
      "job_language_known": data1.language_known,
      "job_address": data1.address,
      "job_country": selectedCountry,
      "job_state": selectedState,
      "job_city": selectedcity,
      "job_posted_by": localStorage.getItem("reg_Id"),
      "job_posted_on": new Date().toISOString().toString(),
      "job_employer_name": data1.employer_name,
      "job_from_date": new Date().toISOString().toString(),
      "job_to_date": selectedDate.toISOString().toString(),
      "active_status": true
    });
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: baseUrl+'/postjob',
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': 'Bearer Token '+token
      },
      data : data
    };
    
    axios.request(config)
    .then((response:any) => {
      if(response.status==200){
        notifySuccess(response.data.message);
        progressEnd();
        window.location.reload();
      }else if(response.message=="Unauthorized"){
        progressEnd();
          localStorage.clear();
          router.push("/");
      }
      // console.log(JSON.stringify(response.data));
    })
    .catch((error:any) => {
      // console.log(error.message);
      notifyError(error.message);
      progressEnd();
    });
    
  }
}

  return (
    <div className="dashboard-body">
        {/* header start */}
        <Header4 value="Profile"/>
        {/* header end */}
      <div className="position-relative">
       
        {/* header start */}
        {/* <DashboardHeader setIsOpenSidebar={setIsOpenSidebar}/> */}
        {/* header end */}

        <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="main-title">Post a New Job</h2>

        <div className="bg-white card-box border-20">
          <h4 className="dash-title-three">Job Details</h4>
          <div className="dash-input-wrapper mb-30">
            <label htmlFor="">Job Title*</label>
            <input type="text" placeholder="Ex: Product Designer" 
            {...register("title", { required: `Title is required!` })}
            name="title"/>
          </div>
          <div className="dash-input-wrapper mb-30">
            <label htmlFor="">Job Description*</label>
            <textarea
              className="size-lg"
              placeholder="Write about the job in details..."
              {...register("desc", { required: `Description is required!` })}
              name="desc"
            ></textarea>
          </div>
          <div className="row align-items-end">
            <div className="col-md-6">
              <div className="dash-input-wrapper mb-30">
                <label htmlFor="">Job category</label>
                <input type="text" placeholder="Add Job category" 
                {...register("category", { required: `Job category is required!` })}
                name="category"/>
                {/* <NiceSelect
                  options={[
                    { value: "Designer", label: "Designer" },
                    { value: "It & Development", label: "It & Development" },
                    { value: "Web & Mobile Dev", label: "Web & Mobile Dev" },
                    { value: "Writing", label: "Writing" },
                  ]}
                  defaultCurrent={0}
                  onChange={(item) => handlecategory(item)}
                  name="Job category"
                /> */}
              </div>
            </div>
            <div className="col-md-6">
              <div className="dash-input-wrapper mb-30">
                <label htmlFor="">Job Type</label>
                <NiceSelect
                  options={[
                    { value: "Full time", label: "Full time" },
                    { value: "Part time", label: "Part time" },
                    { value: "Hourly-Contract", label: "Hourly-Contract" },
                    { value: "Fixed-Price", label: "Fixed-Price" },
                  ]}
                  defaultCurrent={0}
                  onChange={(item) => handleJobType(item)}
                  name="type"
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="dash-input-wrapper mb-30">
                <label htmlFor="">Salary and Language Known*</label>
                <NiceSelect
                  options={[
                    { value: "Monthly", label: "Monthly" },
                    { value: "Weekly", label: "Weekly" },
                  ]}
                  defaultCurrent={0}
                  onChange={(item) => handleSalaryDuration(item)}
                  name="salary_duration"
                />
              </div>
            </div>
            <div className="col-md-3">
            <div className="dash-input-wrapper mb-30">
            <input type="number" placeholder="Enter Salary" 
            {...register("salary", { required: `Salary is required!` })}
            name="salary"/>
          </div>
            </div>
            <div className="col-md-5">
            <div className="dash-input-wrapper mb-30">
            <label htmlFor="">Language Known*</label>
            <input type="text" placeholder="Enter Language Known" 
            {...register("language_known", { required: `Language Known is required!` })}
            name="language_known"/>
          </div>
            </div>
            <div className="dash-input-wrapper mb-30">
            <label htmlFor="">Employer Name*</label>
            <input type="text" placeholder="Add Employer Name" 
            {...register("employer_name", { required: `Employer Name is required!` })}
            name="employer_name"/>
          </div>
          </div>

          <h4 className="dash-title-three pt-50 lg-pt-30">
            Skills & Experience
          </h4>
          <div className="dash-input-wrapper mb-30">
            <label htmlFor="">skills*</label>
            <input type="text" placeholder="Add skills" style={{marginBottom:"20px"}} 
            onChange={handleInputChange}
            // {...register("skills", { required: `Name is required!` })}
            name="skills"/>
            <div className="row">
            <div className="col-lg-6">
            <label htmlFor="" >Experience*</label>
            <input type="number" placeholder="Add  Experience" onChange={handleInputMinExpChange}/>
            </div>
          
            
            </div>
            {/* <div className="skill-input-data d-flex align-items-center flex-wrap">
              <button>Design</button>
              <button>UI</button>
              <button>Digital</button>
              <button>Graphics</button>
              <button>Developer</button>
              <button>Product</button>
              <button>Microsoft</button>
              <button>Brand</button>
              <button>Photoshop</button>
              <button>Business</button>
              <button>IT & Technology</button>
              <button>Marketing</button>
              <button>Article</button>
              <button>Engineer</button>
              <button>HTML5</button>
              <button>Figma</button>
              <button>Automobile</button>
              <button>Account</button>
            </div> */}
          </div>

          {/* employ Experience start */}
          {/* <EmployExperience /> */}
          {/* employ Experience end */}
          {/* <h4 className="dash-title-three pt-50 lg-pt-30">File Attachment</h4>
          <div className="dash-input-wrapper mb-20">
            <label htmlFor="">File Attachment*</label>
            <div className="attached-file d-flex align-items-center justify-content-between mb-15">
              <span>guidline&requirments.doc</span>
              <a href="#" className="remove-btn">
                <i className="bi bi-x"></i>
              </a>
            </div>
          </div> */}
          {/* <div className="dash-btn-one d-inline-block position-relative me-3">
            <i className="bi bi-plus"></i>
            Upload File
            <input type="file" id="uploadCV" name="uploadCV" placeholder="" />
          </div>
          <small>Upload file .pdf, .doc, .docx</small> */}
          <h4 className="dash-title-three pt-50 lg-pt-30">
            Address & Location
          </h4>
          <div className="row">
            <div className="col-12">
              <div className="dash-input-wrapper mb-25">
                <label htmlFor="">Address*</label>
                <input
                  type="text"
                  placeholder="Cowrasta, Chandana, Gazipur Sadar"
                  {...register("address", { required: `Name is required!` })}
              name="address"
                />
              </div>
            </div>
            <div className="col-lg-4">
              <div className="dash-input-wrapper mb-25">
                <label htmlFor="">Country*</label>
                <CountrySelect onSelect={handleCountrySelect}/>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="dash-input-wrapper mb-25">
                <label htmlFor="">State*</label>
                <StateSelect countryCode={selectedCountry} sendData={handleStateSelect}/>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="dash-input-wrapper mb-25">
                <label htmlFor="">city*</label>
                <CitySelect stateCode={selectedState} sendData={handlecitySelect}/>
              </div>
            </div>
            
            <div className="dash-input-wrapper mb-25">
            <label htmlFor="">Job Validity*</label>
            <DatePicker
              className="dash-input-wrapper mb-25"
              selected={selectedDate}
              onChange={handleDateChange}
              minDate={new Date()}
              placeholderText="Select a date"
            />
              </div>
            
            
            {/* <div className="col-12">
              <div className="dash-input-wrapper mb-25">
                <label htmlFor="">Map Location*</label>
                <div className="position-relative">
                  <input type="text" placeholder="XC23+6XC, Moiran, N105" />
                  <button className="location-pin tran3s">
                    <Image src={icon} alt="icon" className="lazy-img m-auto" />
                  </button>
                </div>
                <div className="map-frame mt-30">
                  <div className="gmap_canvas h-100 w-100">
                    <iframe
                      className="gmap_iframe h-100 w-100"
                      src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=bass hill plaza medical centre&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
        <div className="button-group d-inline-flex align-items-center mt-30" style={{left:"40%",position:"relative"}}>
          <button type="submit" className="dash-btn-two tran3s me-3" onClick={handleSplitString}>
            Submit
          </button>
        </div>

        {/* <div className="button-group d-inline-flex align-items-center mt-30">
          <a href="#" className="dash-btn-two tran3s me-3">
            Submit
          </a> */}
          {/* <a href="#" className="dash-cancel-btn tran3s">
            Cancel
          </a> */}
        {/* </div> */}
        </form>
      </div>
    </div>
  );
};

export default SubmitJobArea;



