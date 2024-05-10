'use client'
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IJobType } from "@/types/job-data-type";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { add_to_wishlist } from "@/redux/features/wishlist";

const JobGridItem = ({ item,style_2=true }: { item: IJobType;style_2?:boolean }) => {
  const {
    joB_ID,
    // logo,
    job_from_date,
    job_city,
    job_salary,
    // salary_duration,
    job_title,
  } = item || {};
  const {wishlist} = useAppSelector(state => state.wishlist);
  const isActive = wishlist.some(p => p.joB_ID === joB_ID);
  const dispatch = useAppDispatch();
  // handle add wishlist
  const handleAddWishlist = (item: IJobType) => {
    dispatch(add_to_wishlist(item));
  };
  return (
    <div className={`job-list-two ${style_2?'style-two':''} position-relative`}>
      <Link href={`/job-details-v1/${joB_ID}`} className="logo">
        {/* <Image src={logo} alt="logo" style={{height:'auto',width:'auto'}} className="lazy-img m-auto" /> */}
      </Link>
      <a onClick={() => handleAddWishlist(item)}
        className={`save-btn text-center rounded-circle tran3s cursor-pointer ${isActive?'active':''}`}
        title={`${isActive?'Remove Job':'Save Job'}`}
      >
        <i className="bi bi-bookmark-dash"></i>
      </a>
      <div>
        <Link href={`/job-details-v1/${joB_ID}`}
          className={`job-duration fw-500 ${job_from_date === "Part time" ? "part-time" : ""}`}
        >
          {job_from_date}
        </Link>
      </div>
      <div>
        <Link href={`/job-details-v1/${joB_ID}`} className="title fw-500 tran3s">
          {job_title}
        </Link>
      </div>
      <div className="job-salary">
        {/* <span className="fw-500 text-dark">${salbuary}</span> / {salary_duration} */}
        <span className="fw-500 text-dark">${job_salary}</span>
      </div>
      <div className="d-flex align-items-center justify-content-between mt-auto">
        <div className="job-location">
          <Link href={`/job-details-v1/${joB_ID}`}>{job_city}</Link>
        </div>
        <Link href={`/job-details-v1/${joB_ID}`} className="apply-btn text-center tran3s">
          APPLY
        </Link>
      </div>
    </div>
  );
};

export default JobGridItem;
