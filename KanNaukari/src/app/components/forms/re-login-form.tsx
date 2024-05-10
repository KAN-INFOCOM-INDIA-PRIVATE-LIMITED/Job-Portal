"use client";
import * as Yup from "yup";
import React, { useState } from "react";
import Image from "next/image";
import { Resolver, useForm } from "react-hook-form";
import icon from "@/assets/dashboard/images/icon/icon_22.svg";
import ErrorMsg from "@/app/components/common/error-msg";
import { baseUrl } from "@/utils/baseurl";
import { progressEnd, progressStart } from "@/utils/progress";
import { data } from "jquery";


  type SendDataCallback = (data: any) => void;
const ReLoginForm = () => {
    const [showPass, setShowPass] = useState<boolean>(false);
    var id=localStorage.getItem("reg_Id");

  
      const onSubmit = () => {
        progressStart();
        // fetchData(Request,Response);
        // sendData("reLoginForm");
        
        // if (data) {
        //   alert("Login successfully!");
        // }
        
      };

      // const fetchData = async (req,res) => {
      //   // let req:any;
      //   let id=localStorage.getItem("reg_Id");
      //   const token=localStorage.getItem("token");

      //   try {
      //     // Your API endpoint URL
      //     const apiUrl = baseUrl+"/ResetLogin";
    
      //     // Your headers
      //     const headers = {
      //       'Content-Type': 'application/json',
      //       'Authorization': 'Bearer '+token, // Add your authorization header if needed
      //     };
    
      //     // Your POST request data
      //     const postData = {
      //       "reg_Id":id,
      //       "isSendOTP": true,
      //     };
    
      //     // Make the POST request
      //     const response = await fetch(apiUrl, {
      //       method: 'POST',
      //       headers: headers,
      //       body: JSON.stringify(postData),
      //     });
    
      //     // Check if the request was successful
      //     if (response.ok) {
      //       const data = await response.json();
      //       console.log("data: "+data);
           
      //     } else {
      //       const errorData = await response.json();
      //       console.log("error: "+errorData);
      //     }
      //   } catch (error) {
      //     console.error('Error making POST request:', error);
          
      //   }

        
      //   await fetch(baseUrl+"/ResetLogin", {
      //     method: 'POST',
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //       'Access-Control-Allow-Origin': '*',
      //       'Content-Type': 'application/json'
      //   },
      //     body: JSON.stringify({
      //       "reg_Id":id,
      //       "isSendOTP": true
      //     })
      // })
      // .then(r=>{
      //   r.json();
      //   console.log(JSON.stringify(r.json));
      //   // sendData("2");
      // }
        
      //   )
      //   .then(data =>{
      //     sendData("2");
      //     console.log(data);
      //   }
           
      //      )    
      //       .catch(error => 
      //         console.log("Error detected: " + error)
      //         )
      //   .then(res=>{
      //   if(res){
      //     req = res;
      //     if(req.status=="200"){
            
      //     sendData(res);
      //     }
          
      //     // this.setState({message:'New Employee is Created Successfully'});
      //   }
      //   progressEnd();
      // })
      // ;
    // };
  return (
    <form onSubmit={onSubmit} className="mt-10">
    <div className="row">
      <div className="col-12">
      <div className="text-center"> 
                <h2>Are you sure to Re Login?</h2>
                <div className="col-12">
        <button
          type="submit"
          className="btn-eleven fw-500 tran3s d-block mt-20"
        >
          Yes
        </button>
      </div>
                
              </div>
      </div>
     
     
      
    
    </div>
  </form>
  );
};

export default ReLoginForm;
