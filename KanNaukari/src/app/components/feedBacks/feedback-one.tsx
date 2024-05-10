"use client"
import Slider from "react-slick";
import React, { useRef } from "react";
import logo_1 from "@/assets/images/logo/media_01.png";
import logo_2 from "@/assets/images/logo/media_02.png";
import logo_3 from "@/assets/images/logo/media_01.png";
import logo_white_1 from "@/assets/images/logo/media_27.png";
import logo_white_2 from "@/assets/images/logo/media_28.png";
import logo_white_3 from "@/assets/images/logo/media_27.png";
import Image, { StaticImageData } from "next/image";
import PartnersSlider from "../partners/partners-slider";
import edelwiss from '@/assets/images/assets/edelwiss.jpg'
import jmbaxi from '@/assets/images/assets/jmbaxi.jpg'
import hdfcergo from '@/assets/images/assets/eurekaforbes.jpg'

// slider_setting
const slider_setting = {
  infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: false,
      arrows: false,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
  // dots: false,
  // arrows: false,
  // centerPadding: "0px",
  // slidesToShow: 3,
  // slidesToScroll: 1,
  // // autoplay: true,
  // autoplaySpeed: 2000,
  // responsive: [
  //   {
  //     breakpoint: 768,
  //     settings: {
  //       slidesToShow: 1,
  //     },
  //   },
  // ],
};

// feedback data
const feedback_data: {
  id: number;
  logo: StaticImageData;
  title: string;
  name: string;
  user_title: string;
  rating: number;
  rating_text: string;
  white_logo: StaticImageData;
}[] = [
    {
      id: 1,
      logo: edelwiss,
      title:
        "“Seattle opera simplifies Performance planning with jobi eSignature.”",
      name: "James Brower",
      user_title: "Lead Designer",
      rating: 4.5,
      rating_text: "Excellent",
      white_logo: logo_white_1,
    },
    {
      id: 2,
      logo: jmbaxi,
      title:
        "“Seattle opera simplifies Performance planning with jobi eSignature.”",
      name: "Mark Joge",
      user_title: "Marketing Chief",
      rating: 4.8,
      rating_text: "Awesome",
      white_logo: logo_white_2,
    },
    {
      id: 3,
      logo: hdfcergo,
      title:
        "“Seattle opera simplifies Performance planning with jobi eSignature.”",
      name: "James Brower",
      user_title: "Lead Designer",
      rating: 4.8,
      rating_text: "Excellent",
      white_logo: logo_white_3,
    },
    {
      id: 4,
      logo: edelwiss,
      title:
        "“Seattle opera simplifies Performance planning with jobi eSignature.”",
      name: "James Brower",
      user_title: "Lead Designer",
      rating: 4.5,
      rating_text: "Excellent",
      white_logo: logo_white_1,
    },
    {
      id: 5,
      logo: jmbaxi,
      title:
        "“Seattle opera simplifies Performance planning with jobi eSignature.”",
      name: "Mark Joge",
      user_title: "Marketing Chief",
      rating: 4.8,
      rating_text: "Awesome",
      white_logo: logo_white_2,
    },
    {
      id: 6,
      logo: hdfcergo,
      title:
        "“Seattle opera simplifies Performance planning with jobi eSignature.”",
      name: "James Brower",
      user_title: "Lead Designer",
      rating: 4.8,
      rating_text: "Excellent",
      white_logo: logo_white_3,
    },
    {
      id: 7,
      logo: edelwiss,
      title:
        "“Seattle opera simplifies Performance planning with jobi eSignature.”",
      name: "James Brower",
      user_title: "Lead Designer",
      rating: 4.8,
      rating_text: "Excellent",
      white_logo: logo_white_3,
    },
    {
      id: 8,
      logo: jmbaxi,
      title:
        "“Seattle opera simplifies Performance planning with jobi eSignature.”",
      name: "James Brower",
      user_title: "Lead Designer",
      rating: 4.8,
      rating_text: "Excellent",
      white_logo: logo_white_3,
    },
    {
      id: 9,
      logo: hdfcergo,
      title:
        "“Seattle opera simplifies Performance planning with jobi eSignature.”",
      name: "James Brower",
      user_title: "Lead Designer",
      rating: 4.8,
      rating_text: "Excellent",
      white_logo: logo_white_3,
    },
  ];
const FeedbackOne = ({ style_2 = false, style_3 = false, about_p = false }: { style_2?: boolean; style_3?: boolean; about_p?: boolean }) => {
  const sliderRef = useRef<Slider | null>(null);

  const sliderPrev = () => {
    sliderRef.current?.slickPrev();
  };

  const sliderNext = () => {
    sliderRef.current?.slickNext();
  };
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <section className="job-listing-one xl-mt-20 lg-mt-20" style={{ backgroundColor: '#fff' }}>
        <div className="container">
            <div className="row justify-content-between align-items-center mb-20 pt-20">
                <div className="title-one align-text-center">
                    <h2 className="text-dark wow fadeInUp fs-45" data-wow-delay="0.3s">Trusted by leading startups.</h2>
                </div>
            </div>

            <div className="job-listing-wrapper mb-20 mt-0 lg-mt-40 wow fadeInUp caraousel-item">
                <Slider {...slider_setting}
                
                ref={sliderRef}>
                    {feedback_data.map((item) => (
            <div key={item.id} className="item item-slider-1">
              <div className={`feedback-block-one ${style_2 ? 'color-two' : ''}`} style={{textAlign:'center'}}>
                <div className="logo">
                  <Image src={item.logo} width={96} height={56} alt="logo"  style={{margin:'auto'}}/>
                </div>
                <blockquote className={`fw-500 mt-10 md-mt-10 mb-10 md-mb-10 ${style_2 ? 'text-black' : ''}`}>
                  {item.title}
                </blockquote>
                <div className={`name ${style_2 ? 'text-black' : 'text-dark'}`}>
                  <span className="fw-500 fs-blackquote">{item.name},</span>
                  {item.user_title}
                </div>
                <div className="review pt-10 md-pt-10 mt-10 md-mt-10 d-flex justify-content-between align-items-center">
                  <div className={`text-md fw-500 ${style_2 ? 'text-black' : 'text-dark'}`}>
                    {item.rating} {item.rating_text}
                  </div>
                  <ul className="style-none d-flex">
                    <li>
                      <a href="#">
                        <i className="bi bi-star-fill"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="bi bi-star-fill"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="bi bi-star-fill"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="bi bi-star-fill"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="bi bi-star"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
                </Slider>
                {/* <ul className="slider-arrows slick-arrow-one d-flex justify-content-center style-none sm-mt-30 recommended-slider-one">
                  <li className="prev_b slick-arrow" onClick={sliderPrev}>
                    <i className="bi bi-arrow-left"></i>
                  </li>
                  <li className="next_b slick-arrow" onClick={sliderNext}>
                    <i className="bi bi-arrow-right"></i>
                  </li>
                </ul> */}
            </div>
        </div>
    </section>
);
};
//   return (
//     <section className={`feedback-section-one mb-20 mt-20 ${style_3 ? 'pt-120 lg-pt-100' : 'pt-30 xl-pt-150 lg-pt-100'} ${about_p ? 'pb-80 lg-pb-20' : ''}`}>
//       <div className="container position-relative">
//         <div className="row">
//           <div className="col-lg-12 col-md-6">
//             <div className="title-one text-center text-md-start mb-30 md-mb-50 wow fadeInUp" data-wow-delay="0.3s">
//               <h2 style={{fontSize:'35px'}} className={style_3 ? 'main-font' : ''}>Trusted by leading startups.</h2>
//             </div>
//           </div>
//         </div>

//         <Slider
//           {...slider_setting}
//           ref={sliderRef}
//         >
          // {feedback_data.map((item) => (
          //   <div key={item.id} className="item item-slider-1">
          //     <div className={`feedback-block-one ${style_2 ? 'color-two' : ''}`}>
          //       <div className="logo">
          //         <Image src={java} width={96} height={56} alt="logo" className="center" />
          //       </div>
          //       <blockquote className={`fw-500 mt-10 md-mt-10 mb-10 md-mb-10 ${style_2 ? 'text-black' : ''}`}>
          //         {item.title}
          //       </blockquote>
          //       <div className={`name ${style_2 ? 'text-black' : 'text-dark'}`}>
          //         <span className="fw-500 fs-blackquote">{item.name},</span>
          //         {item.user_title}
          //       </div>
          //       <div className="review pt-10 md-pt-10 mt-10 md-mt-10 d-flex justify-content-between align-items-center">
          //         <div className={`text-md fw-500 ${style_2 ? 'text-black' : 'text-dark'}`}>
          //           {item.rating} {item.rating_text}
          //         </div>
          //         <ul className="style-none d-flex">
          //           <li>
          //             <a href="#">
          //               <i className="bi bi-star-fill"></i>
          //             </a>
          //           </li>
          //           <li>
          //             <a href="#">
          //               <i className="bi bi-star-fill"></i>
          //             </a>
          //           </li>
          //           <li>
          //             <a href="#">
          //               <i className="bi bi-star-fill"></i>
          //             </a>
          //           </li>
          //           <li>
          //             <a href="#">
          //               <i className="bi bi-star-fill"></i>
          //             </a>
          //           </li>
          //           <li>
          //             <a href="#">
          //               <i className="bi bi-star"></i>
          //             </a>
          //           </li>
          //         </ul>
          //       </div>
          //     </div>
          //   </div>
          // ))}
//         </Slider>

//         <ul className="slider-arrows slick-arrow-one d-flex justify-content-center style-none sm-mt-30">
//           <li className="prev_b slick-arrow" onClick={sliderPrev}>
//             <i className="bi bi-arrow-left"></i>
//           </li>
//           <li className="next_b slick-arrow" onClick={sliderNext}>
//             <i className="bi bi-arrow-right"></i>
//           </li>
//         </ul>

//         {!style_2 && <div className={`partner-logos ${about_p ? 'border-0' : ''} pt-150 xl-pt-120 md-pt-80 sm-pt-40 pb-80 md-pb-40`}>
//           {/* partners slider start */}
//           <PartnersSlider />
//           {/* partners slider end */}
//         </div>}
//       </div>
//     </section>
//   );
// };

export default FeedbackOne;
