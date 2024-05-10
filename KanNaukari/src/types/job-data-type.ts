import { StaticImageData } from "next/image";

// export interface IJobType {
//   id: number;
//   logo: StaticImageData;
//   title: string;
//   duration: string;
//   date: string;
//   company: string;
//   location: string;
//   category: string[];
//   tags?: string[];
//   Experience: string;
//   salary: number;
//   salary_duration: string;
//   english_fluency: string;
//   overview: string;
// }

export interface IJobType {
  joB_ID: number;
  job_title?: string;
  job_employer_name?: string;
  job_desc?: string;
  job_type?: string;
  job_language_known?: string;
  job_address?: string;
  job_skills?: string;
  skills?: string;
  job_experience?: string;
  job_category?: string;
  job_city?: string;
  job_state?: string;
  job_salary_duration?: string;
  job_country?: string;
  job_salary: number;
  joB_ROLE?: string[];
  city?: string;
  job_from_date?: string;
  job_to_date?: string;
  
}
export interface ExperienceIJobType {
  professionalId?: number;
  jobTitle?: string;
  jobLocation?: string;
  experience?: string;
  currentCTC?: string;
  expectedCTC?: string;
  professionalFromDate?: string;
  professionalToDate?: string;
  reg_Id?: string;
  employerName?: string;
  
}
export interface EducationIJobType {
  educationId?: number;
  courseTitle?: string;
  specialization?: string;
  university?: string;
  educationFromDate?: string;
  educationToDate?: string;
  courseType?: string;
  perOrCgpa?: string;
  reg_Id?: number;
  
}
export interface SavedJobType {
  joB_ID: number;
  job_title?: string;
  job_salary?: string;
  job_type?: string;
  job_from_date?: string;
  job_to_date?: string;
  job_employer_name?: string;
  job_category?: string;
  job_posted_on?: string;
  
}