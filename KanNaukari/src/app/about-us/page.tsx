import React from "react";
import { Metadata } from "next";
import dynamic from "next/dynamic";
const Wrapper = dynamic(() => import('@/layouts/wrapper'), { ssr: false });
const CandidateProfileBreadcrumb = dynamic(() => import('../components/candidate-details/profile-bredcrumb'), { ssr: false });
const FooterOne = dynamic(() => import('@/layouts/footers/footer-one'), { ssr: false });
const FeatureEleven = dynamic(() => import('../components/features/feature-eleven'), { ssr: false });
const JobPortalIntro = dynamic(() => import('../components/job-portal-intro/job-portal-intro'), { ssr: false });
const FeatureOne = dynamic(() => import('../components/features/feature-one'), { ssr: false });
const HowItWorks = dynamic(() => import('../components/how-it-works/how-it-works'), { ssr: false });
const FeedbackOne = dynamic(() => import('../components/feedBacks/feedback-one'), { ssr: false });
const HeaderFour = dynamic(() => import('@/layouts/headers/header-4'), { ssr: false });

export const metadata: Metadata = {
  title: "About us",
};

const AboutUsPage = () => {
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* header start */}
        <HeaderFour value=""/>
        {/* header end */}

        {/* breadcrumb start */}
        <CandidateProfileBreadcrumb title="About us" subtitle="About" />
        {/* breadcrumb end */}

        {/* text feature area start */}
        <FeatureEleven />
        {/* text feature area end */}

        {/* feature one start */}
        <FeatureOne />
        {/* feature one end */}

        {/* how works start */}
        <HowItWorks />
        {/* how works end */}

        {/* feedback one start */}
        <FeedbackOne about_p={true} />
        {/* feedback one end */}

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

export default AboutUsPage;
