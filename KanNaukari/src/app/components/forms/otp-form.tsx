"use client";
import * as Yup from "yup";
import React, { useState } from "react";
import Image from "next/image";
import { Resolver, useForm } from "react-hook-form";
import icon from "@/assets/dashboard/images/icon/icon_22.svg";
import ErrorMsg from "@/app/components/common/error-msg";
import { progressEnd } from "@/utils/progress";
import { baseUrl } from "@/utils/baseurl";

type IFormData = {
    otp: string;
  };
  
  // schema
  const schema = Yup.object().shape({
    otp: Yup.string().required().email().label("otp"),
  });
  
  
  // resolver
  const resolver: Resolver<IFormData> = async (values) => {
    return {
      values: values.otp ? values : {},
      errors: !values.otp
        ? {
            otp: {
              type: "required",
              message: "OTP is required.",
            },
          }
        : {},
    };
  };
  type SendDataCallback = (data: any) => void;
const OtpForm = ({ sendData }: { sendData: SendDataCallback }) => {
    const [showPass, setShowPass] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
      } = useForm<IFormData>({ resolver });
      // on submit
      const onSubmit = (data: IFormData) => {
        fetchData(data);
        // sendData("otpModel");
        // if (data) {
        //   alert("Login successfully!");
        // }
        
      };
    const handleClick = () => {
      localStorage.clear();
      // sendData("");
    };


    const fetchData = async (data:IFormData) => {
      var id=localStorage.getItem("reg_Id");
      const token=localStorage.getItem("token");
      let req:any;
      await fetch(baseUrl+"/ResetLogin", {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
      },
        body: JSON.stringify({ "reg_Id": id,"isSendOTP": false,"sendOTP":data.otp})
    }).then(r=>
      r.json()
      ).then(res=>{
      if(res){
        req = res;
        if(req.status=="200"){
          
        sendData(res);
        }
        
        // this.setState({message:'New Employee is Created Successfully'});
      }
      progressEnd();
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
    <div className="row">
      <div className="col-12">
      <div className="input-group-meta position-relative mb-25">
            <label>OTP*</label>
            <input
              type="text"
              placeholder="Enter OTP"
              minLength={6}
              maxLength={6}
              {...register("otp", { required: `Otp is required!` })}
              name="otp"
            />
           
          </div>
      </div>
     
     
      <div className="col-12">
        <button
          type="submit"
          className="btn-eleven fw-500 tran3s d-block mt-20"
        >
          Send OTP
        </button>
      </div>
    
    </div>
  </form>
  );
};

export default OtpForm;
