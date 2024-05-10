import React from "react";
import { Metadata } from "next";
import dynamic from "next/dynamic";
const Wrapper = dynamic(() => import('@/layouts/wrapper'), { ssr: false });
const Header = dynamic(() => import('@/layouts/headers/header-4'), { ssr: false });
const FooterOne = dynamic(() => import('@/layouts/footers/footer-one'), { ssr: false });
const CandidateProfileBreadcrumb = dynamic(() => import('../components/candidate-details/profile-bredcrumb'), { ssr: false });
const JobPortalIntro = dynamic(() => import('../components/job-portal-intro/job-portal-intro'), { ssr: false });


export const metadata: Metadata = {
  title: "Candidate Details v1",
};

const CandidateProfileDetailsPage = () => {
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* header start */}
        <Header value=""/>
        {/* header end */}

        {/* breadcrumb start */}
        <CandidateProfileBreadcrumb title="Candidate Profile" subtitle="Candidate Profile" />
        {/* breadcrumb end */}

        {/* candidate details area start */}
        {/* <CandidateDetailsArea /> */}
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

export default CandidateProfileDetailsPage;
