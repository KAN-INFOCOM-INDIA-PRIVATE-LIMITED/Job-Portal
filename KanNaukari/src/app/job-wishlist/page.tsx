import React from "react";
import { Metadata } from "next";
import dynamic from "next/dynamic";
const Wrapper = dynamic(() => import('@/layouts/wrapper'), { ssr: false });
const Header = dynamic(() => import('@/layouts/headers/header-4'), { ssr: false });
const FooterOne = dynamic(() => import('@/layouts/footers/footer-one'), { ssr: false });
const CommonBreadcrumb = dynamic(() => import('../components/common/common-breadcrumb'), { ssr: false });
const JobPortalIntro = dynamic(() => import('../components/job-portal-intro/job-portal-intro'), { ssr: false });
const WishlistArea = dynamic(() => import('../components/wishlist/wishlist-area'), { ssr: false });

export const metadata: Metadata = {
  title: "Job Wishlist",
};

const JobWishlistPage = () => {
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* header start */}
        <Header value=""/>
        {/* header end */}

        {/* search breadcrumb start */}
        <CommonBreadcrumb
          title="Wishlist"
          subtitle="Find your desire company and get your dream job"
        />
        {/* search breadcrumb end */}

        {/* wishlist area start */}
        <WishlistArea />
        {/* wishlist area end */}

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

export default JobWishlistPage;
