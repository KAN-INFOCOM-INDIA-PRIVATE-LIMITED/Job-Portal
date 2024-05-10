"use client"
import React from "react";
import dynamic from "next/dynamic";
import '@/assets/css/style.css';
import RecommendedJobsList from "./components/jobs/list/recommended-job-list";
const Wrapper = dynamic(() => import('@/layouts/wrapper'), { ssr: false });
const HeaderFour = dynamic(() => import('@/layouts/headers/header-4'), { ssr: false });
const HeroBannerFour = dynamic(() => import('../app/components/hero-banners/hero-banner-four'), { ssr: false });
const CategorySectionFour = dynamic(() => import('../app/components/category/category-section-4'), { ssr: false });
const JobListOne = dynamic(() => import('../app/components/jobs/list/job-list-one'), { ssr: false });
const FeedbackOne = dynamic(() => import('../app/components/feedBacks/feedback-one'), { ssr: false });
const FooterTwo = dynamic(() => import('@/layouts/footers/footer-2'), { ssr: false });

const HomeFour = () => {
  let token,roleId;
  if (typeof window !== "undefined") {
    token=localStorage.getItem("token")
    roleId=localStorage.getItem("role_Id")
  }
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* header start */}
        <HeaderFour value='Profile'/>
        {/* header end */}

        {/* hero banner start */}
        <HeroBannerFour />
        {/* hero banner end */}

        {/* category section start */}
        <CategorySectionFour style_2={true} />
        {/* category section end */}

        {/* fancy banner start */}
        {/* <FancyBannerFour /> */}
        {/* fancy banner end */}

        {/* job list one start */}
        <JobListOne />
        {/* job list one end */}
        {token && token!=="" && roleId==='4' ?<RecommendedJobsList/>:""}

        

        {/* feedback one start */}
        <FeedbackOne style_2={true} />
        {/* feedback one end */}

        {/*text feature start */}
        {/* <FeatureSeven /> */}
        {/*text feature end */}


        {/* faq start */}
        {/* <FaqOne /> */}
        {/* faq end */}

        {/* job portal intro 2 */}
        {/* <JobPortalIntroTwo /> */}
        {/* job portal intro 2 */}

        {/* footer start */}
        <FooterTwo />
        {/* footer end */}
      </div>
    </Wrapper>
  );
};

export default HomeFour;
