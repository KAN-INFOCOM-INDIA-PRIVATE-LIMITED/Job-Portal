"use client";
import React, { useState } from 'react';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
const Wrapper = dynamic(() => import('@/layouts/wrapper'), { ssr: false });
const JobListThree = dynamic(() => import('../components/jobs/list/job-list-three'), { ssr: false });
const HeaderFour = dynamic(() => import('@/layouts/headers/header-4'), { ssr: false });
const JobBreadcrumb = dynamic(() => import('../components/jobs/breadcrumb/job-breadcrumb'), { ssr: false });
const JobPortalIntro = dynamic(() => import('../components/job-portal-intro/job-portal-intro'), { ssr: false });
const FooterTwo = dynamic(() => import('@/layouts/footers/footer-2'), { ssr: false });

const JobListOnePage = () => {
  const [sendCategoryData, setCategoryData] = useState('');
  const [sendLocationData, setLocationData] = useState('');
  const myConstMethod = (cat:any,loc:any) => {
    setCategoryData(cat);
    setLocationData(loc);
    // console.log('Constant method called from Component B'+cat+loc);
    // Your logic here...
  };
  // const receivedData = router.query.data || 'No data received';
  // console.log(receivedData);
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* header start */}
        <HeaderFour value='Profile'/>
        {/* header end */}

        {/* search breadcrumb start */}
        <JobBreadcrumb constMethod={myConstMethod}/>
        {/* search breadcrumb end */}

        {/* job list three start */}
        <JobListThree itemsPerPage={10} cat={sendCategoryData} loc={sendLocationData}/>
        {/* job list three end */}

        {/* job portal intro start */}
        {/* <JobPortalIntro top_border={true} /> */}
        {/* job portal intro end */}

        {/* footer start */}
        <FooterTwo />
        {/* footer end */}
      </div>
    </Wrapper>
  );
};

export default JobListOnePage;