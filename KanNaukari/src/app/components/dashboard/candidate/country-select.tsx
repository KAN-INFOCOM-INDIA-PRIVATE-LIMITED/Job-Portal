import NiceSelect from "@/ui/nice-select";
import { baseUrl } from "@/utils/baseurl";
import { string } from "prop-types";
import React, { useEffect, useState } from "react";

const CountrySelect = ({ onSelect }:any) => {
  const [countries, setCountries] = useState([{
    "id": 1,
    "code": "IN",
    "name": "India"
}]);
const handleCountryChange = (selectedOption:any) => {
  // setCountries(selectedOption);
  onSelect(selectedOption); // Call the callback function
};

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(baseUrl+'/GetAllCountry');
  //       const data = await response.json();
  //       setCountries(data.obj);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);
  const countryOptions = countries.map((country) => ({
    value: country.code,
    label: country.name,
  }));

  return (
    <NiceSelect
      options={countryOptions}
      defaultCurrent={0}
      // onChange={(item) => handleCountryChange(item)}
      onChange={handleCountryChange}
      name="Country"
    />
  );
};

export default CountrySelect;
