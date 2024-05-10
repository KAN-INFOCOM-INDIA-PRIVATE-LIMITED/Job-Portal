'use client'
import React,{useState} from 'react';
import dynamic from 'next/dynamic';
const Wrapper = dynamic(() => import('@/layouts/wrapper'), { ssr: false });
const EmployAside = dynamic(() => import('@/app/components/dashboard/employ/aside'), { ssr: false });
const DashboardMessage = dynamic(() => import('@/app/components/dashboard/candidate/dashboard-message'), { ssr: false });

const EmployDashboardMessagesPage = () => {
  const [isOpenSidebar,setIsOpenSidebar] = useState<boolean>(false);
  return (
    <Wrapper>

    <div className='main-page-wrapper'>
      {/* aside start */}
      <EmployAside isOpenSidebar={isOpenSidebar} setIsOpenSidebar={setIsOpenSidebar}/>
      {/* aside end  */}

      {/* messages area start */}
      <DashboardMessage setIsOpenSidebar={setIsOpenSidebar}/>
      {/* messages area end */}
    </div>
    </Wrapper>
  );
};

export default EmployDashboardMessagesPage;