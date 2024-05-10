'use client'
import React,{useEffect, useState} from 'react';
import dynamic from 'next/dynamic';

const Wrapper = dynamic(() => import('@/layouts/wrapper'), { ssr: false });
const CandidateAside = dynamic(() => import('@/app/components/dashboard/candidate/aside'), { ssr: false });
const DashboardProfileArea = dynamic(() => import('@/app/components/dashboard/candidate/dashboard-profile-area'), { ssr: false });

const CandidateProfilePage = () => {
  const [isOpenSidebar,setIsOpenSidebar] = useState<boolean>(false);
  
  const axios = require('axios');
  // const router = useRouter();
  const [loading, setLoading] = useState(true);
  return (
    <Wrapper>
    <div className='main-page-wrapper'>
      {/* aside start */}
      <CandidateAside isOpenSidebar={isOpenSidebar} setIsOpenSidebar={setIsOpenSidebar}/>
      {/* aside end  */}

      {/* profile area start */}
      <DashboardProfileArea setIsOpenSidebar={setIsOpenSidebar}/>
      {/* profile area end */}
    </div>
    </Wrapper>
  );
};

export default CandidateProfilePage;