"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Menus from "./component/menus";
import LoginLogoutMenus from "./component/loginloutmenu";
import CategoryDropdown from "./component/category-dropdown";
import LoginModal from "@/app/components/common/popup/login-modal";
import LogoutModal from "@/app/components/common/popup/logout-modal";
import useSticky from "@/hooks/use-sticky";
import { data } from "jquery";

interface Props {
  value: string
}

const HeaderFour = (props: Props) => {
  const { sticky } = useSticky();
  const [showLoginLogoutModal,setLoginLogoutModal]=useState(false);
  const [showPostModal,setPostModal]=useState(false);
  let isLoginUser:boolean=false;
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLogoShown, setIsLogoShown] = useState(false);
  let title1:any;
  // const os = require( 'os' );
  // var mac_ip = os.networkInterfaces()['en3'][3]['mac'];
  // console.log('ip_test: ', mac_ip);
  useEffect(()=>{
   
    const fetchData = async () => {
      if((localStorage.getItem("userRole")!=null)){
        if((localStorage.getItem("userRole")=='2') || (localStorage.getItem("userRole")=='1')){
          setPostModal(true);
          }else{
            setPostModal(false);
          }
          setLoginLogoutModal(true);
      }else{
        setPostModal(false);
        setLoginLogoutModal(false);
      }
    }
    fetchData()
  }, [])
  title1 = localStorage.getItem("userfname")?.toString();
   if(title1!=null){
   title1=title1.replace(/['"]+/g, '');
   isLoginUser=true
  // }
  }
  const HandleRecievedData = (data: any) => {
    if(data!=""){
     
      if((localStorage.getItem("userRole")=='2') || (localStorage.getItem("userRole")=='1')){
      setPostModal(true);
      }else{
        setPostModal(false);
      }
      localStorage.setItem("userfname",data.obj.name);
      setLoginLogoutModal(true);
    // console.log(data);
  }
}

const toggleNav = () => {
  setIsNavOpen(!isNavOpen);
  setIsLoginOpen(!isLoginOpen);
};
useEffect(() => {
  const handleResize = () => {
    const isMobile = window.innerWidth < 768;
    // setIsLoginOpen(isMobile);
    // setIsNavOpen(isMobile);
    setIsLogoShown(isMobile);
  };
  window.addEventListener('resize', handleResize);
  handleResize(); // Set initial state
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);
  return (
    <>
      {/* <header className={`theme-main-menu menu-overlay menu-style-one sticky-menu ${sticky ? 'fixed' : ''}${props.value === 'Profile' ? ' fixed' : ''}`}>
       */}
       {/* <header className={`theme-main-menu menu-overlay menu-style-one sticky-menu ${sticky ? 'fixed' : ''}${props.value === 'Profile' ? ' fixed' : ''}`}> */}
       <header className={`theme-main-menu menu-overlay sticky-menu fixed`}>
        <div className="inner-content position-relative">
          <div className="top-header">
            <div className="d-flex align-items-center">
            {/* <div className={`${!showPostModal ? 'row' : ''} d-flex align-items-center `}> */}
              {/* <div className="logo order-lg-0"> */}
              
            
              <div className={`${!showPostModal ? 'col-3' : ''} logo order-lg-0 `}>
              {!isLogoShown && (
                <Link href="/" className="d-flex align-items-center">
                  {/* <Image src={logo} alt="logo" priority /> */}
                  <Image src="https://kaninfos.com/Images/logo/logo%20(3).png" width={119} height={42} alt="logo" priority />
                </Link>
                )}
              </div>
            
             
              <nav className={`${!showPostModal ? 'col-9' : ''} navbar navbar-expand-lg p0 ms-lg-5 ms-3 order-lg-2 `}>
                <button
                  className="navbar-toggler d-block d-lg-none"
                  type="button"
                  // data-bs-toggle="collapse"
                  // data-bs-target="#navbarNav"
                  // aria-controls="navbarNav"
                  onClick={toggleNav}
                  aria-expanded={isNavOpen ? 'true' : 'false'}
                  aria-label="Toggle navigation"
                  style={{marginLeft:'80%'}}
                >
                  <span></span>
                </button>
                <div className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`} id="navbarNav">
                  <ul className="navbar-nav align-items-lg-center">
                    <li className="d-block d-lg-none">
                      <div className="logo">
                        <Link href="/" className="d-block">
                          <Image src="https://kaninfos.com/Images/logo/logo%20(3).png" alt="logo" width={119} height={42} priority  />
                        </Link>
                      </div>
                    </li>
                    {isLoginOpen?
                    <ul>
                      <li>
                      {(isLoginUser==false) ? <a
                              href="#"
                              className="login-btn login-btn-one"
                              data-bs-toggle="modal"
                              data-bs-target="#loginModal"
                              style={{color:'#fff'}}
                            >
                              Login
                            </a>:<a
                            
                          className="nav-link"
                          href="#"
                          style={{color:'#fff'}}
                          >
                          {title1}
                          </a>}
                      </li>
                      <li key={1}>
                      <a
                            
                            className="nav-link "
                            href="/"
                            style={{color:'#fff'}}
                            >
                          <span>Home</span>
                        </a>
                      </li>
                      <li key={2}>
                      <a href="/dashboard/candidate-dashboard" className="nav-link" style={{color:'#fff'}}>
                          <span>Profile</span>
                        </a>
                      </li>
                      
                      <li key={3}>
                      <a
                            
                            className="nav-link "
                            href="/job-list-v1"
                            style={{color:'#fff'}}
                            >
                          <span>Job</span>
                        </a>
                      </li>
                      <li key={5}>
                      <a
                            
                            className="nav-link "
                            href="/contact"
                            style={{color:'#fff'}}
                            >
                          <span>Contact</span>
                        </a>
                      </li>
                      {(isLoginUser) ?
                      <li>
                      <a
                          href="#"
                          className="nav-link "
                          data-bs-toggle="modal"
                          data-bs-target="#deleteModal"
                          style={{color:'#fff'}}
                        >
                          Logout
                        </a>
                      </li>:""}
                    </ul>
                    :""}
                   
                    {!isLoginOpen?<Menus value={showPostModal}/>:""}
                  
                  </ul>
                </div>
                <div className={`${!showPostModal ? 'col-2 ms-auto ' : ' head-margin-left '} right-widget order-lg-3 `} style={{marginRight:'4%'}}>
                <ul className="d-flex align-items-center style-none">
                  { showPostModal ? <>
                    <li className="d-none d-md-block">
                      <Link href="/register" className="job-post-btn tran3s">
                        Post Job
                      </Link>
                    </li></>
                  :""
                  }
                  
                <div className="collapse navbar-collapse" id="navbarNav10">
                  <ul className="navbar-nav align-items-lg-center">
                    <LoginLogoutMenus isLogin={showLoginLogoutModal}/>
                  </ul>
                </div>
                  {/* <li>
                    <a
                      href="#"
                      className="login-btn login-btn-one"
                      data-bs-toggle="modal"
                      data-bs-target="#loginModal"
                    >
                      Login
                    </a>
                  </li> */}
                  { showPostModal ? <>
                  <li className="d-none d-md-block ms-4">
                    <Link href="/candidates-v1" className="btn-one">
                      Hire Top Talents
                    </Link>
                  </li></>:""}
                </ul>
              </div>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* login modal start */}
      <LoginModal SendData={HandleRecievedData} />
      <LogoutModal />
      {/* login modal end */}
    </>
  );
};

export default HeaderFour;

