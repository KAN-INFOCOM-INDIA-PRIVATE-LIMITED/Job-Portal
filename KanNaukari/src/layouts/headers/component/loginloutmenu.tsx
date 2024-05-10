import React, { useState } from "react";
import menu_data from "@/data/menu-data";
import Link from "next/link";
import {getLocalStorage} from "@/utils/localstorage";

interface Props{
  isLogin:boolean
}

const LoginLogoutMenus = (props: Props) => {
  let title1:any;
  let isLoginUser:boolean=false;
  // if (typeof window !== 'undefined') {
   title1 = localStorage.getItem("userfname")?.toString();
   if(title1!=null){
   title1=title1.replace(/['"]+/g, '');
   isLoginUser=true
  // }
  }
 
  // const title1=getLocalStorage("userfname").toString;
    return (
    <>
    {(isLoginUser==false) ? 
    <li>
    <a
      href="#"
      className="login-btn login-btn-one"
      data-bs-toggle="modal"
      data-bs-target="#loginModal"
    >
      Login
    </a>
  </li>
    : <li className="nav-item dropdown">
    <a
    className="dropdown-toggle login-btn login-btn-one"
// className="nav-link dropdown-toggle"
href="#"
// role="button"
data-bs-toggle="dropdown"
data-bs-auto-close="outside"
aria-expanded="false"
>
{title1}
</a>
<ul className="dropdown-menu">

  <li>
  <Link href="/dashboard/candidate-dashboard" className="dropdown-item">
      <span>Profile</span>
    </Link>
  </li>
  {/* <li>
   
      <Link href="/" className="dropdown-item">
      <span>Gaurav</span>
    </Link>
  </li>
  <li>
   
  <Link href="/" className="dropdown-item">
      <span>Yogesh</span>
    </Link>
  </li>
  <li>
   
  <Link href="/" className="dropdown-item">
      <span>Bhushan</span>
    </Link>
  </li> */}
  <li>
   
  {/* <Link href="/" className="dropdown-item"> */}
  <a
      href="#"
      className="dropdown-item"
      data-bs-toggle="modal"
      data-bs-target="#deleteModal"
    >
      Logout
    </a>
    {/* </Link> */}
  </li>

</ul>
</li>
      
    }
        
    </>
  );
};

export default LoginLogoutMenus;
