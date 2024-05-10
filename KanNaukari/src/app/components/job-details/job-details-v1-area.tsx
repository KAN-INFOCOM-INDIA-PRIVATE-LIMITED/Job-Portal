"use client"
import React, { useEffect, useState } from 'react';
import { IJobType } from '@/types/job-data-type';
import Image from 'next/image';
import { format } from 'date-fns';
import { baseUrl } from '@/utils/baseurl';
import { notifyError, notifySuccess } from '@/utils/toast';
import { progressEnd } from '@/utils/progress';
import { useRouter } from 'next/navigation';
import Loading from '@/app/loading';

const JobDetailsV1Area = ({job,loader}:{job:IJobType,loader:boolean}) => {
	const from_date=new Date(job.job_from_date!);
	const to_date=new Date(Date.parse(job.job_to_date!));
	const axios = require('axios');
 	const token = localStorage.getItem("token");
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	const skillString = job.job_skills;
	const skillArray = skillString?.split(',');
	let isLoginUser:boolean=false;
	if(token!==null || token===""){
	  isLoginUser=true;
	}
	
	const from_formattedDate = from_date.toLocaleDateString('en-IN', {
		day: 'numeric',
		month: 'numeric',
		year: 'numeric',
	  });
	const to_formattedDate = to_date.toLocaleDateString('en-IN', {
		day: 'numeric',
		month: 'numeric',
		year: 'numeric',
	  });

	  const addData=()=>{
  
		let data = JSON.stringify({
		  "joB_ID": job.joB_ID,
		  "reg_Id": localStorage.getItem("reg_Id"),
		  // "applied_ON": "2024-02-09T10:05:18.455Z"
		  "applied_ON": new Date().toISOString().toString()
		});
		
		let config = {
		  method: 'post',
		  maxBodyLength: Infinity,
		  url: baseUrl+'/ApplyJob',
		  headers: { 
			'Content-Type': 'application/json', 
			'Authorization': 'Bearer '+token
		  },
		  data : data
		};
		
		axios.request(config)
		.then((response:any) => {
		  if(response.status==200){
			notifySuccess(response.data.message);
			setLoading(false);
		  }else if(response.message=="Unauthorized"){
			progressEnd();
			  localStorage.clear();
			  router.push("/");
			  setLoading(false);
		  }
		  // console.log(JSON.stringify(response.data));
		})
		.catch((error:any) => {
		//   console.log(error);
		  notifyError(error.message);
		  setLoading(false);
		});
		
	  }

	  useEffect(() => {
		setLoading(loader);
	  }, [loader]);
	 
	//   const skillArray = skills.map(element => element + '_suffix');
	  
  return (
	<>
    {loading ? <Loading /> : (
    <section className="job-details pt-100 lg-pt-80 pb-30 lg-pb-80">
			<div className="container">
				<div className="row">
					
					<div className="col-xxl-9 col-xl-8">
					{/* <div className="title-two"> */}
                <h2 className="text-black text-center h-fs">Job Details</h2>
              {/* </div> */}
						<div className="details-post-data me-xxl-5 pe-xxl-4">
							<div className="post-date">{from_formattedDate} by <a href="#" className="fw-500 text-dark">{job.job_employer_name}</a></div>
							<h3 className="post-title">{job.job_title}</h3>
							{/* <ul className="share-buttons d-flex flex-wrap style-none">
								<li><a href="#" className="d-flex align-items-center justify-content-center">
									<i className="bi bi-facebook"></i>
									<span>Facebook</span>
								</a></li>
								<li><a href="#" className="d-flex align-items-center justify-content-center">
									<i className="bi bi-twitter"></i>
									<span>Twitter</span>
								</a></li>
								<li><a href="#" className="d-flex align-items-center justify-content-center">
									<i className="bi bi-link-45deg"></i>
									<span>Copy</span>
								</a></li>
							</ul> */}

							<div className="post-block border-style mt-30 lg-mt-30">
								<div className="d-flex align-items-center">
									<div className="block-numb text-center fw-500 text-white rounded-circle me-2">1</div>
									<h4 className="block-title">Overview</h4>
								</div>
								<p>{job.job_type}</p>
							</div>
							<div className="post-block border-style mt-30">
								<div className="d-flex align-items-center">
									<div className="block-numb text-center fw-500 text-white rounded-circle me-2">2</div>
									<h4 className="block-title">Job Description</h4>
								</div>
								<p>{job.job_desc}</p>
							</div>
							
							<div className="post-block border-style mt-40 lg-mt-30">
								<div className="d-flex align-items-center">
									<div className="block-numb text-center fw-500 text-white rounded-circle me-2">3</div>
									<h4 className="block-title">Required skills:</h4>
								</div>
								 <ul className='mt-20'>
									{skillArray?.map((item, index) => (
									<li key={index}>{item.trim()}</li>
									))}
								</ul>
								{/* <p>{job.job_skills}</p> */}
								{/* <ul className="list-type-two style-none mb-15">
									<li>{skillArray}</li> */}
									{/* <li>A portfolio that exemplifies strong visual design and a focus on defining the user Experience.</li>
									<li>You’ve proudly shipped and launched several products.</li>
									<li>You have some past Experience working in an agile environment – Think two-week sprints.</li>
									<li>Experience effectively presenting and communicating your design decisions to clients and team members</li>
									<li>Up-to-date knowledge of design software like Figma, Sketch etc.</li> */}
								{/* </ul> */}
							</div>
							<div className="post-block border-style mt-40 lg-mt-30">
								<div className="d-flex align-items-center">
									<div className="block-numb text-center fw-500 text-white rounded-circle me-2">4</div>
									<h4 className="block-title">Responsibilities</h4>
								</div>
								<ul className="list-type-one style-none mb-15">
									<li>Collaborate daily with a multidisciplinary team of Software Engineers, Researchers, Strategists, and Project Managers.</li>
									<li>Co-lead ideation sessions, workshops, demos, and presentations with clients on-site</li>
									<li>Push for and create inclusive, accessible design for all</li>
									<li>Maintain quality of the design process and ensure that when designs are translated into code they accurately reflect the design specifications.</li>
									<li>Sketch, wireframe, build IA, motion design, and run usability tests</li>
									<li>Design pixel perfect responsive UI’s and understand that adopting common interface pattern is better for UX than reinventing the wheel</li>
									<li>Ensure content strategy and design are perfectly in-sync</li>
									<li>Give and receive design critique to help constantly refine and push our work</li>
								</ul>
							</div>
							{/* <div className="post-block border-style mt-40 lg-mt-30">
								<div className="d-flex align-items-center">
									<div className="block-numb text-center fw-500 text-white rounded-circle me-2">5</div>
									<h4 className="block-title">Benefits:</h4>
								</div>
								<ul className="list-type-two style-none mb-15">
									<li>We are a remote-first company.</li>
									<li>100% company-paid health insurance premiums for you & your dependents</li>
									<li>Vacation stipend</li>
									<li>Unlimited paid vacation and paid company holidays</li>
									<li>Monthly wellness/gym stipend</li>
								</ul>
							</div> */}
						</div>
					</div>

					<div className="col-xxl-3 col-xl-4" style={{marginTop:'11%'}}>
						<div className="job-company-info ms-xl-5 ms-xxl-0 lg-mt-50">
							{/* <Image src={job.logo} alt="logo" className="lazy-img m-auto logo" width={60} height={60}/> */}
							<div className="text-md text-dark text-center mt-15 mb-20 text-capitalize">{job.job_employer_name}</div>
							{/* <a href="#" className="website-btn tran3s">Visit website</a> */}

							<div className="border-top mt-40 pt-40">
								<ul className="job-meta-data row style-none">
									<li className="col-xl-7 col-md-4 col-sm-6">
										<span>Salary</span>
										{/* <div>{job.salary}/{job.salary_duration}</div> */}
										<div>{job.job_salary}</div>
									</li>
									<li className="col-xl-5 col-md-4 col-sm-6">
										<span>Expertise</span>
										<div>{job.job_language_known}</div>
									</li>
									<li className="col-xl-7 col-md-4 col-sm-6">
										<span>Location</span>
										<div>{job.job_address}</div>
									</li>
									<li className="col-xl-5 col-md-4 col-sm-6">
										<span>Job Type</span>
										<div>{job.job_type}</div>
									</li>
									<li className="col-xl-7 col-md-4 col-sm-6">
										<span>Date</span>
										<div>{from_formattedDate}  </div>
									</li>
									<li className="col-xl-5 col-md-4 col-sm-6">
										<span>Experience</span>
										<div>{job.job_experience}</div>
									</li>
								</ul>
								{/* <div className="job-tags d-flex flex-wrap pt-15">
									{job.tags && job.tags.map((t,i) => (
									<a key={i} href="#">{t}</a>
									))}
								</div> */}
								{(isLoginUser) ? 
								<a  className="btn-one w-100 mt-25" onClick={() => addData()}>Apply Now</a> :" "
							}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		 )}
		 </>
  );
};

export default JobDetailsV1Area;