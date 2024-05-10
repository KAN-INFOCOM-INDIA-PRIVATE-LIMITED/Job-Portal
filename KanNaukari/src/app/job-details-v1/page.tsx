import React from 'react';
import { Metadata } from 'next';
import job_data from '@/data/job-data';
import dynamic from 'next/dynamic';

const Wrapper = dynamic(() => import('@/layouts/wrapper'), { ssr: false });
const Header = dynamic(() => import('@/layouts/headers/header-4'), { ssr: false });
const FooterOne = dynamic(() => import('@/layouts/footers/footer-one'), { ssr: false });
const JobDetailsBreadcrumb = dynamic(() => import('../components/jobs/breadcrumb/job-details-breadcrumb'), { ssr: false });
const JobPortalIntro = dynamic(() => import('../components/job-portal-intro/job-portal-intro'), { ssr: false });
const JobDetailsV1Area = dynamic(() => import('../components/job-details/job-details-v1-area'), { ssr: false });
const RelatedJobs = dynamic(() => import('../components/jobs/related-jobs'), { ssr: false });




const JobDetailsV1Page = () => {
  const job = job_data[0]
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* header start */}
        <Header value=""/>
        {/* header end */}

        {/* job details breadcrumb start */}
        <JobDetailsBreadcrumb/>
        {/* job details breadcrumb end */}

        {/* job details area start */}
        <JobDetailsV1Area job={job} loader={false}/>
        {/* job details area end */}

        {/* related job start */}
        <RelatedJobs category={[".net"]}/>
        {/* related job end */}

        {/* job portal intro start */}
        <JobPortalIntro  />
        {/* job portal intro end */}

        {/* footer start */}
        <FooterOne />
        {/* footer end */}
      </div>
    </Wrapper>
  );
};

export default JobDetailsV1Page;