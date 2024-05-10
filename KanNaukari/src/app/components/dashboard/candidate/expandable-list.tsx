import React, { useEffect, useRef, useState } from 'react';
import '@/assets/css/style.css'
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import nav_2 from "@/assets/dashboard/images/icon/icon_2.svg";
import nav_2_active from "@/assets/dashboard/images/icon/icon_2_active.svg";
import Image from "next/image";
import { usePathname, useSearchParams } from 'next/navigation';

type IProps={
    isActive:boolean;
    // sendData: (data: any) => void;
}

const ExpandableList:React.FC<IProps> = ({isActive}) => {
    
    const [isListEActive, setListActive] = useState(isActive);
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const profileActive=pathname.includes("/dashboard/candidate-dashboard/profile");
    const detailsProfileActive=searchParams.get("category");
    const [isListExpanded, setListExpanded] = useState(profileActive);

    const toggleList = () => {
      setListExpanded(!isListExpanded);
      setListActive(!isListEActive);
    };
    // const handleClick=()=>{
    //     sendData("");
    // }

  

    
  
    return (
      <div className="sidebar">
        <button className="toggle-button" onClick={toggleList}>
        <Link
                    href="#"
                    className={`d-flex w-100 align-items-center `}
                    style={{paddingLeft:'5%'}}
                  >
              <Image
                      src={nav_2}
                      alt="icon"
                      className="lazy-img svg-icon-p"
                      style={{marginRight:'5%'}}
                    />
              My Profile 
              <FontAwesomeIcon
              icon={isListExpanded ? faChevronUp : faChevronDown}
              className='svg-icon'
            />
            </Link>
        </button>
  
        {isListExpanded && (
          <ul className="expandable-list">
            <li key={10}>
            <Link
                    href="/dashboard/candidate-dashboard/profile?category=myprofile"
                    className={`d-flex w-100 align-items-center ${detailsProfileActive==="myprofile" ? "active" : ""}`}
                    
                  >
                    
                    <span >Details</span>
                  </Link>
            </li>
            <li key={11}>
            <Link
                    href="/dashboard/candidate-dashboard/profile?category=education"
                    className={`d-flex w-100 align-items-center ${detailsProfileActive==="education" ? "active" : ""}`}
                  >
                    
                    <span>Education</span>
                  </Link>
            </li>
            <li key={12}>
            <Link
                    href="/dashboard/candidate-dashboard/profile?category=experience"
                    className={`d-flex w-100 align-items-center ${detailsProfileActive==="experience" ? "active" : ""}`}
                  >
                    
                    <span>Experience</span>
                  </Link>
                  </li> 
          </ul>
        )}
      </div>
    );
  };

export default ExpandableList;