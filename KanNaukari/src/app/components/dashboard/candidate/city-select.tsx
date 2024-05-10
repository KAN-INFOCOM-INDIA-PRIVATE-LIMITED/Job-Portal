import NiceSelect from "@/ui/nice-select";
import { baseUrl } from "@/utils/baseurl";
import { stat } from "fs";
import React, { useEffect, useState } from "react";

type IProps = {
  stateCode:string;
  sendData: (data: any) => void;
}

const citySelect: React.FC<IProps>  = ({stateCode,sendData}) => {
  // const handlecity = (item: { value: string; label: string }) => {};
  let state="";
  const [city, setCity] = useState([
    {
   "id": 0,
            "cityName": "Select City",
            "countryCode": "",
            "stateCode": ""
}
]);

// if(stateCode!=null || stateCode!=""){
useEffect(() => {
  const fetchData = async () => {
    const url =(baseUrl+'/GetCitiesByStateCode/'+state);
    try {
      const response = await fetch(url);
      // const response = await fetch("https://kaninfos.com/KANNaukriAPI/GetCitiesByStateCode/IN-MH");
      const data = await response.json();
      setCity(data.obj);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  if(stateCode!=null || stateCode!=""){
    state=stateCode;
  fetchData();
  }
  
}, [stateCode]); 

  
// }
  const handlecityChange = (selectedOption:any) => {
    // setCountries(selectedOption);
    sendData(selectedOption); // Call the callback function
  };

  const cityOptions = city.map((city) => ({
    value: city.cityName,
    label: city.cityName,
  }));
  return (
    <NiceSelect
      options={cityOptions}
      defaultCurrent={0}
      onChange={handlecityChange}
      name="city"
    />
  );
};

export default citySelect;
