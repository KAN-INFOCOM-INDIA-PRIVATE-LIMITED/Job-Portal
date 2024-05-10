'use client'
import React,{useState} from 'react';
import dynamic from 'next/dynamic';
const Wrapper = dynamic(() => import('@/layouts/wrapper'), { ssr: false });
const CandidateAside = dynamic(() => import('@/app/components/dashboard/candidate/aside'), { ssr: false });
const SavedJobArea = dynamic(() => import('@/app/components/dashboard/candidate/saved-job-area'), { ssr: false });

const CandidateDashboardSavedJobPage = () => {
  const [isOpenSidebar,setIsOpenSidebar] = useState<boolean>(false);
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* aside start */}
        <CandidateAside isOpenSidebar={isOpenSidebar} setIsOpenSidebar={setIsOpenSidebar}/>
        {/* aside end  */}

        {/* saved job area start */}
        <SavedJobArea setIsOpenSidebar={setIsOpenSidebar} />
        {/* saved job area end */}
      </div>
    </Wrapper>
  );
};

export default CandidateDashboardSavedJobPage;
