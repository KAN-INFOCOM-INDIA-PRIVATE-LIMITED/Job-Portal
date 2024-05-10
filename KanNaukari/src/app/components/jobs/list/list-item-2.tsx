"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IJobType, SavedJobType } from "@/types/job-data-type";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { add_to_wishlist } from "@/redux/features/wishlist";
import { baseUrl } from "@/utils/baseurl";
import { progressEnd, progressStart } from "@/utils/progress";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useRouter } from "next/navigation";
import briefcaseImages from '@/assets/images/candidates/briefcase.svg'
import rupee from '@/assets/images/assets/rupee.svg'
import location from '@/assets/images/assets/location.svg'
import '@/assets/css/style.css'
import java from '@/assets/images/assets/java.svg'
import job_img_1 from '@/assets/images/logo/media_22.png';
const ListItemTwo = ({ item }: { item: IJobType }) => {
  const [wishlist,setWishList] =useState<SavedJobType[] | null>(null);
  const [job_items, setCurrentItems] = useState<IJobType[] | null>([]);
  const regId=localStorage.getItem("reg_Id");
  const isActive = wishlist && wishlist!.some(p => p.joB_ID === item.joB_ID);
  const isAppliedJobActive = job_items && job_items!.some(p => p.joB_ID === item.joB_ID);
  const axios = require('axios');
  const token = localStorage.getItem("token");
  const router = useRouter();
  const [data, setData] = useState(null);
  const dispatch = useAppDispatch();
  let isLoginUser:boolean=false;
  if(token!=null || token==""){
    isLoginUser=true;
  }
  let pa="";
  if(item.job_salary_duration==="Yearly"){
    pa="A";
  }else{
    pa="M";
  }
  // handle add wishlist
  const handleAddWishlist = (item: IJobType) => {
    dispatch(add_to_wishlist(item));
  };

  const onSubmit = () => {
    progressStart();
    addData();

    
  };

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

  useEffect(() => {
    // Incorrect: Causing an infinite loop
    // if(savedJobArray?.length===0){

    const getData= ()=>{
      let data = JSON.stringify({
        "reg_Id": parseInt(localStorage.getItem("reg_Id")!)
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
          
          setWishList(removeDuplicates(response.data.obj));
          setData(response);
        }else if(response.message=="Unauthorized"){
        localStorage.clear();
        router.push("/");
        }
        // console.log(JSON.stringify(response.data));
        })
        .catch((error:any) => {
        // console.log(error.message);
        notifyError(error.message);
        localStorage.clear();
        router.push("/");
        });        
    };
    const getAppliedJob=()=>{
      let data = JSON.stringify({
        "Reg_Id":regId
      });
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: baseUrl+'/GetAppliedJob',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': 'Bearer '+token
        },
        data : data
      };
      
      axios.request(config)
      .then((response:any) => {
        if(response.status==200){
            setCurrentItems(response.data.obj)
          // response.data.obj.job_Search_List.map((l:any)=>{
          //     const exp=l.job_experience?.split('-').map((fruit:any) => fruit.trim());
          //     const exper=exp![1].split(" ");
          //     setMinExperience((prevArray) => [...prevArray, parseInt(exp![0])]);
          //     setMaxExperience((prevArray) => [...prevArray, parseInt(exper[0])]);
          //   });
            // setShowShiveringProgressDialog(false);
          
        }else if(response.message=="Unauthorized"){
            notifyError(response.message);
            // localStorage.clear();
            // window.location.reload();
            
            // setShowShiveringProgressDialog(false);
        }
        // console.log(JSON.stringify(response.data));
      })
      .catch((error:any) => {
        // console.log(error);
        // localStorage.clear();
        notifyError(error.message);
        // router.push("/");
  
        
        // setShowShiveringProgressDialog(false);
      });
      
    }
    if (!data) {
      getData();
      getAppliedJob();
    }
     
   
    

  // }
  }, []);

  

  const addData=()=>{
  
    let data = JSON.stringify({
      "joB_ID": item.joB_ID,
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
      // console.log(error);
      notifyError(error.message);
      progressEnd();
    });
    
  }
  
  const saveJob=()=>{
    progressStart();
    let data = JSON.stringify({
      "joB_ID": item.joB_ID,
      "reg_Id": localStorage.getItem("reg_Id"),
      // "Saved_ON": "2024-02-09T10:05:18.455Z"
      "Saved_ON": new Date().toISOString().toString()
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: baseUrl+'/SaveJob',
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': 'Bearer '+token
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
      // console.log(error);
      notifyError(error);
      progressEnd();
    });
  }

  const dayTime=(postTimestamp:any)=>{
    const postDate:any = new Date(postTimestamp);
  
      // Get the current date
      const currentDate:any = new Date();
  
      // Calculate the difference in milliseconds
      const timeDifference = currentDate - postDate;
  
      // Calculate the difference in days
      const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  
      // console.log(daysDifference);
  
      return daysDifference;
  
  }

  const skillArray = item.job_skills?.split(',');


  return (
    <div className="job-list-one style-two position-relative bottom-border mb-20">
      <div className="row justify-content-between align-items-center">
        <div className="col-md-4" >
          <div className="job-title d-flex align-items-center">
            <div>
            <Link href={`/job-details-v1/${item.joB_ID}`} className="logo">
              <Image src={java} alt="logo" className="lazy-img m-auto" width={60} height={40}/>
           
            </Link>
            
            </div>
           
            <div className="split-box1">
              <h2>
              <Link
                href={`/job-details-v1/${item.joB_ID}`}
                className="job-duration fw-500"
              >
                {item.job_title}
                
              </Link>
              </h2>
              <p className="p-fs">{skillArray?.join(",")}</p>
              <p className="p-fs">{dayTime(item.job_from_date)} days ago</p>
              
            </div>
            
          </div>
        </div>
        <div className="col-md-3 col-sm-6">
          <div className="job-location">
          
            <h2 style={{lineHeight:"0.8",marginBottom:"0px"}}>
            <Link href={`/job-details-v1/${item.joB_ID}`}><Image src={location} alt="locationlogo" style={{marginRight:'5px'}}   className="lazy-img Img" width={14} height={14}/> {item.job_city}</Link></h2>
          </div>
          <div className="job-location">
            <h2 style={{lineHeight:"0.8",marginBottom:"0px"}}>
            <Link href={`/job-details-v1/${item.joB_ID}`}><Image src={rupee} alt="rupeelogo" style={{marginRight:'5px'}}   className="lazy-img Img" width={14} height={14}/>{item.job_salary} /{" "}
            {item.job_salary_duration}</Link></h2> 
          </div>
          <div className="job-location">
            <h2 style={{lineHeight:"0.8",marginBottom:"0px"}}>
            <Link href={`/job-details-v1/${item.joB_ID}`}><Image src={briefcaseImages} alt="briefcaseImageslogo" style={{marginRight:'5px'}}   className="lazy-img Img" width={14} height={14}/>{item.job_experience}</Link></h2> 
          </div>
        </div>
        <div className="col-md-2 col-sm-6">
        <div className="job-location">
            <h2 style={{lineHeight:"0.8",marginBottom:"0px"}}>
            <Link href={`/job-details-v1/${item.joB_ID}`} style={{lineHeight:'normal'}}>{item.job_employer_name}</Link></h2> 
          </div>
        </div>
        {(isLoginUser) ? 
         <div className="col-md-3 col-sm-6">
         <div className="btn-group d-flex align-items-center justify-content-sm-end xs-mt-20">
           <div className="col-sm-5">
           <a
             onClick={() => saveJob()}
             className={`save-btn text-center rounded-circle tran3s me-3 cursor-pointer ${isActive?'display-saved-job':''}`}
             title={`${isActive?'Remove Job':'Save Job'}`}
           >
             <i className="bi bi-bookmark-dash c-black"></i>
           </a>
           </div>
           <div>
           <Link
           href={`/job-details-v1/${item.joB_ID}`}
            className={`apply-btn text-center tran3s ${isAppliedJobActive?'display-saved-job':''}`}
           >
             Apply
           </Link>
           </div>
         </div>
       </div>
        :" "
}
      </div>
    </div>
  );
};

export default ListItemTwo;

