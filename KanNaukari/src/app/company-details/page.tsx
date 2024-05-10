import React from "react";
import { Metadata } from "next";
import dynamic from "next/dynamic";
const Wrapper = dynamic(() => import('@/layouts/wrapper'), { ssr: false });
const Header = dynamic(() => import('@/layouts/headers/header-4'), { ssr: false });
const FooterOne = dynamic(() => import('@/layouts/footers/footer-one'), { ssr: false });
const CompanyBreadcrumb = dynamic(() => import('../components/common/common-breadcrumb'), { ssr: false });
const JobPortalIntro = dynamic(() => import('../components/job-portal-intro/job-portal-intro'), { ssr: false });
const CompanyDetailsArea = dynamic(() => import('../components/company-details/company-details-area'), { ssr: false });
const OpenPosition = dynamic(() => import('../components/company-details/open-position'), { ssr: false });


export const metadata: Metadata = {
  title: "Company Details",
};

const CompanyDetailsPage = () => {
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* header start */}
        <Header value=""/>
        {/* header end */}

        {/*breadcrumb start */}
        <CompanyBreadcrumb
          title="Company Details"
          subtitle="Find company details here"
        />
        {/*breadcrumb end */}

        {/* company details area start */}
        <CompanyDetailsArea />
        {/* company details area end */}

        {/*job Open Position */}
        <OpenPosition/>
        {/*job Open Position */}

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

export default CompanyDetailsPage;
