import React from "react";
import { Metadata } from "next";
import dynamic from "next/dynamic";
const Wrapper = dynamic(() => import('@/layouts/wrapper'), { ssr: false });
const Header = dynamic(() => import('@/layouts/headers/header-4'), { ssr: false });
const FooterOne = dynamic(() => import('@/layouts/footers/footer-one'), { ssr: false });
const CompanyBreadcrumb = dynamic(() => import('../components/common/common-breadcrumb'), { ssr: false });
const JobPortalIntro = dynamic(() => import('../components/job-portal-intro/job-portal-intro'), { ssr: false });
const PricingOne = dynamic(() => import('../components/pricing/pricing-one'), { ssr: false });


export const metadata: Metadata = {
  title: "Pricing",
};

const PricingPage = () => {
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* header start */}
        <Header value=""/>
        {/* header end */}

        {/*breadcrumb start */}
        <CompanyBreadcrumb title="Pricing" subtitle="Choose your membership" />
        {/*breadcrumb end */}

        {/* pricing one start */}
        <PricingOne/>
        {/* pricing one end */}

        {/* pricing two start */}
        <PricingOne style_2={true}/>
        {/* pricing two end */}

        {/* job portal intro start */}
        <JobPortalIntro />
        {/* job portal intro end */}

        {/* footer start */}
        <FooterOne />
        {/* footer end */}
      </div>
    </Wrapper>
  );
};

export default PricingPage;
