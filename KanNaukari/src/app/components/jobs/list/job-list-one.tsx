"use client"
import React, { useEffect,useState } from "react";
import job_data from "@/data/job-data";
import ListItem from "./list-item";
import Link from "next/link";
import { IJobType } from "@/types/job-data-type";
import { baseUrl } from "@/utils/baseurl";
import { progressEnd, progressStart } from "@/utils/progress";

export function JobListItems({style_2=false}:{style_2?:boolean}) {
  const [showList, setShowList] = useState<any[]>([]);
  const jobList: any[] = [];
  
  
useEffect(() => {
  const fetxh=async () => {
    await fetch(baseUrl+"/JobSearch", {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    },
      body: JSON.stringify({ "isRecentJob": false})
  }).then(r=>
    r.json()
    ).then(res=>{
      
    if(res){
      setShowList(res.obj.job_Search_List)
    }
  });
};
  fetxh();
}, []);
  return (
    <>
      {showList.slice(0, 5).map((item) => (
        <ListItem key={item.joB_ID} item={item} style_2={style_2} />
      ))}
    </>
  )
}

const JobListOne = () => {
  return (
      <section className="job-listing-one mt-50 xl-mt-150 lg-mt-100" style={{backgroundColor:'#F5F5F5'}}>
        <div className="container">
          <div className="row justify-content-between align-items-center mb-20 pt-20">
            {/* <div className="col-lg-6"> */}
              {/* <div className="title-one  text-center"> */}
              <div className="title-one align-text-center">
                <h2 className="text-dark wow fadeInUp" data-wow-delay="0.3s">New job listing</h2>
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

          <div className="job-listing-wrapper  mt-0 lg-mt-40 wow fadeInUp">
            <JobListItems />
          </div>

          {/* <div className="text-center mt-40 d-lg-none">
            <Link href="/job-list-v1" className="btn-six">
              Explore all jobs
            </Link>
          </div> */}

          <div className="text-center mt-30 lg-mt-30 wow fadeInUp mt-margin-bottom pb-20">
            {/* <div className="btn-eight fw-500">
              Do you want to post a job for your company?{" "}
              <span>We can help.</span> <Link href="/dashboard/employ-dashboard/submit-job">Click here</Link>
            </div> */}
          </div>
        </div>
      </section>
  );
};

export default JobListOne;
