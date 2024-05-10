'use client'
import React,{useState} from 'react';
import dynamic from 'next/dynamic';
const Wrapper = dynamic(() => import('@/layouts/wrapper'), { ssr: false });
const CandidateAside = dynamic(() => import('@/app/components/dashboard/candidate/aside'), { ssr: false });
const JobAlertArea = dynamic(() => import('@/app/components/dashboard/candidate/job-alert-area'), { ssr: false });


const CandidateProfileJobAlertPage = () => {
  const [isOpenSidebar,setIsOpenSidebar] = useState<boolean>(false);
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* aside start */}
        <CandidateAside isOpenSidebar={isOpenSidebar} setIsOpenSidebar={setIsOpenSidebar}/>
        {/* aside end  */}

        {/* job alert area start */}
        <JobAlertArea setIsOpenSidebar={setIsOpenSidebar} />
        {/* job alert area end */}
      </div>
    </Wrapper>
  );
};

export default CandidateProfileJobAlertPage;
