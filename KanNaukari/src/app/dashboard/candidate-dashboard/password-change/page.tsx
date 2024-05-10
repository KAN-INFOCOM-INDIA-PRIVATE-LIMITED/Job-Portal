'use client'
import React,{useState} from 'react';
import dynamic from 'next/dynamic';
const Wrapper = dynamic(() => import('@/layouts/wrapper'), { ssr: false });
const CandidateAside = dynamic(() => import('@/app/components/dashboard/candidate/aside'), { ssr: false });
const ChangePasswordArea = dynamic(() => import('@/app/components/dashboard/candidate/change-password'), { ssr: false });

const CandidateDashboardPasswordChangePage = () => {
  const [isOpenSidebar,setIsOpenSidebar] = useState<boolean>(false);
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* aside start */}
        <CandidateAside isOpenSidebar={isOpenSidebar} setIsOpenSidebar={setIsOpenSidebar} />
        {/* aside end  */}

        {/* password change area start */}
        <ChangePasswordArea />
        {/* password change area end */}
      </div>
    </Wrapper>
  );
};

export default CandidateDashboardPasswordChangePage;
