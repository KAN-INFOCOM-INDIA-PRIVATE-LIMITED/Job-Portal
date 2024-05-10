"use client";
import * as Yup from "yup";
import React, { useState } from "react";
import Image from "next/image";
import { Resolver, useForm } from "react-hook-form";
import icon from "@/assets/dashboard/images/icon/icon_22.svg";
import ErrorMsg from "@/app/components/common/error-msg";
import ReLoginForm from "../../forms/re-login-form";

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
const ReLoginModal = ({ sendData }: { sendData: SendDataCallback }) => {
    const [showPass, setShowPass] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
      } = useForm<IFormData>({ resolver });
      // on submit
      const onSubmit = (data: IFormData) => {
        // if (data) {
        //   alert("Login successfully!");
        // }
        
      };
    const handleClick = () => {
      localStorage.clear();
      // sendData("");
    };
  return (
    <div
      className="modal fade"
      id="reloginModal"
      tabIndex={-1}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-fullscreen modal-dialog-centered">
        <div className="container">
          <div className="remove-account-popup text-center modal-content">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
            <Image src={icon} alt="icon" className="lazy-img m-auto" />
            <p>Are you sure to re-login your account?</p>
            
            <div className="form-wrapper m-auto">
                  <ReLoginForm />
                  <div className="d-flex align-items-center mt-30 mb-10">
                    <div className="line"></div>
                    <span className="pe-3 ps-3">OR</span>
                    <div className="line"></div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <a
                        href="#"
                        className="social-use-btn d-flex align-items-center justify-content-center tran3s w-100 mt-10"
                      >
                        {/* <Image src={google} alt="google-img" /> */}
                        <button className="fw-500 text-md h-100 w-100 tran3s search-btn-two"><span className="ps-2">Login with Google</span></button>
                      </a>
                    </div>
                    <div className="col-md-6">
                      <a
                        href="#"
                        className="social-use-btn d-flex align-items-center justify-content-center tran3s w-100 mt-10"
                      >
                        {/* <Image src={facebook} alt="facebook-img" /> */}
                        <span className="ps-2">Login with Facebook</span>
                      </a>
                    </div>
                  </div>
                  <p className="text-center mt-10">
                    Do not have an account?{" "}
                    {/* <Link href="/register" className="fw-500" onClick={closeModal}>
                      Sign up
                    </Link> */}
                  </p>
                </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReLoginModal;
