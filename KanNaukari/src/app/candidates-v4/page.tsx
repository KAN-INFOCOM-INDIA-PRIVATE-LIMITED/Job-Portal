import React from 'react';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
const Wrapper = dynamic(() => import('@/layouts/wrapper'), { ssr: false });
const Header = dynamic(() => import('@/layouts/headers/header-4'), { ssr: false });
const FooterOne = dynamic(() => import('@/layouts/footers/footer-one'), { ssr: false });
const JobBreadcrumb = dynamic(() => import('../components/jobs/breadcrumb/job-breadcrumb'), { ssr: false });
const JobPortalIntro = dynamic(() => import('../components/job-portal-intro/job-portal-intro'), { ssr: false });
const CandidateV3Area = dynamic(() => import('../components/candidate/candidate-v3-area'), { ssr: false });

export const metadata: Metadata = {
  title: "Candidate v4",
};


const CandidateV4Page = () => {
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* header start */}
        <Header value=""/>
        {/* header end */}

        {/* search breadcrumb start */}
        <JobBreadcrumb title='Candidates' subtitle='Find you desire talents & make your work done' />
        {/* search breadcrumb end */}

        {/* candidate area start */}
        <CandidateV3Area style_2={true} />
        {/* candidate area end */}

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

export default CandidateV4Page;