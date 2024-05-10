"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { usePathname, useRouter } from "next/navigation";
import logo from "@/assets/dashboard/images/logo_01.png";
import avatar from "@/assets/dashboard/images/avatar_01.jpg";
import userProfile from '@/assets/images/assets/userProfile.svg'
import profile_icon_1 from "@/assets/dashboard/images/icon/icon_23.svg";
import profile_icon_2 from "@/assets/dashboard/images/icon/icon_24.svg";
import profile_icon_3 from "@/assets/dashboard/images/icon/icon_25.svg";
import logout from "@/assets/dashboard/images/icon/icon_9.svg";
import nav_1 from "@/assets/dashboard/images/icon/icon_1.svg";
import nav_1_active from "@/assets/dashboard/images/icon/icon_1_active.svg";
import nav_4 from "@/assets/dashboard/images/icon/icon_4.svg";
import nav_4_active from "@/assets/dashboard/images/icon/icon_4_active.svg";
import nav_5 from "@/assets/dashboard/images/icon/icon_5.svg";
import nav_5_active from "@/assets/dashboard/images/icon/icon_5_active.svg";
import nav_6 from "@/assets/dashboard/images/icon/icon_6.svg";
import nav_6_active from "@/assets/dashboard/images/icon/icon_6_active.svg";
import nav_7 from "@/assets/dashboard/images/icon/icon_7.svg";
import nav_7_active from "@/assets/dashboard/images/icon/icon_7_active.svg";
import nav_8 from "@/assets/dashboard/images/icon/icon_8.svg";
import DeleteModal from "../../common/popup/delete-modal";
import ExpandableList from "./expandable-list";

// nav data
const nav_data: {
  id: number;
  icon: StaticImageData;
  icon_active: StaticImageData;
  link: string;
  title: string;
}[] = [
  {
    id: 1,
    icon: nav_1,
    icon_active: nav_1_active,
    link: "/dashboard/candidate-dashboard",
    title: "Dashboard",
  },
];
const nav_data1: {
  id: number;
  icon: StaticImageData;
  icon_active: StaticImageData;
  link: string;
  title: string;
}[] = [
 
  // {
  //   id: 3,
  //   icon: nav_3,
  //   icon_active: nav_3_active,
  //   link: "/dashboard/candidate-dashboard/resume",
  //   title: "Resume",
  // },
  {
    id: 1,
    icon: nav_4,
    icon_active: nav_4_active,
    link: "/dashboard/candidate-dashboard/messages",
    title: "Messages",
  },
  {
    id: 2,
    icon: nav_5,
    icon_active: nav_5_active,
    link: "/dashboard/candidate-dashboard/job-alert",
    title: "Job Alert",
  },
  {
    id: 3,
    icon: nav_6,
    icon_active: nav_6_active,
    link: "/dashboard/candidate-dashboard/saved-job",
    title: "Saved Job",
  },
  {
    id: 4,
    icon: nav_7,
    icon_active: nav_7_active,
    link: "/dashboard/candidate-dashboard/setting",
    title: "Account Settings",
  },
];
// props type 
type IProps = {
  isOpenSidebar: boolean,
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>
}

const CandidateAside = ({isOpenSidebar,setIsOpenSidebar}:IProps) => {
  const pathname = usePathname();
  const title1=localStorage.getItem("userfname")?.toString();
  const [isProfileActive, setIsProfileActive] = useState(false);
  const profileActive=pathname.includes("/dashboard/candidate-dashboard/profile");
  const [uploadedImage, setUploadedImage] = useState("");
  const axios = require('axios');
  const [isCandidateName,setIsCandidateName] = useState<string>("");
  const router=useRouter();
  const handleClick=()=>{
    // handleData();
    setIsProfileActive(true);
  }
  const handleData =()=>{
    setIsOpenSidebar(false);
  }
  useEffect(() => {
    if(sessionStorage.candedateDetails!=undefined && sessionStorage.candedateDetails!=null){
      const candidateDetails=JSON.parse(sessionStorage.candedateDetails)
      const { profilePictureUrl, candidateName } = candidateDetails;
          setUploadedImage("https://kaninfos.com/KANNaukriAPI" + profilePictureUrl);
          setIsCandidateName(candidateName);
    }
    
  
  }, []); 
  


  return (
    <>
    <aside className={`dash-aside-navbar ${isOpenSidebar?'show':''}`} style={{top:'75px'}}>
      <div className="position-relative">
        
        <div className="user-data">
          <div className="user-avatar online position-relative rounded-circle">
            <Image src={uploadedImage===""?userProfile:uploadedImage} width={68} height={68} alt="avatar"  className="lazy-img" />
          </div>
          <div className="user-name-data">
            <button
              className="user-name"
              type="button"
              id="profile-dropdown"
              data-bs-toggle="dropdown"
              data-bs-auto-close="outside"
              aria-expanded="false"
            >
              {isCandidateName}
              {/* James Brower */}
            </button>
            <ul className="dropdown-menu" aria-labelledby="profile-dropdown">
              <li>
                <Link
                  className="dropdown-item d-flex align-items-center"
                  href="/dashboard/candidate-dashboard/profile"
                >
                  <Image src={profile_icon_1} alt="icon" className="lazy-img" />
                  <span className="ms-2 ps-1">Profile</span>
                </Link>
              </li>
              <li>
                <Link
                  className="dropdown-item d-flex align-items-center"
                  href="/dashboard/candidate-dashboard/profile"
                >
                  <Image src={profile_icon_2} alt="icon" className="lazy-img" />
                  <span className="ms-2 ps-1">Account Settings</span>
                </Link>
              </li>
              <li>
                <a className="dropdown-item d-flex align-items-center" href="#">
                  <Image src={profile_icon_3} alt="icon" className="lazy-img" />
                  <span className="ms-2 ps-1">Notification</span>
                </a>
              </li>
              
            </ul>
          </div>
        </div>
        <nav className="dasboard-main-nav">
          <ul className="style-none">
            {nav_data.map((m,index) => {
              const isActive = pathname === m.link;
              return (
                <li key={`nav_data1_${index}`} onClick={() => setIsOpenSidebar(false)}>
                  <Link
                    href={m.link}
                    className={`d-flex w-100 align-items-center ${isActive ? "active" : ""}`}
                  >
                    <Image
                      src={isActive ? m.icon_active : m.icon}
                      alt="icon"
                      className="lazy-img"
                    />
                    <span>{m.title}</span>
                  </Link>
                </li>
              );
            })}
            <li key={2}  onClick={() => handleClick()} >
                 
                    <ExpandableList isActive={isProfileActive} />
                  
                </li>
            {nav_data1.map((m, index) => {
              const isActive = pathname === m.link;
              return (
                <li key={`nav_data1_${index}`} onClick={() => setIsOpenSidebar(false)}>
                  <Link
                    href={m.link}
                    className={`d-flex w-100 align-items-center ${isActive ? "active" : ""}`}
                  >
                    <Image
                      src={isActive ? m.icon_active : m.icon}
                      alt="icon"
                      className="lazy-img"
                    />
                    <span>{m.title}</span>
                  </Link>
                </li>
              );
            })}
            <li key={7}>
              <a
                href="#"
                className="d-flex w-100 align-items-center "
                data-bs-toggle="modal"
                data-bs-target="#deleteModal1"
              >
                <Image src={nav_8} alt="icon" className="lazy-img" />
                <span className="pb-50">Delete Account</span>
              </a>
            </li>
           
          </ul>
        </nav>
        {/* <div className="profile-complete-status">
          <div className="progress-value fw-500">87%</div>
          <div className="progress-line position-relative">
            <div className="inner-line" style={{ width: "80%" }}></div>
          </div>
          <p>Profile Complete</p>
        </div> */}

        {/* <a href="#" className="d-flex w-100 align-items-center logout-btn">
          <Image src={logout} alt="icon" className="lazy-img" />
          <span>Logout</span>
        </a> */}
      </div>
    </aside>
    {/* LogoutModal star */}
    <DeleteModal/>
    {/* LogoutModal end */}
    </>
  );
};

export default CandidateAside;
