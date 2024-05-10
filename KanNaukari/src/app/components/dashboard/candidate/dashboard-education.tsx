"use client"
import React, { useEffect,useState } from "react";
import job_data from "@/data/job-data";
import Link from "next/link";
import { EducationIJobType, IJobType } from "@/types/job-data-type";
import { baseUrl } from "@/utils/baseurl";
import { progressEnd, progressStart } from "@/utils/progress";
import NiceSelect from "@/ui/nice-select";
import { notifyError, notifySuccess } from "@/utils/toast";
import axios from '../../../../utils/axiosInterceptor';
import { useRouter } from "next/navigation";



interface Div {
    id: number;
    content: React.ReactNode;
  }

  interface Option {
    label: string;
    value: string;
  }
const DashboardEducation = () => {
    const [educationItems, setEducationItems] = useState<EducationIJobType[] | null>([]);
    const [educationCount, setEducationCount] = useState(0);
    const [educationDivList, setEducationDivList] = useState<Div[]>([]);
    const [previousEducationArray, setPreviousEducationArray] = useState<EducationIJobType[]>([]);
    const [dynamicEducationArray, setDynamicEducationArray] = useState<EducationIJobType[] | null>([]);
    const regId=localStorage.getItem("reg_Id");
    const currentYear = new Date().getFullYear();
    const router=useRouter();
    const options: Option[] = Array.from({ length: 50 }, (_, index) => ({
        label: (currentYear - index).toString(),
        value: (currentYear - index).toString()
      }));
      const fdate=(tdate:any)=>{
        return new Date(tdate);
       }
       const convertDate=(cdate:any)=>{
         return cdate.toLocaleDateString('en-IN', {
           day: 'numeric',
           month: 'numeric',
           year: 'numeric',
           });
       };
       const new_from_date=(newDate:any)=>{
        const from_date=new Date(newDate);
        const from_formattedDate = from_date.toLocaleDateString('en-IN', {
          year: 'numeric',
          });
          return from_formattedDate;
      };

      useEffect(() => {
        if(sessionStorage.candedateDetails!=undefined && sessionStorage.candedateDetails!=null){
            const candidateDetails=JSON.parse(sessionStorage.candedateDetails)
            const { profilePictureUrl, candidateName } = candidateDetails;
            setEducationItems(candidateDetails.educationDetails);
            setEducationCount(candidateDetails.educationDetails.length);
            setPreviousEducationArray(candidateDetails.educationDetails);
            setDynamicEducationArray(candidateDetails.educationDetails);
          }
       
      }, []);
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
                  <input type="text" placeholder="Product Designer (Google)" onChange={(e) => handleInputChange1(e,i,"Education","courseTitle")}/>
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
                  <input type="text" placeholder="Google Arts Collage & University"  onChange={(e) => handleInputChange1(e,i,"Education","specialization")}/>
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
                  <p>%</p>
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
                  <p>%</p>
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
  const handleSendEducationData=()=>{
    addEducationData(previousEducationArray);
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
        window.location.reload();
        
      }else if(response.message=="Unauthorized"){
          localStorage.clear();
          router.push("/");
          // setShowShiveringProgressDialog(false);
      }
      // console.log(JSON.stringify(response.data));
    })
    .catch((error:any) => {
      if(error.message==="Request failed with status code 401"){
        localStorage.clear();
        notifyError("Authentication Failed");
          router.push("/");
      }else{
        notifyError(error.message);
      }
      // setShowShiveringProgressDialog(false);
    });
    
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
       
        
      }else if(response.message=="Unauthorized"){
          localStorage.clear();
          // router.push("/");
          // setShowShiveringProgressDialog(false);
      }
      // console.log(JSON.stringify(response.data));
    })
    .catch((error:any) => {
      
      if(error.message==="Request failed with status code 401"){
        localStorage.clear();
        notifyError("Authentication Failed");
          router.push("/");
      }else{
        notifyError(error.message);
      }
      // setShowShiveringProgressDialog(false);
    });
  }
    
  }

  const addEducation = () => {
    handleAddEducationDiv();
    // setEducationCount(educationCount + 1);
  };
  const handleEducationRemoveDiv = (divId:any) => {
    // Remove the div with the specified id
    removeEducationData(divId);
  };
  useEffect(() => {
    // Incorrect: Causing an infinite loop
    if(educationCount>1){
    handleAddEducationDivNew();
  }
 
  setDynamicEducationArray(educationItems)
  }, [educationItems]);
  return (
      <section className="job-listing-one mt-50 xl-mt-150 lg-mt-100" style={{backgroundColor:'#F5F5F5'}}>
       <div className="bg-white card-box border-20 mt-40">
        <h4 className="dash-title-three">Education</h4>

        <div className="accordion dash-accordion-one" id="accordionOne">
          <div className="accordion-item">
            <div className="accordion-header" id="headingOne">
              <div className="education-accordian" >
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
                      <input id="0" type="text" placeholder="Product Designer (Google)" name='title' defaultValue={dynamicEducationArray?.length!==0 && dynamicEducationArray !== null && dynamicEducationArray !== undefined ? dynamicEducationArray![0].courseTitle : ''} onChange={(e) => handleInputChange1(e,0,"Education","courseTitle")} aria-rowindex={0}/>
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
                      <input type="text" placeholder="Google Arts Collage & University" defaultValue={dynamicEducationArray?.length!==0 && dynamicEducationArray !== null && dynamicEducationArray !== undefined ? dynamicEducationArray![0].university : ''} onChange={(e) => handleInputChange1(e,0,"Education","university")} />
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
              <input type="text" placeholder="Google Arts Collage & University" defaultValue={dynamicEducationArray?.length!==0 && dynamicEducationArray !== null && dynamicEducationArray !== undefined ? dynamicEducationArray![0].specialization : ''} onChange={(e) => handleInputChange1(e,0,"Education","specialization")}/>
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
              <input type="text" placeholder="Google Arts Collage & University" defaultValue={dynamicEducationArray?.length!==0 && dynamicEducationArray !== null && dynamicEducationArray !== undefined ? dynamicEducationArray![0].courseType : ''} onChange={(e) => handleInputChange1(e,0,"Education","courseType")}/>
            </div>
          </div>
          <div className="col-lg-1">
            <div className="dash-input-wrapper mb-30 md-mb-10">
              <label htmlFor="">Marks </label>
            </div>
          </div>
          <div className="col-lg-2">
            <div className="dash-input-wrapper mb-30">
              <input type="number" className='no-spin' maxLength={2} placeholder="Marks" defaultValue={dynamicEducationArray?.length!==0 && dynamicEducationArray !== null && dynamicEducationArray !== undefined ? (dynamicEducationArray![0].perOrCgpa ): ''} onChange={(e) => handleInputChange1(e,0,"Education","perOrCgpa")} />
            </div>
          </div>
          <div className="col-lg-3" style={{paddingLeft:'0px'}}>
            <div className="dash-input-wrapper mb-30">
              <p>%</p>
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
                          defaultCurrent={dynamicEducationArray?.length!==0 && dynamicEducationArray ? 
                            getDefaultValue(new_from_date(dynamicEducationArray[0].educationFromDate)) : 
                            0}
                          onChange={(item) => handleYear(item, 0, "educationFromDate")}
                          name="Year"
                        />
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
                        {dynamicEducationArray?.length!==0 && dynamicEducationArray ? (
                      <NiceSelect
                        options={options}
                        defaultCurrent={getDefaultValue(new_from_date(dynamicEducationArray[0].educationToDate))}
                        onChange={(item) => handleYear(item, 0, "educationToDate")}
                        name="Year"
                      />
                    ) : (
                      <NiceSelect
                        options={options}
                        defaultCurrent={0}
                        onChange={(item) => handleYear(item,0,"educationToDate")}
                        name="Year"
                        />
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
        <div  style={{ padding: '16px', border: '1px solid #ccc', marginTop: '16px' }}>
          {div.content}
          <div className="button-group d-inline-flex align-items-center mt-10 mb-10">
          <a  className="dash-btn-two tran3s me-3" onClick={() => handleEducationRemoveDiv(div.id)}>Remove</a>
        </div>
        </div>
      ))}
        
        </div>
       
        <a onClick={addEducation} className="dash-btn-one mt-10"><i className="bi bi-plus"></i> Add more</a>
        
      </div>
      <div className="button-group d-inline-flex align-items-center mt-30">
        <a className="dash-btn-two tran3s me-3 mb-20" style={{marginLeft:'20%'}} onClick={() =>handleSendEducationData()}>Save</a>
        {/* <a href="#" className="dash-cancel-btn tran3s">Cancel</a> */}
      </div>
      </section>
  );
};

export default DashboardEducation;

