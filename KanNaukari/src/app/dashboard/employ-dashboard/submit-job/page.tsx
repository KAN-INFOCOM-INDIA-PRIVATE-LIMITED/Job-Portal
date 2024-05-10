'use client'
import React, { useState } from "react";
import Wrapper from "@/layouts/wrapper";
import dynamic from "next/dynamic";
const EmployAside = dynamic(() => import('@/app/components/dashboard/employ/aside'), { ssr: false });
const SubmitJobArea = dynamic(() => import('@/app/components/dashboard/employ/submit-job-area'), { ssr: false });

const EmployDashboardSubmitJobPage = () => {
  const [isOpenSidebar,setIsOpenSidebar] = useState<boolean>(false);
  return (
    <Wrapper>
      <div className="main-page-wrapper">
       
        {/* aside start */}
        <EmployAside isOpenSidebar={isOpenSidebar} setIsOpenSidebar={setIsOpenSidebar} />
        {/* aside end  */}

        {/* submit job area start */}
        <SubmitJobArea setIsOpenSidebar={setIsOpenSidebar} />
        {/* submit job area end */}
      </div>
    </Wrapper>
  );
};

export default EmployDashboardSubmitJobPage;
