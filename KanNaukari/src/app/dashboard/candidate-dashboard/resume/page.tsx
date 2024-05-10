'use client'
import React,{useState} from 'react';
import Wrapper from '@/layouts/wrapper';
import dynamic from 'next/dynamic';
const CandidateAside = dynamic(() => import('@/app/components/dashboard/candidate/aside'), { ssr: false });
const DashboardResume = dynamic(() => import('@/app/components/dashboard/candidate/dashboard-resume'), { ssr: false });


const CandidateDashboardResumePage = () => {
  const [isOpenSidebar,setIsOpenSidebar] = useState<boolean>(false);
  return (
    <Wrapper>

    <div className='main-page-wrapper'>
      {/* aside start */}
      <CandidateAside isOpenSidebar={isOpenSidebar} setIsOpenSidebar={setIsOpenSidebar}/>
      {/* aside end  */}

      {/* Resume area start */}
      <DashboardResume setIsOpenSidebar={setIsOpenSidebar}/>
      {/* Resume area end */}
    </div>
    </Wrapper>
  );
};

export default CandidateDashboardResumePage;