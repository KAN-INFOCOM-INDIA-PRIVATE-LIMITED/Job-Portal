import React from "react";
import Image from "next/image";
// import icon from "@/assets/dashboard/images/icon/icon_22.svg";
import icon from "@/assets/dashboard/images/icon/delete.svg";
import Link from "next/link";



const DeleteModal = () => {
  const handleClick = () => {
    localStorage.clear();
    // sendData("");
  };
  return (
    <div
      className="modal fade"
      id="deleteModal1"
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
            <Image src={icon} alt="icon" width={30} height={30} className="lazy-img m-auto" />
            <h2>Are you sure to delete your account ?</h2>
            {/* <p>Are you sure to logout from your account?</p> */}
            <div className="button-group d-inline-flex justify-content-center align-items-center pt-15">
              {/* <Link href="/"> */}
              <a href="/" onClick={(e) => handleClick()} className="confirm-btn fw-500 tran3s me-3">
                Yes
              </a>
              {/* </Link> */}
              <button
                type="button"
                className="btn-close fw-500 ms-3"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
