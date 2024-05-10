import { baseUrl } from "./baseurl";
import { notifyError, notifySuccess } from "@/utils/toast";
import { progressEnd, progressStart } from "@/utils/progress";
import { any } from "core-js/fn/promise";

const axios = require('axios');
 const apiOperation=(data:any,header:any,url:string,router:any)=>{
    
    let res;
   
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: baseUrl+url,
        headers: header,
        data : data
      };
    
    axios.request(config)
    .then((response:any) => {
        res=response;
      if(response.status==200){
        notifySuccess(response.data.message);
        progressEnd();
        return response;
        
      }else if(response.message=="Unauthorized"){
        progressEnd();
          localStorage.clear();
          router.push("/");
      }
      return response;
      // console.log(JSON.stringify(response.data));
    })
    .catch((error:any) => {
      // console.log(error);
      notifyError(error);
      progressEnd();
    });
    
    
  }

  export {apiOperation};