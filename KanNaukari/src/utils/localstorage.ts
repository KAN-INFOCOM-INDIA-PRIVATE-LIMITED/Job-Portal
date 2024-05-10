import { IJobType } from "@/types/job-data-type";

export const setLocalStorage = (name:string, items:IJobType[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(name, JSON.stringify(items));
  }
}

export const getLocalStorage = (name:string) => {
  if (typeof window !== "undefined") {
    let data;
    // if(name==="userfname"){
    //   data = localStorage.getItem(name)?.toString;
    // }else{
     data = localStorage.getItem(name);
    // }
    // if (data) {
    //   return JSON.parse(data);
    // } else {
    //   localStorage.setItem(name, JSON.stringify([]));
    //   return [];
    // }
  } else {
    return [];
  }
}
