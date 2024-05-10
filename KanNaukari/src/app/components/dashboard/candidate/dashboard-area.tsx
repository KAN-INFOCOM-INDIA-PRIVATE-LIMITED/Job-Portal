"use client";
import React, { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import job_data from "@/data/job-data";
import icon_1 from "@/assets/dashboard/images/icon/icon_12.svg";
import icon_2 from "@/assets/dashboard/images/icon/icon_13.svg";
import icon_3 from "@/assets/dashboard/images/icon/icon_14.svg";
import icon_4 from "@/assets/dashboard/images/icon/icon_15.svg";
import main_graph from "@/assets/dashboard/images/main-graph.png";
import java from "@/assets/images/assets/java.svg"
import { baseUrl } from "@/utils/baseurl";
import axios from '../../../../utils/axiosInterceptor';
import { useRouter } from "next/navigation";
import { notifyError, notifySuccess } from "@/utils/toast";
import { IJobType } from "@/types/job-data-type";
import Link from "next/link";
export function CardItem({
  img,
  value,
  title,
}: {
  img: StaticImageData;
  value: string;
  title: string;
}) {
  return (
    <div className="col-lg-3 col-6">
      <div className="dash-card-one bg-white border-30 position-relative mb-15">
        <div className="d-sm-flex align-items-center justify-content-between">
          <div className="icon rounded-circle d-flex align-items-center justify-content-center order-sm-1">
            <Image src={img} alt="icon" className="lazy-img" />
          </div>
          <div className="order-sm-0">
            <div className="value fw-500">{value}</div>
            <span>{title}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>
}
const DashboardArea = ({setIsOpenSidebar}:IProps) => {
  const [ipAddress, setIpAddress] = useState(null);
  const [job_items, setCurrentItems] = useState<IJobType[] | null>([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(
    Array(job_items!.length).fill(false)
  );
  const router=useRouter();
  const toggleDropdown = (index: number) => {
    setIsDropdownVisible((prev) =>
      prev.map((item, idx) => (idx === index ? !item : false))
    );
  };
  useEffect(() => {
    if (job_items !== null) {
      setIsDropdownVisible(Array(job_items.length).fill(false));
    }
  }, [job_items]);

  useEffect(() => {
    const getAppliedJob=()=>{
      let data = JSON.stringify({
        "Reg_Id":localStorage.getItem("reg_Id")
      });     
      const token = localStorage.getItem("token"); 
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: baseUrl+'/GetAppliedJob',
        //body: { Reg_Id : localStorage.getItem("reg_Id") },
        headers: { 
          'Authorization': 'Bearer '+token,
          'Content-Type': 'application/json', 
        },
        data : data
      };
      
      axios.request(config)
      .then((response:any) => {
        if(response.status==200){
            setCurrentItems(response.data.obj)
        }else if(response.message=="Unauthorized"){
            localStorage.clear();
            router.push("/");
        }
      })
      .catch((error:any) => {
        notifyError(error.message);
      });
    }
  getAppliedJob();
  }, []);
 const revokeAppliedJob=(job_id:any)=>{
    let data = JSON.stringify({
      "reg_Id":localStorage.getItem("reg_Id"),
      "joB_ID":job_id,
      "applied_ON":new Date().toISOString().toString()
    });    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: baseUrl+'/RevokedJobApplication',
      headers: { 
        'Content-Type': 'application/json', 
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
      }
    })
    .catch((error:any) => {
      notifyError(error.message);
    });
  }
  return (
    <div className="dashboard-body">
      <div className="position-relative">
        {/* header start */}
        {/* <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} /> */}
        {/* header end */}
        <h2 className="main-title">Dashboard</h2>
        <div className="row">
          <CardItem img={icon_1} title="Total Visitor" value="1.7k+" />
          <CardItem img={icon_2} title="Shortlisted" value="03" />
          <CardItem img={icon_3} title="Views" value="2.1k" />
          <CardItem img={icon_4} title="Applied Job" value="07" />
        </div>
        <div className="row d-flex pt-50 lg-pt-10">
          <div className="col-xl-7 col-lg-6 d-flex flex-column">
            <div className="user-activity-chart bg-white border-20 mt-30 h-100">
              <h4 className="dash-title-two">Profile Views</h4>
              <div className="ps-5 pe-5 mt-50">
                <Image
                  src={main_graph}
                  alt="main-graph"
                  className="lazy-img m-auto"
                />
              </div>
            </div>
          </div>
          <div className="col-xl-5 col-lg-6 d-flex">
            <div className="recent-job-tab bg-white border-20 mt-30 w-100">
              <h4 className="dash-title-two">Recent Applied Job</h4>
              <div className="wrapper">
                {job_items?job_items.map((j,index) => (
                  <div
                    key={j.joB_ID}
                    className="row job-item-list d-flex align-items-center"
                  >
                    <div className="col-3">
                      <Image
                        src={java}
                        alt="logo"
                        width={40}
                        height={40}
                        className="lazy-img logo"
                      />
                    </div>
                    <div className="col-7 job-title">
                      <h6 >
                        <a style={{textDecoration:'none',color:'#000'}} >
                      {j.job_title}
                      </a>
                      </h6>
                      <div className="meta">
                        <span>{j.job_city}</span>
                      </div>
                    </div>
                    <div className="col-2 job-action">
                      <button
                        className="action-btn dropdown-toggle"
                        type="button"
                        onClick={() => toggleDropdown(index)}
                        data-bs-toggle="dropdown"
                        aria-expanded={isDropdownVisible[index] ? "true" : "false"}
                      >
                        <span></span>
                      </button>
                      <ul className={`dropdown-menu ${isDropdownVisible[index] ? 'show' : ''}`}>
                        <li>
                          <a className="dropdown-item" href={`/job-details-v1/${j.joB_ID}`}>
                            View Job
                          </a>
                        </li>
                        {/* <li>
                          <a className="dropdown-item" href="#">
                            Archive
                          </a>
                        </li> */}
                        <li>
                          <a className="dropdown-item" onClick={()=>revokeAppliedJob(j.joB_ID)}>
                            Delete
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                )):""}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DashboardArea;
