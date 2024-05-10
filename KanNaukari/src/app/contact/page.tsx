import React from "react";
import { Metadata } from "next";
import dynamic from "next/dynamic";
const Wrapper = dynamic(() => import('@/layouts/wrapper'), { ssr: false });
const ContactArea = dynamic(() => import('../components/contact/contact-area'), { ssr: false });
const HeaderFour = dynamic(() => import('@/layouts/headers/header-4'), { ssr: false });
const FooterTwo = dynamic(() => import('@/layouts/footers/footer-2'), { ssr: false });


export const metadata: Metadata = {
  title: "Contact",
};

const ContactPage = () => {
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* header start */}
        <HeaderFour value='Profile'/>
        {/* header end */}

        {/*MapArea start */}
        {/* <MapArea /> */}
        {/*MapArea end */}

        {/* contact area start */}
        <ContactArea />
        {/* contact area end */}

        {/* footer start */}
        <FooterTwo />
        {/* footer end */}
      </div>
    </Wrapper>
  );
};

export default ContactPage;
