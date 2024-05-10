import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DashboardHeader from "./dashboard-header";
import ShortSelect from "../../common/short-select";
import job_data from "@/data/job-data";
import ActionDropdown from "./action-dropdown";
import HeaderFour from "@/layouts/headers/header-4";
import { baseUrl } from "@/utils/baseurl";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useRouter } from "next/navigation";
import { SavedJobType } from "@/types/job-data-type";
import { progressEnd } from "@/utils/progress";

// props type 
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>
}

const SavedJobArea = ({setIsOpenSidebar}:IProps) => {
  const job_items = job_data.slice(0, 4);
  const [savedJobArray, setSavedJobArray] = useState<SavedJobType[] | null>(null);
  const [loading, setLoading] = useState(true);
  const axios = require('axios');
  const router=useRouter();
  const regId=localStorage.getItem("reg_Id");
  const token = localStorage.getItem("token");
  const [isOpen, setIsOpen] = useState(false);
    const new_from_date=(newDate:any)=>{
      const from_date=new Date(newDate);
      const from_formattedDate = from_date.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        });
        return from_formattedDate;
    }

    const removeDuplicates = (list: SavedJobType[]): SavedJobType[] => {
      // Use Set to store unique jobIDs
      const uniqueJobIDs = new Set<number>();
      // Filter the list to keep only the items with unique jobIDs
      const uniqueList = list.filter((item) => {
          if (uniqueJobIDs.has(item.joB_ID)) {
              return false; // Duplicate jobID, discard this item
          } else {
              uniqueJobIDs.add(item.joB_ID);
              return true; // Unique jobID, keep this item
          }
      });
      return uniqueList;
  };
    

    const addData=(i:any)=>{
  
      let data = JSON.stringify({
        "joB_ID": i,
        "reg_Id": localStorage.getItem("reg_Id"),
        // "applied_ON": "2024-02-09T10:05:18.455Z"
        "applied_ON": new Date().toISOString().toString()
      });
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: baseUrl+'/ApplyJob',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': 'Bearer '+token
        },
        data : data
      };
      
      axios.request(config)
      .then((response:any) => {
        if(response.status==200){
          notifySuccess(response.message);
          // revokeSaveJob(i)
        }else if(response.message=="Unauthorized"){
          progressEnd();
            localStorage.clear();
            router.push("/");
        }
        // console.log(JSON.stringify(response.data));
      })
      .catch((error:any) => {
        // console.log(error);
        notifyError(error.message);
      });
      
    }
    const revokeSaveJob=(i:any)=>{
  
      let data = JSON.stringify({
        "joB_ID": i,
        "reg_Id": localStorage.getItem("reg_Id"),
        // "applied_ON": "2024-02-09T10:05:18.455Z"
        "applied_ON": new Date().toISOString().toString()
      });
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: baseUrl+'/RevokedSaveJob',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': 'Bearer '+token
        },
        data : data
      };
      
      axios.request(config)
      .then((response:any) => {
        if(response.status==200){
          window.location.reload();
        }else if(response.message=="Unauthorized"){
          progressEnd();
            localStorage.clear();
            router.push("/");
        }
        // console.log(JSON.stringify(response.data));
      })
      .catch((error:any) => {
        // console.log(error);
        notifyError(error.message);
      });
      
    }
    
 
  useEffect(() => {
    // Incorrect: Causing an infinite loop
    // if(savedJobArray?.length===0){
      const getData= ()=>{
        let data = JSON.stringify({
          "reg_Id": parseInt(regId!)
          });
          let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: baseUrl+'/GetSavedJobs',
          headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer Token '+token
          },
          data : data
          };
          
          axios.request(config)
          .then((response:any) => {
          if(response.status==200){
            setSavedJobArray(removeDuplicates(response.data.obj));
          setLoading(false);
          }else if(response.message=="Unauthorized"){
          setLoading(false);
          localStorage.clear();
          router.push("/");
          }
          // console.log(JSON.stringify(response.data));
          })
          .catch((error:any) => {
          // console.log(error.message);
          notifyError(error.message);
          setLoading(false);
          localStorage.clear();
          router.push("/");
          });        
      };

    getData();

  // }
  }, []);
  const handleToggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div className="dashboard-body">
      <div className="position-relative">
      <HeaderFour value='Profile'/>
      <section className="job-listing-one mt-50 xl-mt-150 lg-mt-100" style={{backgroundColor:'#fff'}}>
        <div className="container pb-20">
          <div className="row justify-content-between align-items-center mb-20 pt-20">
            {/* <div className="col-lg-6"> */}
              <div className="title-one  text-center">
                <h2 className="text-dark wow fadeInUp" data-wow-delay="0.3s">Saved Job</h2>
              </div>
            {/* <div className="col-lg-5">
              <div className="d-flex justify-content-lg-end">
                <Link
                  href="/job-list-v1"
                  className="btn-six d-none d-lg-inline-block"
                >
                  Explore all jobs
                </Link>
              </div>
            </div> */}
          </div>

          <div className="job-listing-wrapper mt-0 lg-mt-40 wow fadeInUp">
            <>
            {savedJobArray && savedJobArray!.map((j) => (
              
        <div className={`job-list-one mt-10 position-relative bottom-border`}>
        <div className={`row justify-content-between align-items-center `}>
          <div className="col-xxl-3 col-lg-4">
            <div className="job-title d-flex align-items-center">
              {/* <Link href={`/job-details-v1/${joB_ID}`} className="logo">
                <Image src={logo} alt="logo" className="lazy-img m-auto" />
              </Link> */}
              <Link href={`/job-details-v1/${j.joB_ID}`} className="title fw-500 tran3s">
                {j.job_title}
              </Link>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 ms-auto">
            <Link href={`/job-details-v1/${j.joB_ID}`}
              className={`job-duration fw-500 `}
            >
              {/* {j.job_skills} */}
              {j.job_title}
            </Link>
            <div className="job-date">
            {/* {j.job_salary} /{j.job_salary_duration}<br></br>  <Link href={`/job-details-v1/${j.joB_ID}`}>{j.job_experience}</Link> */}
            {j.job_salary} 
            </div>
          </div>
          <div className="col-xxl-2 col-lg-3 col-md-4 col-sm-6 ms-auto xs-mt-10">
            <div className="job-location">
              {/* <Link href={`/job-details-v1/${j.joB_ID}`}>{j.job_city}</Link> */}
              <Link href={`/job-details-v1/${j.joB_ID}`}>{j.job_type}</Link>
            </div>
            <div className="job-category">
            <Link href={`/job-details-v1/${j.joB_ID}`}>{j.job_employer_name}</Link>
              {/* {category.map((c, i) => (
                <a key={i} href="#">
                  {c}
                  {i < category.length - 1 && ", "}
                </a>
              ))} */}
            </div>
          </div>
          <div className="col-lg-2 col-md-4">
            <div className="btn-group d-flex align-items-center justify-content-md-end sm-mt-20">
              
              <button
              onClick={() => addData(j.joB_ID)}
              className="apply-btn text-center tran3s"
            >
              APPLY
            </button>
              {/* <Link href={`/job-details-v1/${joB_ID}`}
                className="apply-btn text-center tran3s"
              >
                APPLY
              </Link> */}
            </div>
          </div>
          
        </div>
      </div>
      ))}
    </>
          </div>

         

        </div>
      </section>

       

       
      </div>
    </div>
  );
};

export default SavedJobArea;