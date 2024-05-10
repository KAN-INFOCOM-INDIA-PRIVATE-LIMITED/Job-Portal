'use client'
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { baseUrl } from "@/utils/baseurl";
import { notifyError } from "@/utils/toast";

const useSearchFormSubmit = () => {
  const router = useRouter();
  const [categoryVal, setcategoryVal] = useState<string>("");
  const [locationVal, setLocationVal] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  
  const token = localStorage.getItem("token");

  const generateQueryParams = () => {
    const queryParams = [];

    if (categoryVal) {
      queryParams.push(`category=${categoryVal}`);
    }

    if (locationVal) {
      queryParams.push(`location=${locationVal}`);
    }

    if (searchText) {
      queryParams.push(`search=${searchText}`);
    }

    if (company) {
      queryParams.push(`company=${company}`);
    }

    return queryParams.join("&");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const queryParams = generateQueryParams();

    if (queryParams) {
      router.push(`/job-search?${queryParams}`);
    } else {
      router.push(`/`);
      setcategoryVal("");
      setLocationVal("");
    }
  };

 
 

  return {
    setLocationVal,
    setcategoryVal,
    setCompany,
    setSearchText,
    handleSubmit,
  };
};

export default useSearchFormSubmit;
