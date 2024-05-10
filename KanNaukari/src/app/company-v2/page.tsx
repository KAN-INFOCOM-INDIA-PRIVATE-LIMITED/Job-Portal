import React from "react";
import { Metadata } from "next";
import dynamic from "next/dynamic";
const Wrapper = dynamic(() => import('@/layouts/wrapper'), { ssr: false });
const FooterOne = dynamic(() => import('@/layouts/footers/footer-one'), { ssr: false });
const CompanyBreadcrumb = dynamic(() => import('../components/common/common-breadcrumb'), { ssr: false });
const JobPortalIntro = dynamic(() => import('../components/job-portal-intro/job-portal-intro'), { ssr: false });
const CompanyV1Area = dynamic(() => import('../components/company/company-v1-area'), { ssr: false });

export const metadata: Metadata = {
  title: "Company v2",
};

const CompanyV2Page = () => {
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* header start */}
        {/* <Header /> */}
        {/* header end */}

        {/*breadcrumb start */}
        <CompanyBreadcrumb title="Company" subtitle="Find your desire company and get your dream job" />
        {/*breadcrumb end */}

        {/* company v2 area start */}
        <CompanyV1Area style_2={true} />
        {/* company v2 area end */}

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

export default CompanyV2Page;
