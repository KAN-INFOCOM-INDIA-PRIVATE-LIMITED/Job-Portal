import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import Link from 'next/link';
import { IJobType } from '@/types/job-data-type';
import { baseUrl } from '@/utils/baseurl';
import { notifySuccess } from '@/utils/toast';
import '@/assets/css/style.css';
import { useRouter } from 'next/navigation';
import java from '@/assets/images/assets/java.svg'

const RecommendedJobsList = () => {
    const [jobList, setJobList] = useState<IJobType[]>([]);
    const axios = require('axios');
    const regId = localStorage.getItem("reg_Id");
    const token = localStorage.getItem("token");
    const router = useRouter();
    const sliderRef = useRef<Slider | null>(null);

  const sliderPrev = () => {
    sliderRef.current?.slickPrev();
  };

  const sliderNext = () => {
    sliderRef.current?.slickNext();
  };

    useEffect(() => {
        // console.log('useEffect is called');
        const fetchJobs = async () => {
            try {
                // console.log('API call started');
                const response = await axios.post(baseUrl + "/RecommendJobsByRegId", {
                    regId: regId
                }, {
                    headers: {
                        Authorization: 'Bearer Token ' + token,
                        'Content-Type': 'application/json'
                    },
                });

                // console.log('API call finished');

                if (response.status === 200) {
                    // console.log('Jobs fetched successfully.');
                    setJobList(response.data.obj);
                } else if (response.message === "Unauthorized") {
                    localStorage.clear();
                    window.location.reload();
                    // router.reload();
                } else {
                    console.error('Failed to fetch jobs.');
                }
            } catch (error:any) {
              if(error.response.data.message==='Unauthorized'){
                localStorage.clear();
                window.location.reload();
              }
                // console.error('Error fetching jobs:', error);
            }
        };

        fetchJobs();
    }, []); // Empty dependency array ensures that this effect runs only once

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
                        <h2 className="text-dark wow fadeInUp fs-45" data-wow-delay="0.3s">Recommended Jobs</h2>
                    </div>
                </div>

                <div className="job-listing-wrapper  mt-0 lg-mt-40 wow fadeInUp caraousel-item">
                    <Slider {...settings}
                    
                    ref={sliderRef}>
                        {jobList.map((job) => (
                            <div key={job.joB_ID} className="job-item">
                                <div className="job-box-a bottom-border">
                                        <h2><Link href={`/job-details-v1/${job.joB_ID}`}>{job.job_title}</Link></h2>
                                        <p className='mb-1'>{job.job_employer_name}</p>
                                        <p className='mb-1'>{job.job_salary}/{job.job_salary_duration}</p>
                                    
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

export default RecommendedJobsList;
