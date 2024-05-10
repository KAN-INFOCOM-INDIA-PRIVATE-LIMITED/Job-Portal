import React, { useEffect, useState } from "react";
import NiceSelect from "@/ui/nice-select";
import { baseUrl } from "@/utils/baseurl";
import { IJobType } from "@/types/job-data-type";

type IProps = {
  countryCode:string;
  sendData: (data: any) => void;
}

const StateSelect = ({countryCode,sendData}:IProps) => {
  const handleState = (item: { value: string; label: string }) => {};
  const [states, setStates] = useState([{
    "stateId": 1565,
    "stateName": "Andaman and Nicobar Islands",
    "countryCode": "IN",
    "stateCode": "IN-AN"
}]);

  const handleStateChange = (selectedOption:any) => {
    // setCountries(selectedOption);
    sendData(selectedOption); // Call the callback function
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(baseUrl+'/GetStatesByCountryCode/IN');
        const data = await response.json();
        setStates(data.obj);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  const stateOptions = states.map((state) => ({
    value: state.stateCode,
    label: state.stateName,
  }));
  return (
    <NiceSelect
      options={stateOptions}
      defaultCurrent={0}
      onChange={handleStateChange}
      name="State"
    />
  );
};

export default StateSelect;
