import React from 'react';
import dynamic from 'next/dynamic';
import Wrapper from '@/layouts/wrapper';
// const Wrapper = dynamic(() => import('@/layouts/wrapper'), { ssr: true });
const CandidateDashboardMain = dynamic(() => import('@/app/components/dashboard/candidate'), { ssr: false });
const HeaderFour = dynamic(() => import('@/layouts/headers/header-4'), { ssr: false });


const CandidateDashboardPage = () => {
  return (
    <Wrapper>
     {/* header start */}
     <HeaderFour value='Profile'/>
        {/* header end */}
      <CandidateDashboardMain />
      
    </Wrapper>
  );
};

export default CandidateDashboardPage;