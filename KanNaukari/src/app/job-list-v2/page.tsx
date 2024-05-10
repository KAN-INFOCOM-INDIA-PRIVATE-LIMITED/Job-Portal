import React from 'react';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
const Wrapper = dynamic(() => import('@/layouts/wrapper'), { ssr: false });
const Header = dynamic(() => import('@/layouts/headers/header-4'), { ssr: false });
const FooterOne = dynamic(() => import('@/layouts/footers/footer-one'), { ssr: false });
const JobBreadcrumb = dynamic(() => import('../components/jobs/breadcrumb/job-breadcrumb'), { ssr: false });
const JobPortalIntro = dynamic(() => import('../components/job-portal-intro/job-portal-intro'), { ssr: false });
const JobListV2Area = dynamic(() => import('../components/jobs/list/job-list-v2-area'), { ssr: false });



const JobListTwoPage = () => {
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* header start */}
        <Header value=""/>
        {/* header end */}

        {/* search breadcrumb start */}
        <JobBreadcrumb />
        {/* search breadcrumb end */}

        {/* job list three start */}
        <JobListV2Area itemsPerPage={8} />
        {/* job list three end */}

        {/* job portal intro start */}
        <JobPortalIntro top_border={true} />
        {/* job portal intro end */}

        {/* footer start */}
        <FooterOne />
        {/* footer end */}
      </div>
    </Wrapper>
  );
};

export default JobListTwoPage;