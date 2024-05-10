'use client'
import React,{useState} from 'react';
import dynamic from 'next/dynamic';
const Wrapper = dynamic(() => import('@/layouts/wrapper'), { ssr: false });
const EmployAside = dynamic(() => import('@/app/components/dashboard/employ/aside'), { ssr: false });
const DashboardSettingArea = dynamic(() => import('@/app/components/dashboard/candidate/dashboard-setting'), { ssr: false });

const EmployDashboardSettingPage = () => {
  const [isOpenSidebar,setIsOpenSidebar] = useState<boolean>(false);
  return (
    <Wrapper>

    <div className='main-page-wrapper'>
      {/* aside start */}
      <EmployAside isOpenSidebar={isOpenSidebar} setIsOpenSidebar={setIsOpenSidebar}/>
      {/* aside end  */}

      {/* dashboard area start */}
      <DashboardSettingArea setIsOpenSidebar={setIsOpenSidebar}/>
      {/* dashboard area end */}
    </div>
    </Wrapper>
  );
};

export default EmployDashboardSettingPage;