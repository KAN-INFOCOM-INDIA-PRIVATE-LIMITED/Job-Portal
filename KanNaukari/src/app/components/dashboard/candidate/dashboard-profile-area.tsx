"use client"
import React, { useEffect } from 'react';
import Image from 'next/image';
import HeaderFour from '@/layouts/headers/header-4';
import { useState } from 'react';
import userProfile from '@/assets/images/assets/userProfile.svg'
import { ChangeEvent } from 'react';
import '@/assets/css/responsive.css'
import '@/assets/css/style.css'
import { useSearchParams } from 'next/navigation';
import { notifyError, notifySuccess } from '@/utils/toast';
import { baseUrl } from '@/utils/baseurl';
import { useRouter } from 'next/navigation';
import { EducationIJobType, ExperienceIJobType, IJobType } from '@/types/job-data-type';
import NiceSelect from '@/ui/nice-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import AutocompleteComponent from '../../AutocompleteComponent';
import axios from '../../../../utils/axiosInterceptor';
import Compressor from 'compressorjs';
import 'react-datepicker/dist/react-datepicker.css';
import GenderSelect from './gender-select';
import EducationSelect from '../Masters/education-select';
import SpecializationSelect from '../Masters/specialization-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
interface Div {
  id: number;
  content: React.ReactNode;
}
interface Option {
  label: string;
  value: string;
} 
// props type 
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>
}
const DashboardProfileArea = ({setIsOpenSidebar}:IProps) => {
  const title1=localStorage.getItem("userfname")?.toString();
  const [isCandidateName,setIsCandidateName] = useState<string>("");
  const [isChecked, setIsChecked] = useState(false);
  const [mobileNumber,setMobileNumber] = useState("");
  const [emailId,setEmailId] = useState("");
  const [address,setAddress] = useState("");
  const [gender,setGender] = useState("");
  const [candidateSkills,setCandidateSkills] = useState("");
  const [dateOfBirth,setDateOfBirth] = useState("");
  const [data1,setData] = useState({});
  const [isEducationToDate,setIsEducationToDate] = useState<string>("");
  const [isEducationFromDate,setIsEducationFromDate] = useState<string>("");
  const [isExperienceFromDate,setIsExperienceFromDate] = useState<string>("");
  const [isExperienceToDate,setIsExperienceToDate] = useState<string>("");
  const [isEducationUniversity,setIsEducationUniversity] = useState("");
  const [edu_from_date,setIsFromDate] = useState<string>("");
  const [edu_to_date,setIsToDate] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const [educationItems, setEducationItems] = useState<EducationIJobType[] | null>(null);
  const [experienceItems, setExperienceItems] = useState<ExperienceIJobType[] | null>(null);
  let from_date_edu=edu_from_date;
  let to_date_edu=edu_from_date;
  const from_date=new Date(edu_from_date);
  const [selectedDate, setSelectedDate] = useState(new Date(dateOfBirth !==""?dateOfBirth:100));
  const token = localStorage.getItem("token");
  const initialData = [{}, {}, {}]; // Adjust the size as needed
  const [educationChangedData, setEducationChangedData] = useState<EducationIJobType[]>(initialData);
  // let educationChangedData:EducationIJobType[]=[];
	const to_date=new Date(Date.parse(edu_to_date));
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  
  const [selectedFile, setSelectedFile] = useState<File[]>([]);
 
  const router=useRouter();
  const from_formattedDate = from_date.toLocaleDateString('en-IN', {
		year: 'numeric',
	  });
	const to_formattedDate = to_date.toLocaleDateString('en-IN', {
		year: 'numeric',
	  });
  const [loading, setLoading] = useState(true);
  // const axios = require('axios');
  const [activeTab, setActiveTab] = useState('myprofile');
  const [uploadedImage, setUploadedImage] = useState(userProfile);
  const [uploadedImageFile, setUploadedImageFile] = useState<File | null>(null);
  const [experienceCount, setExperienceCount] = useState(1);
  const [educationCount, setEducationCount] = useState(0);
  const [accordionVisible, setAccordionVisible] = useState(true);
  const [expDivList, setExpDivList] = useState<Div[]>([]);
  const [educationDivList, setEducationDivList] = useState<Div[]>([]);
  const [dynamicEducationArray, setDynamicEducationArray] = useState<EducationIJobType[] | null>(null);
  const [isEducation, setIsEducation] = useState<EducationIJobType[] | null>(null);
  const [isCandidateId, setIsCandidateId] = useState(0);
  const [previousEducationArray, setPreviousEducationArray] = useState<EducationIJobType[]>([]);
  const [dynamicExperienceArray, setDynamicExperienceArray] = useState<ExperienceIJobType[] | null>(null);
  const [previousExperienceArray, setPreviousExperienceArray] = useState<ExperienceIJobType[]>([]);
  const searchParams = useSearchParams();
   const category = searchParams.get('category');
   const regId=localStorage.getItem("reg_Id");
   const [selectedValue, setSelectedValue] = useState(0);
   const currentYear = new Date().getFullYear();
  //  const years = Array.from({ length: 100 }, (_, index) => currentYear - index);
   const options: Option[] = Array.from({ length: 50 }, (_, index) => ({
    label: (currentYear - index).toString(),
    value: (currentYear - index).toString()
  }));

 
  const handleTabClick = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };
  
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Handle file selection and update the state
    if (e.target.files) {
      const newFiles = [...files, ...Array.from(e.target.files)];
      setFiles(newFiles);
      uploadCVFile(newFiles[0])
      setSelectedFile(e.target.files[0]);

    }
  };

  type Props = {
    label: string;
    placeholder?: string;
    onChange: (e?:Event) => void;
  };

  const addExperience = () => {
    handleAddDiv();
    // setExperienceCount(experienceCount + 1);
  };
  const addEducation = () => {
    handleAddEducationDiv();
    // setEducationCount(educationCount + 1);
  };
  const handleProfileInfo = (event: any,from:any) => {
    if(from==="candidateName"){
      setIsCandidateName(event.target.value);
    }
    else if(from==="number"){
      setMobileNumber(event.target.value);
    }
    else if(from==="gender"){
      setGender(event.target.value);
    }
    else if(from==="dateOfBirth"){
      setDateOfBirth(event.target.value);
    }
   
    
    // setEducationCount(educationCount + 1);
  };

  const getExtension = (fileName:any) => {
    return fileName.slice(((fileName.lastIndexOf(".") - 1) >>> 0) + 2);
  };

  // const handleChange = (event: { target: { files: (Blob | MediaSource)[]; }; }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {

    if (event.target.files && event.target.files[0]) {
      const fileImage=event.target.files[0];
      if(fileImage.size>(1024*1024)){
        new Compressor(fileImage, {
          mimeType:"image/"+getExtension(fileImage.name),
          quality: 0.8, // 0.6 can also be used, but its not recommended to go below.
          success: (compressedResult:File) => {
            // compressedResult has the compressed file.
            // Use the compressed file to upload the images to your server.        
            // console.log(compressedResult);
              setUploadedImageFile(compressedResult);
            setUploadedImage(URL.createObjectURL(compressedResult));
          },
        });

      }else{

      setUploadedImageFile(fileImage);
      setUploadedImage(URL.createObjectURL(event.target.files[0]));
    }
      // uploadFile(event.target.files[0],"profilePicture")

    }else{
      setUploadedImage(userProfile);
    }
  };

  const profileSave=()=>{
    setLoading(true);
    if(uploadedImageFile!=null &&files.length!=0){
      uploadFile(uploadedImageFile,"profilePicture")
      uploadFile(files[0],"cvFile")
    }
    else if(uploadedImageFile!=null){
      uploadFile(uploadedImageFile,"profilePicture")
    }
    else if(files.length!=0){
      uploadFile(files[0],"cvFile")
      // setSelectedFile(e.target.files[0]);
    }
   
   
    
  }
  
  const uploadCVFile = async (fileImage:any) => {

    if (!fileImage) {
      // console.log('Please select a file.');
      return;
    }
    // const endpoint = 'https://kaninfos.com/KANNaukariAPI/upload?candidateId='+regId;
    const formData = new FormData(this);
    formData.append("file", fileImage);
  //   const response = await fetch(endpoint, {
  //     method: 'POST',
  //     headers: {
  //         'Content-Type': 'multipart/form-data',
  //         'Authorization': 'Bearer '+token
  //     },
  //     body: formData
  // });
  // console.log("Response:"+response)
 

    
  };
  const uploadFile = async (fileImage:any,from:any) => {
    // setLoading(true);
    if (!fileImage) {
      // console.log('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append(from, fileImage);
 

    try {
      const response = await axios.post(baseUrl+'/upload?candidateId='+regId,formData);

      if (response.status===200) {
        setLoading(false);
        notifySuccess(response.statusText);
        if(from==="profilePicture"||from==="cvFile"){
          const data={
            "candidateId": isCandidateId,
            "candidateName": isCandidateName,
            "dateOfBirth": new Date(dateOfBirth).toISOString().toString(),
            "mobileNumber": mobileNumber,
            "primarySkills":candidateSkills,
            "gender": gender,
            "reg_Id": regId
          };
          updateCandidateDetails(data);
        }
        // notifySuccess(response.data.message)
      } else {
        setLoading(false);
        notifyError('Failed to upload file.');
      }
    } catch (error:any) {
      setLoading(false);
      notifyError(error.response.data)
      // console.error('Error uploading file:', error);
    }
  };

  const handleDateChange = (date:Date) => {
    setSelectedDate(date);
  };

  const new_from_date=(newDate:any)=>{
    const from_date=new Date(newDate);
    const from_formattedDate = from_date.toLocaleDateString('en-IN', {
      year: 'numeric',
      });
      return from_formattedDate;
  }
  const new_profile_from_date=(newDate:any)=>{
    const from_date=new Date(newDate);
    const from_formattedDate = from_date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      });
      return from_formattedDate;
  }
  

  const deleteImg = () => {

   
      setUploadedImage(userProfile);
    
  };

  const fdate=(tdate:any)=>{
    return new Date(tdate);
   }
   const convertDate=(cdate:any)=>{
     return cdate.toLocaleDateString('en-IN', {
       day: 'numeric',
       month: 'numeric',
       year: 'numeric',
       });
   }
   
  const toggleAccordionVisibility = () => {
    setAccordionVisible(!accordionVisible);
  };
  
  const handleAddEducationDiv = () => {
    // Add a new div to the list
    const i=educationDivList.length+1;
    const newDivList = [...educationDivList, { id: educationDivList.length+1, content: <div className="accordion-item" id='a'>
    <div id="addEducation">
    <div className="accordion-header" id="headingOne">
            <div className="education-accordian" >
              Add Education 
            </div>
          </div>
    <div id="collapseTwo" className="accordion-collapse collapse show" aria-labelledby="headingTwo" data-bs-parent="#accordionOne">
      <div className="accordion-body">
        <div className="row">
          <div className="col-lg-2">
            <div className="dash-input-wrapper mb-30 md-mb-10">
              <label htmlFor="">Title</label>
            </div>
          </div>
          <div className="col-lg-10">
            <div className="dash-input-wrapper mb-30">
              {/* <input type="text" placeholder="Product Designer (Google)" onChange={(e) => handleInputChange1(e,i,"Education","courseTitle")}/> */}
              <EducationSelect/>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-2">
            <div className="dash-input-wrapper mb-30 md-mb-10">
              <label htmlFor="">Academy</label>
            </div>
          </div>
          <div className="col-lg-10">
            <div className="dash-input-wrapper mb-30">
              <input type="text" placeholder="Google Arts Collage & University" onChange={(e) => handleInputChange1(e,i,"Education","university")}/>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-2">
            <div className="dash-input-wrapper mb-30 md-mb-10">
              <label htmlFor="">Specialization</label>
            </div>
          </div>
          <div className="col-lg-10">
            <div className="dash-input-wrapper mb-30">
              {/* <input type="text" placeholder="Google Arts Collage & University"  onChange={(e) => handleInputChange1(e,i,"Education","specialization")}/> */}
              <SpecializationSelect/>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-2">
            <div className="dash-input-wrapper mb-30 md-mb-10">
              <label htmlFor="">Course Type</label>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="dash-input-wrapper mb-30">
              <input type="text" placeholder="Google Arts Collage & University"  onChange={(e) => handleInputChange1(e,i,"Education","courseType")}/>
            </div>
          </div>
          
          <div className="col-lg-1">
            <div className="dash-input-wrapper mb-30 md-mb-10">
              <label htmlFor="">Marks </label>
            </div>
          </div>
          <div className="col-lg-2">
            <div className="dash-input-wrapper mb-30">
              <input type="number" className='no-spin' maxLength={2} placeholder="Marks"  onChange={(e) => handleInputChange1(e,i,"Education","perOrCgpa")} />
            </div>
          </div>
          <div className="col-lg-3" style={{paddingLeft:'0px'}}>
            <div className="dash-input-wrapper mb-30">
              <span>%</span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-2">
            <div className="dash-input-wrapper mb-30 md-mb-10">
              <label htmlFor="">Year</label>
            </div>
          </div>
          <div className="col-lg-10">
            <div className="row">
              <div className="col-sm-6">
              <div className="dash-input-wrapper mb-30">
                        <NiceSelect
                        options={options}
                        defaultCurrent={0}
                        onChange={(item) => handleYear(item,i,"educationFromDate")}
                        name="Year"
                        />
                      {/* <SelectYear value={from_formattedDate} value1=''/> */}
                      </div>
              </div>
              <div className="col-sm-6">
              <div className="dash-input-wrapper mb-30">
                        <NiceSelect
                        options={options}
                        defaultCurrent={0}
                        onChange={(item) => handleYear(item,i,"educationToDate")}
                        name="Year"
                        />
                      {/* <SelectYear value={from_formattedDate} value1=''/> */}
                      </div>
              {/* <SelectYear value={new_from_date(educationItems![i].job_to_date)}value1=""/>   */}
              </div>
            </div>
          </div>
        </div>
      
      </div>
    </div>
    </div>
  </div> }];
    setEducationDivList(newDivList);
  };
  const handleAddEducationDivNew = () => {
    const newDivList = [];
    if(educationCount>0)
    for(let i=1;i<educationCount;i++){
        newDivList.push({ id: educationDivList.length+1, content: <div className="accordion-item" id='a'>
    <div id="addEducation">
    <div className="accordion-header" id="headingOne">
            <div className="education-accordian" >
              Add Education 
            </div>
          </div>
    <div id="collapseTwo" className="accordion-collapse collapse show" aria-labelledby="headingTwo" data-bs-parent="#accordionOne">
      <div className="accordion-body">
        <div className="row">
          <div className="col-lg-2">
            <div className="dash-input-wrapper mb-30 md-mb-10">
              <label htmlFor="">Title</label>
            </div>
          </div>
          <div className="col-lg-10">
            <div className="dash-input-wrapper mb-30">
              <input type="text" placeholder="Product Designer (Google)" defaultValue={educationItems![i].courseTitle} onChange={(e) => handleInputChange1(e,i,"Education","courseTitle")}/>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-2">
            <div className="dash-input-wrapper mb-30 md-mb-10">
              <label htmlFor="">Academy</label>
            </div>
          </div>
          <div className="col-lg-10">
            <div className="dash-input-wrapper mb-30">
              <input type="text" placeholder="Google Arts Collage & University" defaultValue={educationItems![i].university} onChange={(e) => handleInputChange1(e,i,"Education","university")}/>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-2">
            <div className="dash-input-wrapper mb-30 md-mb-10">
              <label htmlFor="">Specialization</label>
            </div>
          </div>
          <div className="col-lg-10">
            <div className="dash-input-wrapper mb-30">
              <input type="text" placeholder="Google Arts Collage & University" defaultValue={educationItems![i].specialization} onChange={(e) => handleInputChange1(e,i,"Education","specialization")}/>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-2">
            <div className="dash-input-wrapper mb-30 md-mb-10">
              <label htmlFor="">Course Type</label>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="dash-input-wrapper mb-30">
              <input type="text" placeholder="Google Arts Collage & University" defaultValue={educationItems![i].courseType} onChange={(e) => handleInputChange1(e,i,"Education","courseType")}/>
            </div>
          </div>
          <div className="col-lg-1">
            <div className="dash-input-wrapper mb-30 md-mb-10">
              <label htmlFor="">Marks </label>
            </div>
          </div>
          <div className="col-lg-2">
            <div className="dash-input-wrapper mb-30">
              <input type="text" maxLength={2} placeholder="Marks"  defaultValue={ (educationItems![i].perOrCgpa )} onChange={(e) => handleInputChange1(e,i,"Education","perOrCgpa")} />
            </div>
          </div>
          <div className="col-lg-3" style={{paddingLeft:'0px'}}>
            <div className="dash-input-wrapper mb-30">
              <span>%</span>
            </div>
          </div>
          
        </div>
        <div className="row">
          <div className="col-lg-2">
            <div className="dash-input-wrapper mb-30 md-mb-10">
              <label htmlFor="">Year</label>
            </div>
          </div>
          <div className="col-lg-10">
            <div className="row">
              <div className="col-sm-6">
              <div className="dash-input-wrapper mb-30">
                        <NiceSelect
                        options={options}
                        defaultCurrent={getDefaultValue(new_from_date(educationItems![i].educationFromDate))}
                        onChange={(item) => handleYear(item,i,"educationFromDate")}
                        name="Year"
                        />
                      {/* <SelectYear value={from_formattedDate} value1=''/> */}
                      </div>
              </div>
              <div className="col-sm-6">
              <div className="dash-input-wrapper mb-30">
                        <NiceSelect
                        options={options}
                        defaultCurrent={getDefaultValue(new_from_date(educationItems![i].educationToDate))}
                        onChange={(item) => handleYear(item,i,"educationToDate")}
                        name="Year"
                        />
                      {/* <SelectYear value={from_formattedDate} value1=''/> */}
                      </div>
              {/* <SelectYear value={new_from_date(educationItems![i].job_to_date)}value1=""/>   */}
              </div>
            </div>
          </div>
        </div>
      
      </div>
    </div>
    </div>
  </div> });
    setEducationDivList([...educationDivList, ...newDivList]);
    }
    // isEducation.map(item=>())?
    
  };
  const handleAddExperienceDivNew = () => {
    if(educationCount>0)
    for(let i=1;i<dynamicExperienceArray!.length;i++){
      const newDivList = [...expDivList, { id: expDivList.length + 1, content: <div className="accordion dash-accordion-one">
    <div className="accordion-item">
    <div className="accordion-header" >
         <button className="accordion-button collapsed" type="button" onClick={toggleAccordionVisibility}  aria-expanded="false" aria-controls="collapseOneA">
           Add Experience 
         </button>
       </div>
      {/* <div id={'collapse'+experienceCount+2} className="accordion-collapse collapse" aria-labelledby={'heading'+experienceCount+2} data-bs-parent={'#accordion'+experienceCount+2}> */}
      <div id={'collapse'+experienceCount+2} className='accordion-collapse collapse show'  aria-labelledby={'heading'+experienceCount+2} data-bs-parent={'#accordion'+experienceCount+2}>
         <div className="accordion-body">
          <div className="row">
            <div className="col-lg-2">
              <div className="dash-input-wrapper mb-30 md-mb-10">
                <label htmlFor="">Title*</label>
              </div>
            </div>
            <div className="col-lg-10">
              <div className="dash-input-wrapper mb-30">
                <input type="text" placeholder="Lead Product Designer " defaultValue={dynamicExperienceArray![i].jobTitle} onChange={(e) => handleInputChangeExperience(e,i,"Experience","jobTitle")}/>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-2">
              <div className="dash-input-wrapper mb-30 md-mb-10">
                <label htmlFor="">Company*</label>
              </div>
            </div>
            <div className="col-lg-10">
              <div className="dash-input-wrapper mb-30">
                <input type="text" placeholder="Amazon Inc" defaultValue={dynamicExperienceArray![i].employerName} onChange={(e) => handleInputChangeExperience(e,i,"Experience","employerName")}/>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-2">
              <div className="dash-input-wrapper mb-30 md-mb-10">
                <label htmlFor="">Job Location*</label>
              </div>
            </div>
            <div className="col-lg-10">
              <div className="dash-input-wrapper mb-30">
                <input type="text" placeholder="Mumbai" defaultValue={dynamicExperienceArray![i].jobLocation} onChange={(e) => handleInputChangeExperience(e,i,"Experience","jobLocation")}/>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-2">
              <div className="dash-input-wrapper mb-30 md-mb-10">
                <label htmlFor="">Year*</label>
              </div>
            </div>
            <div className="col-lg-10">
                    <div className="row">
                      <div className="col-sm-6">
                      <div className="dash-input-wrapper mb-30">
                      <NiceSelect
                        options={options}
                        defaultCurrent={getDefaultValue(new_from_date(dynamicExperienceArray && dynamicExperienceArray?.length !== 0 && dynamicExperienceArray !== undefined ? dynamicExperienceArray![0].professionalFromDate : ''))}
                        onChange={(item) => handleYearExperience(item,i,"professionalFromDate")}
                        name="Year"
                        />
                        {/* <SelectYear value='2018'value1=''/> */}
                      </div>
                      </div>
                      <div className="col-sm-6">
                      <div className="dash-input-wrapper mb-30">
                         <NiceSelect
                        options={options}
                        defaultCurrent={dynamicExperienceArray && dynamicExperienceArray !== null && dynamicExperienceArray !== undefined ? getDefaultValue(new_from_date(dynamicExperienceArray?.length !== 0 && dynamicExperienceArray !== undefined ? dynamicExperienceArray![0].professionalToDate : '')):""}
                        onChange={(item) => handleYearExperience(item,i,"professionalToDate")}
                        name="Year"
                        />
                        {/* <SelectYear value='2018'value1=''/> */}
                      </div>
                      </div>
                    </div>
                    
                  </div>
          </div>
          <div className="row">
            <div className="col-lg-2">
              <div className="dash-input-wrapper mb-30 md-mb-10">
                <label htmlFor="">Description*</label>
              </div>
            </div>
            <div className="col-lg-10">
              <div className="dash-input-wrapper mb-30">
                <textarea className="size-lg" placeholder="Morbi ornare ipsum sed sem condimentum, et pulvinar tortor luctus. Suspendisse condimentum lorem ut elementum aliquam et pulvinar tortor luctus."></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  {/* </div> */}
  {/* Your content for each additional experience */}
</div> }];
    setExpDivList(newDivList);
    }
    // isEducation.map(item=>())?
    
  };


  const handleAddDiv = () => {
    // Add a new div to the list
    const newDivList = [...expDivList, { id: expDivList.length + 1, content: <div className="accordion dash-accordion-one">
    <div className="accordion-item">
    <div className="accordion-header" >
         <button className="accordion-button collapsed" type="button" onClick={toggleAccordionVisibility}  aria-expanded="false" aria-controls="collapseOneA">
           Add Experience 
         </button>
       </div>
      {/* <div id={'collapse'+experienceCount+2} className="accordion-collapse collapse" aria-labelledby={'heading'+experienceCount+2} data-bs-parent={'#accordion'+experienceCount+2}> */}
      <div id={'collapse'+experienceCount+2} className='accordion-collapse collapse show'  aria-labelledby={'heading'+experienceCount+2} data-bs-parent={'#accordion'+experienceCount+2}>
         <div className="accordion-body">
          <div className="row">
            <div className="col-lg-2">
              <div className="dash-input-wrapper mb-30 md-mb-10">
                <label htmlFor="">Title*</label>
              </div>
            </div>
            <div className="col-lg-10">
              <div className="dash-input-wrapper mb-30">
                <input type="text" placeholder="Lead Product Designer " onChange={(e) => handleInputChangeExperience(e,expDivList.length + 1,"Experience","jobTitle")}/>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-2">
              <div className="dash-input-wrapper mb-30 md-mb-10">
                <label htmlFor="">Company*</label>
              </div>
            </div>
            <div className="col-lg-10">
              <div className="dash-input-wrapper mb-30">
                <input type="text" placeholder="Amazon Inc" onChange={(e) => handleInputChangeExperience(e,expDivList.length + 1,"Experience","employerName")}/>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-2">
              <div className="dash-input-wrapper mb-30 md-mb-10">
                <label htmlFor="">Job Location*</label>
              </div>
            </div>
            <div className="col-lg-10">
              <div className="dash-input-wrapper mb-30">
                <input type="text" placeholder="Mumbai" onChange={(e) => handleInputChangeExperience(e,expDivList.length + 1,"Experience","jobLocation")}/>
              </div>
            </div>
          </div>
          
          <div className="row">
            <div className="col-lg-2">
              <div className="dash-input-wrapper mb-30 md-mb-10">
                <label htmlFor="">Year*</label>
              </div>
            </div>
            <div className="col-lg-10">
                    <div className="row">
                      <div className="col-sm-6">
                      <div className="dash-input-wrapper mb-30">
                      <NiceSelect
                        options={options}
                        defaultCurrent={getDefaultValue(new_from_date(dynamicExperienceArray && dynamicExperienceArray?.length !== 0 && dynamicExperienceArray !== undefined ? dynamicExperienceArray![0].professionalFromDate : ''))}
                        onChange={(item) => handleYearExperience(item,expDivList.length + 1,"professionalFromDate")}
                        name="Year"
                        />
                        {/* <SelectYear value='2018'value1=''/> */}
                      </div>
                      </div>
                      <div className="col-sm-6">
                      <div className="dash-input-wrapper mb-30">
                         <NiceSelect
                        options={options}
                        defaultCurrent={dynamicExperienceArray && dynamicExperienceArray !== null && dynamicExperienceArray !== undefined ? getDefaultValue(new_from_date(dynamicExperienceArray?.length !== 0 && dynamicExperienceArray !== undefined ? dynamicExperienceArray![0].professionalToDate : '')):""}
                        onChange={(item) => handleYearExperience(item,expDivList.length + 1,"professionalToDate")}
                        name="Year"
                        />
                        {/* <SelectYear value='2018'value1=''/> */}
                      </div>
                      </div>
                    </div>
                    
                  </div>
          </div>
          {/* <div className="row">
            <div className="col-lg-2">
              <div className="dash-input-wrapper mb-30 md-mb-10">
                <label htmlFor="">Description*</label>
              </div>
            </div>
            <div className="col-lg-10">
              <div className="dash-input-wrapper mb-30">
                <textarea className="size-lg" placeholder="Morbi ornare ipsum sed sem condimentum, et pulvinar tortor luctus. Suspendisse condimentum lorem ut elementum aliquam et pulvinar tortor luctus."></textarea>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  {/* </div> */}
  {/* Your content for each additional experience */}
</div> }];
    setExpDivList(newDivList);
  };



  const newEducationArray:EducationIJobType[] = [...previousEducationArray];
  const handleYear = (item: { value: string; label: string }, i: number, from: string) => {
    if (!previousEducationArray) return; // Ensure previousEducationArray is not null
  
    // const newArray = [...previousEducationArray];
  
    if (i >= 0 && i <= newEducationArray.length) {
      const updatedItem = { ...newEducationArray[i] };
  
      if (from === "educationFromDate") {
        updatedItem.educationFromDate = fdate(item.label).toISOString();
      } else if (from === "educationToDate") {
        updatedItem.educationToDate = fdate(item.label).toISOString();
      }
  
      newEducationArray[i] = updatedItem;
      setPreviousEducationArray(newEducationArray);
      // setPreviousEducationArray([...previousEducationArray, newValue]);
    }
  };
  let newData: EducationIJobType = { };
  const handleInputChange1 = (event: any, index: number, from: string, to: string) => {
    if (!previousEducationArray) return; // Ensure previousEducationArray is not null
  
    
  
    if (index >= 0 && index < newEducationArray.length) {
      const updatedItem = { ...newEducationArray[index] };
  
      switch (to) {
        case "courseTitle":
          updatedItem.courseTitle = event.target.value;
          break;
        case "courseType":
          updatedItem.courseType = event.target.value;
          break;
        case "perOrCgpa":
          updatedItem.perOrCgpa = event.target.value;
          break;
        case "specialization":
          updatedItem.specialization = event.target.value;
          break;
        case "university":
          updatedItem.university = event.target.value;
          break;
        default:
          break;
      }
      if(updatedItem.educationFromDate===undefined){
        updatedItem.educationFromDate=new Date().toISOString().toString();
      }
      if(updatedItem.educationToDate===undefined){
        updatedItem.educationToDate=new Date().toISOString().toString();
      }
      updatedItem.reg_Id=Number(regId);
      newEducationArray[index] = updatedItem;
    } else {
      // If index is not present, add the new data to the array
       newData = { [to]: event.target.value }; // Create a new object with the provided key-value pair
       newEducationArray.push(newData);
    }

    setPreviousEducationArray(newEducationArray);
    // console.log(previousEducationArray);
  
    // setPreviousEducationArray(newArray);
  };
  const newExperienceArray:ExperienceIJobType[] = [...previousExperienceArray];
  const handleYearExperience = (item: { value: string; label: string }, i: number, from: string) => {
    if (!newExperienceArray) return; // Ensure previousEducationArray is not null
  
    // const newArray = [...previousEducationArray];
  
    if (i >= 0 && i <= newExperienceArray.length) {
      const updatedItem = { ...newExperienceArray[i] };
  
      if (from === "professionalFromDate") {
        updatedItem.professionalFromDate = fdate(item.label).toISOString();
      } else if (from === "professionalToDate") {
        updatedItem.professionalToDate = fdate(item.label).toISOString();
      }
  
      newExperienceArray[i] = updatedItem;
      setPreviousExperienceArray(newExperienceArray);
      // setPreviousEducationArray([...previousEducationArray, newValue]);
    }
  };
  const [inputSkillsValue, setInputSkillsValue] = useState('');
  const [skills, setSkills] = useState(['Java', '.net', 'Python', 'Android']);

  const handleRemoveFile = (index:any) => {
    // Remove the file at the specified index
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
    setSelectedFile(updatedFiles);
  };
  let newExperienceData: ExperienceIJobType = { };
  const handleInputChangeExperience = (event: any, index: number, from: string, to: string) => {
    if (!previousEducationArray) return; // Ensure previousEducationArray is not null
  
    
  
    if (index >= 0 && index < newExperienceArray.length) {
      const updatedItem = { ...newExperienceArray[index] };
  
      switch (to) {
        case "jobTitle":
          updatedItem.jobTitle = event.target.value;
          break;
        case "employerName":
          updatedItem.employerName = event.target.value;
          break;
        case "jobLocation":
          updatedItem.jobLocation = event.target.value;
          break;
        
      
        default:
          break;
      }
      if(updatedItem.professionalFromDate===undefined){
        updatedItem.professionalFromDate=new Date().toISOString().toString();
      }
      if(updatedItem.professionalToDate===undefined){
        updatedItem.professionalToDate=new Date().toISOString().toString();
      }
      updatedItem.reg_Id=regId!;
  
      newExperienceArray[index] = updatedItem;
    } else {
      // If index is not present, add the new data to the array
      newExperienceData = { [to]: event.target.value }; // Create a new object with the provided key-value pair
       newExperienceArray.push(newExperienceData);
    }

    setPreviousExperienceArray(newExperienceArray);
    // console.log(previousEducationArray);
  
    // setPreviousEducationArray(newArray);
  };
 
  const handleRemoveDiv = (divId:any) => {
    // Remove the div with the specified id
    removeExperienceData(divId);
    
  };
  const handleEducationRemoveDiv = (divId:any) => {
    // Remove the div with the specified id
    removeEducationData(divId);
  };

  const handleSendEducationData=()=>{
    addEducationData(previousEducationArray);
  }
  const handleSendExperienceData=()=>{
    addEdxperienceData(previousExperienceArray);
    // addExperienceData(previousEducationArray);
  }

  const getDefaultValue = (value:any):any => {
    // Your dynamic logic to determine the default value
    
      for(let i=0;i<options.length;i++){
        if(options[i].label===value){
          return(i);
          // break;
        }
      }
     // For example, set the default value to the first option
  };
  const removeEducationData=(eduId:any)=>{
    if((educationItems!.length)<=eduId){
      const updatedDivList = educationDivList.filter((div) => div.id !== eduId);
        setEducationDivList(updatedDivList);
    }else{
    const id=educationItems![eduId].educationId;
    const token = localStorage.getItem("token");
  
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': 'Bearer '+token
      },
      url: baseUrl+'/deleteEducationDetails/'+regId+'/'+id,
     
    };
    
    axios.request(config)
    .then((response:any) => {
      if(response.status==200){
        notifySuccess(response.data.message)
       const updatedDivList = educationDivList.filter((div) => div.id !== eduId);
        setEducationDivList(updatedDivList);
        // from_date_edu=response.data.obj.educationDetails[0].professionalDetails;
        // to_date_edu=response.data.obj.educationDetails[0].professionalDetails;
        // setIsEducationName*();
          setLoading(false);
        
      }else if(response.message=="Unauthorized"){
          localStorage.clear();
          // router.push("/");
          setLoading(false);
          // setShowShiveringProgressDialog(false);
      }
      // console.log(JSON.stringify(response.data));
    })
    .catch((error:any) => {
      
      setLoading(false);
      if(error.message==="Request failed with status code 401"){
        localStorage.clear();
        notifyError("Authentication Failed");
          router.push("/");
          setLoading(false);
      }else{
        notifyError(error.message);
      }
      // setShowShiveringProgressDialog(false);
    });
  }
    
  }
  const removeExperienceData=(expId:any)=>{
    
    if((experienceItems!.length)<=expId){
      const updatedDivList = expDivList.filter((div) => div.id !== expId);
        setExpDivList(updatedDivList);
    }else{
      const id=experienceItems![expId].professionalId;
    const token = localStorage.getItem("token");
  
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': 'Bearer '+token
      },
      url: baseUrl+'/deleteProfessionalDetails/'+regId+'/'+id,
     
    };
    
    axios.request(config)
    .then((response:any) => {
      if(response.status==200){
        notifySuccess(response.data.message)
       const updatedDivList = expDivList.filter((div) => div.id !== id);
        setExpDivList(updatedDivList);
        // from_date_edu=response.data.obj.educationDetails[0].professionalDetails;
        // to_date_edu=response.data.obj.educationDetails[0].professionalDetails;
        // setIsEducationName*();
          setLoading(false);
        
      }else if(response.message=="Unauthorized"){
          localStorage.clear();
          // router.push("/");
          setLoading(false);
          // setShowShiveringProgressDialog(false);
      }
      // console.log(JSON.stringify(response.data));
    })
    .catch((error:any) => {
      
      setLoading(false);
      if(error.message==="Request failed with status code 401"){
        localStorage.clear();
        notifyError("Authentication Failed");
          router.push("/");
          setLoading(false);
      }else{
        notifyError(error.message);
      }
      // setShowShiveringProgressDialog(false);
    });
  }
  }
  const addEducationData=(data:any)=>{
   
    const token = localStorage.getItem("token");
  
  
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: baseUrl+'/InsertOrUpdateEducationDetails',
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': 'Bearer Token '+token
      },
      data : data
    };
    
    axios.request(config)
    .then((response:any) => {
      if(response.status==200){

        notifySuccess(response.data.message)
        // window.location.reload();
        
      }else if(response.message=="Unauthorized"){
          localStorage.clear();
          // router.push("/");
          setLoading(false);
          // setShowShiveringProgressDialog(false);
      }
      // console.log(JSON.stringify(response.data));
    })
    .catch((error:any) => {
      setLoading(false);
      if(error.message==="Request failed with status code 401"){
        localStorage.clear();
        notifyError("Authentication Failed");
          router.push("/");
          setLoading(false);
      }else{
        notifyError(error.message);
      }
      // setShowShiveringProgressDialog(false);
    });
    
  }
  const updateCandidateDetails=(data:any)=>{
    const token = localStorage.getItem("token");  
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: baseUrl+'/UpdateCandidateDetails',
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': 'Bearer Token '+token
      },
      data : JSON.stringify(data)
    };

    axios.request(config)
    .then((response:any) => {
      if(response.status==200){
        notifySuccess(response.data.message)
        // window.location.reload();
        
      }else if(response.message=="Unauthorized"){
          localStorage.clear();
          // router.push("/");
          setLoading(false);
          // setShowShiveringProgressDialog(false);
      }
      // console.log(JSON.stringify(response.data));
    })
    .catch((error:any) => {
      setLoading(false);
      if(error.message==="Request failed with status code 401"){
        localStorage.clear();
        notifyError("Authentication Failed");
          router.push("/");
          setLoading(false);
      }else{
        notifyError(error.message);
      }
      // setShowShiveringProgressDialog(false);
    }); 
  }
  const addEdxperienceData=(data:any)=>{
    const token = localStorage.getItem("token");
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: baseUrl+'/InsertOrUpdateProfessionalDetails',
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': 'Bearer Token '+token
      },
      data : data
    };
    
    axios.request(config)
    .then((response:any) => {
      if(response.status==200){

        notifySuccess(response.data.message)
        // window.location.reload();
        
      }else if(response.message=="Unauthorized"){
          localStorage.clear();
          // router.push("/");
          setLoading(false);
          // setShowShiveringProgressDialog(false);
      }
      // console.log(JSON.stringify(response.data));
    })
    .catch((error:any) => {
      setLoading(false);
      if(error.message==="Request failed with status code 401"){
        localStorage.clear();
        notifyError("Authentication Failed");
          router.push("/");
          setLoading(false);
      }else{
        notifyError(error.message);
      }
      // setShowShiveringProgressDialog(false);
    });
    
  }
  useEffect(() => {
    if(sessionStorage.candedateDetails!=undefined && sessionStorage.candedateDetails!=null){
      const candidateDetails=JSON.parse(sessionStorage.candedateDetails)
      const { profilePictureUrl, candidateName } = candidateDetails;
      handleAddEducationDiv();
      setIsCandidateName(candidateDetails.candidateName);
              if(candidateDetails.educationDetails.length!==0){
              setIsEducationFromDate(getDefaultValue(new_from_date(candidateDetails.educationDetails[0].educationFromDate)));
              setIsEducationToDate(getDefaultValue(new_from_date(candidateDetails.educationDetails[0].educationToDate)));
              setIsFromDate(candidateDetails.educationDetails[0].educationFromDate);
              setIsToDate(candidateDetails.educationDetails[0].educationToDate);
              }
              setIsCandidateId(candidateDetails.candidateId)
              setEducationCount(candidateDetails.educationDetails.length);
              setEducationItems(candidateDetails.educationDetails);
              setExperienceItems(candidateDetails.professionalDetails);
              setPreviousEducationArray(candidateDetails.educationDetails);
              setDynamicEducationArray(candidateDetails.educationDetails);
              setDynamicExperienceArray(candidateDetails.professionalDetails);
              setPreviousExperienceArray(candidateDetails.professionalDetails);
              setMobileNumber(candidateDetails.mobileNumber);
              setDateOfBirth(candidateDetails.dateOfBirth);
              setSelectedDate(new Date(candidateDetails.dateOfBirth))
              setGender(candidateDetails.gender);
              setUploadedImage("https://kaninfos.com/KANNaukriAPI"+candidateDetails.profilePictureUrl);
              if(candidateDetails.professionalDetails.length!==0){
              setIsExperienceFromDate(candidateDetails.professionalDetails[0].professionalFromDate)
              setIsExperienceToDate(candidateDetails.professionalDetails[0].professionalToDate)
              }
              if(candidateDetails.primarySkills!==null){
              setCandidateSkills(candidateDetails.primarySkills);
            }
              
              setIsEducation(candidateDetails.educationDetails);
    }
    
  }, []);
  
  useEffect(() => {
    // Incorrect: Causing an infinite loop
    if(educationCount>1){
    handleAddEducationDivNew();
  }
  if(dynamicExperienceArray!=null && dynamicExperienceArray!.length>1){
    handleAddExperienceDivNew();
  }
  if(educationItems!=null)
  setDynamicEducationArray(educationItems)

    
  }, [educationItems,dynamicExperienceArray]);

  const filteredSkillsSuggestions = skills.filter(suggestion =>
    suggestion.toLowerCase().includes(inputSkillsValue.toLowerCase())
  );

  const handleCategoryVal = (data:any) => {
    // setcategoryVal(data);
    setCandidateSkills(data.join(', '))
    // console.log(data);
  };
  // const handleRemoveFile = () => {
  //   setSelectedFile(null);
  // };

  return (
    <div className="dashboard-body">
      <div className="position-relative">
        <HeaderFour value='Profile'/>
        <h2 className="main-title">My Profile</h2>
      <div className="tab-content">
        {category === 'myprofile' && <>
        {/* <div className=" card-box border-20 mt-40" style={{backgroundColor:'#F5F5F5'}}> */}
        <div className="card-box border-20 mt-40" style={{backgroundColor:'#FFF'}}>
          <div className="user-avatar-setting d-flex align-items-center mb-30">
            <Image src={uploadedImage} alt="avatar" className="lazy-img user-img "  width={75} height={75} style={{height:'revert-layer !important'}}/>
            <div className="upload-btn position-relative tran3s ms-4 me-3">
              Upload new photo
              <input type="file" id="uploadImg" name="uploadImg" placeholder="" onChange={handleChange} accept="image/png, image/jpeg"/>
            </div>
            {/* <button className="delete-btn tran3s" onClick={deleteImg}>Delete</button> */}
          </div>   
          <div className="dash-input-wrapper mb-30">
            <label htmlFor="">Full Name</label>
            <input type="text" value={isCandidateName} onChange={(e) => handleProfileInfo(e,"candidateName")}/>
          </div>
          <div className="dash-input-wrapper mb-30">
                  <div className="dash-input-wrapper mb-20">
                    <label htmlFor="">Contact Number</label>
                    <input type="text" value={mobileNumber} onChange={(e) => handleProfileInfo(e,"number")} maxLength={10}/>
                  </div>
          </div>
          <div className="dash-input-wrapper mb-30">
                <div className="dash-input-wrapper mb-20">
                  <label htmlFor="">Gender</label>
                  {/* <input type="text" value={gender} onChange={(e) => handleProfileInfo(e,"gender")}/> */}
                  {/* <label htmlFor="">Country*</label> */}
                <GenderSelect />
                </div>
          </div>
          <div className="dash-input-wrapper mb-30">
                <div className="dash-input-wrapper mb-20">
                  <label htmlFor="">Date of Birth</label>
                  <DatePicker
                    className="dash-input-wrapper1 "
                    selected={selectedDate}
                    onChange={handleDateChange}
                    maxDate={new Date()}
                    showIcon
                    placeholderText="Select a date"
                    />
                </div>
          </div>
          <div className="dash-input-wrapper mb-30">
                <div className="dash-input-wrapper mb-20">
                  <label htmlFor="">Skills</label>
                  <AutocompleteComponent options={filteredSkillsSuggestions} name='Add Skills' className='autocomplete-b' sendData={handleCategoryVal} sValue={candidateSkills}/>
                </div>
          </div>
          <div className="user-avatar-setting d-flex align-items-center mb-10 mt-20 ">
            <div className="dash-btn-one d-inline-block position-relative me-3 ">
              <i className="bi bi-plus"></i>
              Upload CV
              <input type="file" id="uploadCV" name="uploadCV"onChange={handleFileChange} placeholder="" accept=".pdf, .doc, .docx" multiple/>
            </div>
            {/* <div id="uploadedFileName">{uploadedFile}</div> */}
            <small>Upload files of type .pdf, .doc, .docx</small>            
          </div>
            {selectedFile && <div id="uploadedFileName">{selectedFile.name}
            {selectedFile.name && <button onClick={handleRemoveFile} className="btn btn-link"><svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiChip-deleteIcon MuiChip-deleteIconMedium MuiChip-deleteIconColorDefault MuiChip-deleteIconFilledColorDefault css-i4bv87-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="CancelIcon"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path></svg></button>}
            </div>}
          <div className="button-group d-inline-flex align-items-center mt-30">
          <a className="dash-btn-two tran3s me-3" onClick={() =>profileSave()}>Save</a>
          {/* <a href="#" className="dash-cancel-btn tran3s">Cancel</a> */}
        </div>
        </div>
        </>}
        {category === 'education' && 
        <><div className="bg-white card-box border-20 mt-40">
                <h4 className="dash-title-three">Education</h4>

                <div className="accordion dash-accordion-one" id="accordionOne">
                  <div className="accordion-item">
                    <div className="accordion-header" id="headingOne">
                      <div className="education-accordian">
                        Add Education
                      </div>
                    </div>
                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionOne">
                      <div className="accordion-body">
                        <div className="row">
                          <div className="col-lg-2">
                            <div className="dash-input-wrapper mb-30 md-mb-10">
                              <label htmlFor="">Title</label>
                            </div>
                          </div>
                          <div className="col-lg-10">
                            <div className="dash-input-wrapper mb-30">
                              {/* <input id="0" type="text" placeholder="Product Designer (Google)" name='title' defaultValue={dynamicEducationArray![0].courseTitle} onChange={(e) => handleInputChange(e)} aria-rowindex={0}/> */}
                              <input id="0" type="text" placeholder="Product Designer (Google)" name='title' defaultValue={(dynamicEducationArray != null && dynamicEducationArray != undefined) ? dynamicEducationArray[0] ? dynamicEducationArray[0].courseTitle : '':''} onChange={(e) => handleInputChange1(e, 0, "Education", "courseTitle")} aria-rowindex={0} />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-2">
                            <div className="dash-input-wrapper mb-30 md-mb-10">
                              <label htmlFor="">Academy</label>
                            </div>

                          </div>
                          <div className="col-lg-10">
                            <div className="dash-input-wrapper mb-30">
                              <input type="text" placeholder="Google Arts Collage & University" defaultValue={dynamicEducationArray != null && dynamicEducationArray != undefined ? dynamicEducationArray[0]? dynamicEducationArray![0].university : '':''} onChange={(e) => handleInputChange1(e, 0, "Education", "university")} />
                            </div>

                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-2">
                            <div className="dash-input-wrapper mb-30 md-mb-10">
                              <label htmlFor="">Specialization</label>
                            </div>
                          </div>
                          <div className="col-lg-10">
                            <div className="dash-input-wrapper mb-30">
                              <input type="text" placeholder="Google Arts Collage & University" defaultValue={dynamicEducationArray !== null && dynamicEducationArray !== undefined ? dynamicEducationArray[0]?dynamicEducationArray![0].specialization : '':''} onChange={(e) => handleInputChange1(e, 0, "Education", "specialization")} />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-2">
                            <div className="dash-input-wrapper mb-30 md-mb-10">
                              <label htmlFor="">Course Type</label>
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <div className="dash-input-wrapper mb-30">
                              <input type="text" placeholder="Google Arts Collage & University" defaultValue={dynamicEducationArray !== null && dynamicEducationArray !== undefined ? dynamicEducationArray![0]?dynamicEducationArray![0].courseType : '':''} onChange={(e) => handleInputChange1(e, 0, "Education", "courseType")} />
                            </div>
                          </div>
                          <div className="col-lg-1">
                            <div className="dash-input-wrapper mb-30 md-mb-10">
                              <label htmlFor="">Marks </label>
                            </div>
                          </div>
                          <div className="col-lg-2">
                            <div className="dash-input-wrapper mb-30">
                              <input type="number" className='no-spin' maxLength={2} placeholder="Marks" defaultValue={dynamicEducationArray !== null && dynamicEducationArray !== undefined ? (dynamicEducationArray![0]? dynamicEducationArray![0].perOrCgpa:'') : ''} onChange={(e) => handleInputChange1(e, 0, "Education", "perOrCgpa")} />
                            </div>
                          </div>
                          <div className="col-lg-3" style={{ paddingLeft: '0px' }}>
                            <div className="dash-input-wrapper mb-30">
                              <span>%</span>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-2">
                            <div className="dash-input-wrapper mb-30 md-mb-10">
                              <label htmlFor="">Year</label>
                            </div>
                          </div>
                          <div className="col-lg-10">
                            <div className="row">
                              <div className="col-sm-6">
                                <div className="dash-input-wrapper mb-30">
                                  <NiceSelect
                                    options={options}
                                    defaultCurrent={dynamicEducationArray ?
                                      getDefaultValue(new_from_date(dynamicEducationArray[0] ?dynamicEducationArray[0].educationFromDate:'')) :
                                      0}
                                    onChange={(item) => handleYear(item, 0, "educationFromDate")}
                                    name="Year" />
                                  {/* <>
      {dynamicEducationArray ? (
        <NiceSelect
        options={options}
        defaultCurrent={getDefaultValue(new_from_date(dynamicEducationArray![0].educationFromDate))}
        onChange={(item) => handleYear(item,0,"educationFromDate")}
        name="Year"
        />
      ):(
        <NiceSelect
        options={options}
        defaultCurrent={getDefaultValue(new_from_date(edu_from_date))}
        onChange={(item) => handleYear(item,0,"educationFromDate")}
        name="Year"
        />
      )
      } </> */}

                                  {/* <SelectYear value={from_formattedDate} value1=''/> */}
                                </div>
                              </div>
                              <div className="col-sm-6">
                                <div className="dash-input-wrapper mb-30">
                                  {dynamicEducationArray ? (
                                    <NiceSelect
                                      options={options}
                                      defaultCurrent={getDefaultValue(new_from_date(dynamicEducationArray![0]? dynamicEducationArray[0].educationToDate:''))}
                                      onChange={(item) => handleYear(item, 0, "educationToDate")}
                                      name="Year" />
                                  ) : (
                                    <NiceSelect
                                      options={options}
                                      defaultCurrent={0}
                                      onChange={(item) => handleYear(item, 0, "educationToDate")}
                                      name="Year" />
                                  )}

                                  {/* <SelectYear value={from_formattedDate} value1=''/> */}
                                </div>
                                {/* <SelectYear value={to_formattedDate} value1=''/> */}
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                  {educationDivList.map((div) => (
                    <div style={{ padding: '16px', border: '1px solid #ccc', marginTop: '16px' }}>
                      {div.content}
                      <div className="button-group d-inline-flex align-items-center mt-10 mb-10">
                        <a className="dash-btn-two tran3s me-3" onClick={() => handleEducationRemoveDiv(div.id)}>Remove</a>
                      </div>
                    </div>
                  ))}

                </div>

                <a onClick={addEducation} className="dash-btn-one mt-10"><i className="bi bi-plus"></i> Add more</a>

              </div><div className="button-group d-inline-flex align-items-center mt-30">
                  <a className="dash-btn-two tran3s me-3" onClick={() => handleSendEducationData()}>Save</a>
                  <a href="#" className="dash-cancel-btn tran3s">Cancel</a>
                </div></>
          }
        {category === 'experience' && <>
        <div className="bg-white card-box border-20 mt-40">
          <h4 className="dash-title-three">Add Work Experience</h4>
        

          <div className="accordion dash-accordion-one" id="accordionTwo">
            <div className="accordion-item">
              <div className="accordion-header" id="headingOneA">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOneA" aria-expanded="false" aria-controls="collapseOneA">
                  Add Experience
                </button>
              </div>
              <div id="collapseOneA" className="accordion-collapse collapse show" aria-labelledby="headingOneA" data-bs-parent="#accordionTwo">
                <div className="accordion-body">
                  <div className="row">
                    <div className="col-lg-2">
                      <div className="dash-input-wrapper mb-30 md-mb-10">
                        <label htmlFor="">Title</label>
                      </div>
                    </div>
                    <div className="col-lg-10">
                      <div className="dash-input-wrapper mb-30">
                        <input type="text" placeholder="Lead Product Designer " defaultValue={dynamicExperienceArray && dynamicExperienceArray?.length !== 0 && dynamicExperienceArray !== undefined ? dynamicExperienceArray![0].jobTitle : ''} onChange={(e) => handleInputChangeExperience(e,0,"Experience","jobTitle")}/>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-2">
                      <div className="dash-input-wrapper mb-30 md-mb-10">
                        <label htmlFor="">Company</label>
                      </div>
                    </div>
                    <div className="col-lg-10">
                      <div className="dash-input-wrapper mb-30">
                        <input type="text" placeholder="Amazon Inc" defaultValue={dynamicExperienceArray && dynamicExperienceArray?.length !== 0 && dynamicExperienceArray !== undefined ? dynamicExperienceArray![0].employerName : ''} onChange={(e) => handleInputChangeExperience(e,0,"Experience","employerName")}/>
                      </div>
                    </div>
                  </div>
                  <div className="row">
              <div className="col-lg-2">
                <div className="dash-input-wrapper mb-30 md-mb-10">
                  <label htmlFor="">Job Location*</label>
                </div>
              </div>
              <div className="col-lg-10">
                <div className="dash-input-wrapper mb-30">
                  <input type="text" placeholder="Mumbai" defaultValue={dynamicExperienceArray && dynamicExperienceArray?.length !== 0 && dynamicExperienceArray !== undefined ? dynamicExperienceArray![0].jobLocation : ''} onChange={(e) => handleInputChangeExperience(e,0,"Experience","jobLocation")}/>
                </div>
              </div>
            </div>
                  <div className="row">
                    <div className="col-lg-2">
                      <div className="dash-input-wrapper mb-30 md-mb-10">
                        <label htmlFor="">Year</label>
                      </div>
                    </div>
                    <div className="col-lg-10">
                      <div className="row">
                        <div className="col-sm-6">
                        <div className="dash-input-wrapper mb-30">
                        {dynamicExperienceArray ? (
                        <NiceSelect
                        options={options}
                        defaultCurrent={getDefaultValue(new_from_date(dynamicExperienceArray && dynamicExperienceArray?.length !== 0 && dynamicExperienceArray !== undefined ? dynamicExperienceArray![0].professionalFromDate : ''))}
                        onChange={(item) => handleYearExperience(item,0,"professionalFromDate")}
                        name="Year"
                        />
                      ) : (
                        <NiceSelect
                          options={options}
                          defaultCurrent={0}
                          onChange={(item) => handleYear(item,0,"professionalFromDate")}
                          name="Year"
                          />
                      )}
                        
                          {/* <SelectYear value='2018'value1=''/> */}
                        </div>
                        </div>
                        <div className="col-sm-6">
                        <div className="dash-input-wrapper mb-30">
                        {dynamicExperienceArray ? (
                        <NiceSelect
                        options={options}
                        className1={isChecked?true:false}
                        defaultCurrent={dynamicExperienceArray && dynamicExperienceArray !== null && dynamicExperienceArray !== undefined ? getDefaultValue(new_from_date(dynamicExperienceArray?.length !== 0 && dynamicExperienceArray !== undefined ? dynamicExperienceArray![0].professionalToDate : '')):""}
                        onChange={(item) => handleYearExperience(item,0,"professionalToDate")}
                        name="Year"
                        />
                      ) : (
                        <NiceSelect
                          options={options}
                          defaultCurrent={0}
                          onChange={(item) => handleYear(item,0,"professionalToDate")}
                          name="Year"
                          />
                      )}
                          
                          {/* <SelectYear value='2018'value1=''/> */}
                        </div>
                        </div>
                      </div>
                      
                    </div>
                    <div>
                    <label>
                      <input 
                        type="checkbox" 
                        className='mr-10 mb-20'
                        checked={isChecked} 
                        onChange={handleCheckboxChange} 
                      />
                      Currently Working
                    </label>
                  </div>
                  </div>
                
                </div>
              </div>
            </div>
          </div>
            {/* {Array.from({ length: experienceCount - 1 }).map((_, index) => (
          // <div key={index + 1}>
            
        ))} */}
        {expDivList.map((div) => (
          <div key={div.id} style={{ padding: '16px', border: '1px solid #ccc', marginTop: '16px' }}>
            {div.content}
            <div className="button-group d-inline-flex align-items-center mt-10 mb-10">
            <a  className="dash-btn-two tran3s me-3" onClick={() => handleRemoveDiv(div.id)}>Remove</a>
          </div>
          </div>
        ))}
            {/* <a  className="dash-btn-one"><i className="bi bi-plus"></i> Add more</a> */}
            <button onClick={addExperience} className="dash-btn-one mt-10"><i className="bi bi-plus"></i> Add more</button>
            </div>
            <div className="button-group d-inline-flex align-items-center mt-30">
            <a className="dash-btn-two tran3s me-3" onClick={() =>handleSendExperienceData()}>Save</a>
            <a href="#" className="dash-cancel-btn tran3s">Cancel</a>
          </div>
            
          
          </>}
        
        </div>
      


          
        </div>
      
    </div>
  );
};

export default DashboardProfileArea;