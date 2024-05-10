import React from "react";
import { Metadata } from "next";
import dynamic from "next/dynamic";
const Wrapper = dynamic(() => import('@/layouts/wrapper'), { ssr: false });
const Header = dynamic(() => import('@/layouts/headers/header-4'), { ssr: false });
const FooterOne = dynamic(() => import('@/layouts/footers/footer-one'), { ssr: false });
const CompanyBreadcrumb = dynamic(() => import('../components/common/common-breadcrumb'), { ssr: false });
const JobPortalIntro = dynamic(() => import('../components/job-portal-intro/job-portal-intro'), { ssr: false });
const BlogFullWidthArea = dynamic(() => import('../components/blogs/blog-frull-width'), { ssr: false });

export const metadata: Metadata = {
  title: "Blog v3",
};

const BlogV3Page = () => {
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* header start */}
        <Header value=""/>
        {/* header end */}

        {/*breadcrumb start */}
        <CompanyBreadcrumb
          title="Blog"
          subtitle="Read our blog from top talents"
        />
        {/*breadcrumb end */}

        {/* blog v3 start */}
        <BlogFullWidthArea />
        {/* blog v3 end */}

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

export default BlogV3Page;
