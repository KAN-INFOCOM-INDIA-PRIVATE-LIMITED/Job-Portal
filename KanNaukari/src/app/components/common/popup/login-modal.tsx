import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import LoginForm from "../../forms/login-form";
import ReLoginForm from "../../forms/re-login-form";
import google from "@/assets/images/icon/google.png";
import facebook from "@/assets/images/icon/facebook.png";
import $ from "jquery";
import ReLoginModal from "@/app/components/common/popup/re-login-modal";
import * as bootstrap from "bootstrap";
import { redirect, useRouter } from "next/navigation";
import icon from "@/assets/dashboard/images/icon/icon_22.svg";
type SendDataCallback = (data: any) => void;
import { progressStart, progressEnd } from "@/utils/progress";
import OtpForm from "../../forms/otp-form";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import ReactDom from "react-dom";
import { Modal } from "bootstrap";
import { baseUrl } from "@/utils/baseurl";

const LoginModal = ({ SendData }: { SendData: SendDataCallback }) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showModal, setCount] = useState<string>("0");
  const [showReLoginModal, setShowReLoginModal] = useState(true);
  const modalRef = useRef<HTMLDivElement>(null);
  let data1: any;
  const clickEvent = new Event("click", {
    bubbles: true,
    cancelable: true,
  });
  function dismissModal(id: string) {
    const modalElement = document.getElementById(id); // Replace with your actual modal ID

    if (modalElement) {
      const bootstrapModal = new bootstrap.Modal(modalElement);
      bootstrapModal.hide();
    }
  }
  const handleClick = () => {
    // $("#loginModal").modal("hide");
    // $("[data-bs-dismiss=modal]").trigger({ type: "click" });

    setCount("2");
  };
  const closeModal = () => {
    // progressStart();
    // $("[data-bs-dismiss=modal]").trigger({ type: "click" });
    // dismissModal("loginModal");
    const dismissButton = $("[data-bs-dismiss=modal]");

      const clickEvent = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      });

      dismissButton[0].dispatchEvent(clickEvent);
      router.refresh();
  };
  const handleDataReceive = (data: any) => {
    // console.log("Data received from child:", data);
    if (data) {
      if (data.message == "User Already Login") {
        setCount("1");
        // data1=data;
        // redirect
      } else {
        SendData(data);
        const dismissButton = $("[data-bs-dismiss=modal]");

        const clickEvent = new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
          view: window,
        });

        dismissButton[0].dispatchEvent(clickEvent);
        router.refresh();

        // $("[data-bs-dismiss=modal]").trigger({ type: "click" });
        // dismissModal("loginModal")
        router.push("/");

        // $("#loginModal").modal("hide");
      }
    }
    // Do something with the received data in the parent component
  };

  const handleReLoginDataReceive = (data: any) => {
    // console.log("Data received from child:", data);
    if (data) {
      // if(data=="2"){
      setCount("2");
      // }
    }
    // Do something with the received data in the parent component
  };

  const handleOTPDataReceive = (data: any) => {
    // console.log("Data received from child:", data);
    if (data) {
      // $("[data-bs-dismiss=modal]").trigger({ type: "click" });
      // $("[data-bs-dismiss=modal]").trigger({ type: "click" });
      closeModal();

      // router.push("/home-4");

      // SendData(data);
    }
    // Do something with the received data in the parent component
  };

  const handleReload = () => {
    setCount("5");
    // localStorage.clear();
    // SendData("");
    // router.refresh();
  };

  return (
    <>
      {showModal === "0" ? (
        <div>
          <Head>
            <script
              src="https://code.jquery.com/jquery-3.6.0.min.js"
              integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
              crossOrigin="anonymous"
            ></script>
          </Head>
          {/* {showModal && ( */}

          <div
            className="modal fade"
            id="loginModal"
            tabIndex={-1}
            ref={modalRef}
            aria-hidden="true"
          >
            <div className="modal-dialog modal-fullscreen modal-dialog-centered">
              <div className="container">
                <div className="user-data-form modal-content">
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    id="closeModal"
                  ></button>
                  <div className="text-center">
                    <h2>Hi, Welcome Back!</h2>
                    <p>
                      Still do not have an account?{" "}
                      <Link href="/register">Sign up</Link>
                    </p>
                  </div>
                  <div className="form-wrapper m-auto">
                    <LoginForm sendData={handleDataReceive} />
                    {/* <div className="d-flex align-items-center mt-30 mb-10">
                    <div className="line"></div>
                    <span className="pe-3 ps-3">OR</span>
                    <div className="line"></div>
                  </div> */}
                    {/* <div className="row">
                    <div className="col-md-6">
                      <a
                        href="#"
                        className="social-use-btn d-flex align-items-center justify-content-center tran3s w-100 mt-10"
                      >
                        <Image src={google} alt="google-img" />
                        <button className="fw-500 text-md h-100 w-100 tran3s search-btn-two"><span className="ps-2">Login with Google</span></button>
                      </a>
                    </div>
                    <div className="col-md-6">
                      <a
                        href="#"
                        className="social-use-btn d-flex align-items-center justify-content-center tran3s w-100 mt-10"
                      >
                        <Image src={facebook} alt="facebook-img" />
                        <span className="ps-2">Login with Facebook</span>
                      </a>
                    </div>
                  </div> */}
                    <p className="text-center mt-10">
                      Do not have an account?{" "}
                      <Link
                        href="/register"
                        className="fw-500"
                        onClick={closeModal}
                      >
                        Sign up
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* )} */}
        </div>
      ) : showModal === "1" ? (
        <div>
          {/* {showModal && ( */}

          <div
            className="modal fade"
            id="ReloginModal"
            tabIndex={-1}
            aria-hidden="true"
          >
            <div className="modal-dialog modal-fullscreen modal-dialog-centered">
              <div className="container">
                <div className="user-data-form modal-content">
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                  <ReLoginForm />
                </div>
              </div>
            </div>
          </div>

          {/* )} */}
        </div>
      ) : showModal === "2" ? (
        <div>
          {/* {showModal && ( */}

          <div
            className="modal fade"
            id="otpModal"
            tabIndex={-1}
            aria-hidden="true"
          >
            <div className="modal-dialog modal-fullscreen modal-dialog-centered">
              <div className="container">
                <div className="user-data-form modal-content">
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>

                  <div className="form-wrapper m-auto">
                    <OtpForm sendData={handleOTPDataReceive} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* )} */}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default LoginModal;
