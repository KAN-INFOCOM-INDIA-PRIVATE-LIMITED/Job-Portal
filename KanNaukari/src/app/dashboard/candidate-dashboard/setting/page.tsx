'use client'
import React,{useState} from 'react';
import dynamic from 'next/dynamic';
const Wrapper = dynamic(() => import('@/layouts/wrapper'), { ssr: false });
const CandidateAside = dynamic(() => import('@/app/components/dashboard/candidate/aside'), { ssr: false });
const DashboardSettingArea = dynamic(() => import('@/app/components/dashboard/candidate/dashboard-setting'), { ssr: false });

const CandidateDashboardSettingPage = () => {
  const [isOpenSidebar,setIsOpenSidebar] = useState<boolean>(false);
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* aside start */}
        <CandidateAside isOpenSidebar={isOpenSidebar} setIsOpenSidebar={setIsOpenSidebar} />
        {/* aside end  */}

        {/* setting area start */}
        <DashboardSettingArea setIsOpenSidebar={setIsOpenSidebar} />
        {/* setting area end */}
      </div>
    </Wrapper>
  );
};

export default CandidateDashboardSettingPage;
