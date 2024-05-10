"use client"
import React, { useEffect, useState } from "react";
import Wrapper from "@/layouts/wrapper";
import JobDetailsV1Area from "@/app/components/job-details/job-details-v1-area";
import JobPortalIntro from "@/app/components/job-portal-intro/job-portal-intro";
import JobDetailsBreadcrumb from "@/app/components/jobs/breadcrumb/job-details-breadcrumb";
import RelatedJobs from "@/app/components/jobs/related-jobs";
import FooterOne from "@/layouts/footers/footer-one";
import job_data from "@/data/job-data";
import { baseUrl } from "@/utils/baseurl";
import { IJobType } from "@/types/job-data-type";
import { useRouter } from "next/navigation";
import { notifyError } from "@/utils/toast";
import HeaderFour from "@/layouts/headers/header-4";
import Loading from "@/app/loading";
import FooterTwo from "@/layouts/footers/footer-2";


const JobDetailsDynamicPage = ({ params }: { params: { id: string } }) => {
  const [currentItems, setCurrentItems] = useState<IJobType[] | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const axios = require('axios');
  let job:any=[];
  const getData=()=>{  
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: baseUrl+`/GetJobDetailsById?jobId=`+params.id,
      headers: { 
        'Content-Type': 'application/json', 
        // 'Authorization': 'Bearer '+token
      },
    };
    
    axios.request(config)
    .then((response:any) => {
      if(response.status==200){
        setCurrentItems(response.data );
        setLoading(false);
        // setAll_Jobs(response.data.obj.job_Search_List);
      
        
      }else if(response.message=="Unauthorized"){
          localStorage.clear();
          router.push("/");
          setLoading(false);
      }
      // console.log(JSON.stringify(response.data));
    })
    .catch((error:any) => {
      // console.log(error);
      notifyError(error.message);
      setLoading(false);
    });
    
  }
  useEffect(() => {
    // Incorrect: Causing an infinite loop
    getData();
  }, []);
  
  if(currentItems!=null){
   job = currentItems!.find((j) => Number(j.joB_ID) === Number(params.id));
}
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* header start */}
        <HeaderFour value="Profile"/>
        {/* header end */}

        {/* job details breadcrumb start */}
        {/* <JobDetailsBreadcrumb /> */}
        {/* job details breadcrumb end */}

        {/* job details area start */}
        {job && <JobDetailsV1Area job={job} loader={loading}/>}
        {/* job details area end */}

        {/* related job start */}
        {/* {job && <RelatedJobs category={[".net","Java"]} />} */}
        {/* related job end */}

        {/* job portal intro start */}
        <JobPortalIntro />
        {/* job portal intro end */}

        {/* footer start */}
        <FooterTwo />
        {/* footer end */}
      </div>
    </Wrapper>
  );
};

export default JobDetailsDynamicPage;
