import React from "react";
import { Metadata } from "next";
import { progressStart, progressEnd } from "@/utils/progress";
import dynamic from "next/dynamic";
const Wrapper = dynamic(() => import('@/layouts/wrapper'), { ssr: false });
const Header4 = dynamic(() => import('@/layouts/headers/header-4'), { ssr: false });
const FooterTwo = dynamic(() => import('@/layouts/footers/footer-2'), { ssr: false });
const CompanyBreadcrumb = dynamic(() => import('../components/common/common-breadcrumb'), { ssr: false });
const RegisterArea = dynamic(() => import('../components/register/register-area'), { ssr: false });



export const metadata: Metadata = {
  title: "Register",
};

const RegisterPage = () => {
    progressEnd();

  
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* header start */}
        <Header4 value={""} />
        {/* header end */}

        {/*breadcrumb start */}
        {/* <CompanyBreadcrumb
          title="Register"
          subtitle="Create an account & Start posting or hiring talents"
        /> */}
        {/*breadcrumb end */}

        {/* register area start */}
        <RegisterArea/>
        {/* register area end */}

        {/* footer start */}
        <FooterTwo />
        {/* footer end */}
      </div>
    </Wrapper>
  );
};

export default RegisterPage;
