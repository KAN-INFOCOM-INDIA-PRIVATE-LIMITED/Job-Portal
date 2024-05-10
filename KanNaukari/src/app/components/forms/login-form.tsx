"use client";
import React, { useState } from "react";
import Image from "next/image";
import * as Yup from "yup";
import { Resolver, useForm } from "react-hook-form";
import ErrorMsg from "../common/error-msg";
import icon from "@/assets/images/icon/icon_60.svg";
// import { redirect } from "next/dist/server/api-utils";
import { redirect } from 'next/navigation'
import { baseUrl } from "@/utils/baseurl";
import { progressStart, progressEnd } from "@/utils/progress";
import { notifyError, notifySuccess } from "@/utils/toast";
import { apiOperation } from "@/utils/apicall";
import { useRouter } from "next/navigation";

// form data type
type IFormData = {
  email: string;
  password: string;
};

// schema
const schema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
});

// resolver
const resolver: Resolver<IFormData> = async (values) => {
  return {
    values: values.email ? values : {},
    errors: !values.email
      ? {
          email: {
            type: "required",
            message: "Email is required.",
          },
          password: {
            type: "required",
            message: "Password is required.",
          },
        }
      : {},
  };
};

type SendDataCallback = (data: any) => void; // Replace `any` with the expected type of the data

const LoginForm = ({ sendData }: { sendData: SendDataCallback }) => {
  const [showPass, setShowPass] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const axios = require('axios');
  const router=useRouter();
  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormData>({ resolver });
  // on submit
  const onSubmit = (data: IFormData) => {
    progressStart();
    fetchData(data);
    // if (data) {
    //   alert("Login successfully!");
    // }
    
  };

   const fetchData = async (data:IFormData) => {
    const data1=JSON.stringify({ "user_Name": data.email,"password": data.password});
    const header = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
  }
    let req:any;
    await fetch(baseUrl+"/Login", {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    },
      body: JSON.stringify({ "user_Name": data.email,"password": data.password})
  }).then(r=>
    r.json()
    ).then(res=>{
    if(res){
      req = res;
      if(req.status=="200"){
        localStorage.setItem("reg_Id",req.obj.reg_Id);
        localStorage.setItem("role_Id",req.obj.role_Id);
        localStorage.setItem("token",req.obj.aToken);
        if(req.obj.role_Id == 4){
          getCandidateDetails(req.obj.aToken);
        }
        reset();
        notifySuccess(res.message);
        sendData(res);
      }else{
        notifyError(req.message);
      }
      
      // this.setState({message:'New Employee is Created Successfully'});
    }
    progressEnd();
  });
};

const getCandidateDetails = async (token:string) => {
  try {
    const data = JSON.stringify({
      "regId": localStorage.getItem("reg_Id"),
      "operationType": "GET"
    });
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: baseUrl+'/GetCandidateDetails',
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': 'Bearer '+token
      },
      data: data
    };

    const response = await axios.request(config);
    if (response.status === 200) {
      sessionStorage.setItem("candedateDetails",JSON.stringify(response.data.obj));
    } else if (response.message === "Unauthorized") {
      localStorage.clear();
      router.push("/");
    }
  } catch (error:any) {
    console.error(error);
    if (error.message === "Request failed with status code 401") {
      localStorage.clear();
      notifyError("Authentication Failed");
      router.push("/");
    } else {
      notifyError(error.message);
    }
  }
};
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
      <div className="row">
        <div className="col-12">
          <div className="input-group-meta position-relative mb-25">
            <label>Email*</label>
            <input
              type="email"
              placeholder="james@example.com"
              {...register("email", { required: `Email is required!` })}
              name="email"
            />
            <div className="help-block with-errors">
              <ErrorMsg msg={errors.email?.message!} />
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="input-group-meta position-relative mb-20">
            <label>Password*</label>
            <input
              type={`${showPass ? "text" : "password"}`}
              placeholder="Enter Password"
              className="pass_log_id"
              {...register("password", { required: `Password is required!` })}
              name="password"
            />
            <span
              className="placeholder_icon"
              onClick={() => setShowPass(!showPass)}
            >
              <span className={`passVicon ${showPass ? "eye-slash" : ""}`}>
                <Image src={icon} alt="icon" />
              </span>
            </span>
            <div className="help-block with-errors">
              <ErrorMsg msg={errors.password?.message!} />
            </div>
          </div>
        </div>
        {/* <div className="col-12">
          <div className="agreement-checkbox d-flex justify-content-between align-items-center">
            <div>
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Keep me logged in</label>
            </div> */}
            {/* <a href="#">Forget Password?</a> */}
          {/* </div>
        </div> */}
        <div className="col-12">
          <button
            type="submit"
            className="btn-eleven fw-500 tran3s d-block mt-20"
          >
            Login
          </button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;