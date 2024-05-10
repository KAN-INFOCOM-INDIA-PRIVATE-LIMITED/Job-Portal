import React from "react";
import { Metadata } from "next";
import dynamic from "next/dynamic";
const Wrapper = dynamic(() => import('@/layouts/wrapper'), { ssr: false });
const Header = dynamic(() => import('@/layouts/headers/header-4'), { ssr: false });
const FooterOne = dynamic(() => import('@/layouts/footers/footer-one'), { ssr: false });
const CompanyBreadcrumb = dynamic(() => import('../components/common/common-breadcrumb'), { ssr: false });
const JobPortalIntro = dynamic(() => import('../components/job-portal-intro/job-portal-intro'), { ssr: false });
const CompanyV3Area = dynamic(() => import('../components/company/company-v3-area'), { ssr: false });

export const metadata: Metadata = {
  title: "Company v3",
};

const CompanyV3Page = () => {
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* header start */}
        <Header value=""/>
        {/* header end */}

        {/*breadcrumb start */}
        <CompanyBreadcrumb title="Company" subtitle="Find your desire company and get your dream job" />
        {/*breadcrumb end */}

        {/* company v3 area start */}
        <CompanyV3Area />
        {/* company v3 area end */}

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

export default CompanyV3Page;
