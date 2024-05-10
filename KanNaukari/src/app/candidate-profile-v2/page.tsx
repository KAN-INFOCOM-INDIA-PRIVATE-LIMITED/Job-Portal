import React from "react";
import { Metadata } from "next";
import dynamic from "next/dynamic";
const Wrapper = dynamic(() => import('@/layouts/wrapper'), { ssr: false });
const Header = dynamic(() => import('@/layouts/headers/header-4'), { ssr: false });
const FooterOne = dynamic(() => import('@/layouts/footers/footer-one'), { ssr: false });
const CandidateDetailsV2Area = dynamic(() => import('../components/candidate-details/candidate-details-v2-area'), { ssr: false });
const JobPortalIntro = dynamic(() => import('../components/job-portal-intro/job-portal-intro'), { ssr: false });
const CandidateProfileBreadcrumbTwo = dynamic(() => import('../components/candidate-details/breadcrumb-2'), { ssr: false });

export const metadata: Metadata = {
  title: "Candidate Details v2",
};

const CandidateProfileDetailsV2Page = () => {
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* header start */}
        <Header value=""/>
        {/* header end */}

        {/* breadcrumb start */}
        <CandidateProfileBreadcrumbTwo />
        {/* breadcrumb end */}

        {/* candidate details area start */}
        {/* <CandidateDetailsV2Area /> */}
        {/* candidate details area end */}

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

export default CandidateProfileDetailsV2Page;
