import React, { useState } from 'react';
import slugify from 'slugify';
import job_data from '@/data/job-data';
import NiceSelect from '@/ui/nice-select';
import { useAppDispatch } from "@/redux/hook";
import { setLocation } from '@/redux/features/filterSlice';
import { IJobType } from '@/types/job-data-type';
import { data } from 'jquery';
import Select from 'react-select';
import '@/assets/css/style.css';
// import 'react-select/dist/react-select.css';

type IProps = {
  filterItem:IJobType[];
  sendData: (data: any) => void;
}
type Option = {
  value: string;
  label: string;
};

const JobLocations = ({filterItem,sendData}:IProps) => {
  const uniqueLocations = filterItem ? [...new Set(filterItem.map(job => job.city))] : [];
  const [open, setOpen] = useState(false);
  // const uniqueLocations = [
  //   // "Mumbai","Bangalore","Chennai","Dubai","Pakistan"

  //   // ...new Set(filterItem!.map(job => job.city!))
  //   ...new Set(filterItem!.map(job => job.city!))
  // ];
  const dispatch = useAppDispatch();
  const handleLocation = (a:any) => { 
    dispatch(setLocation(a.target.value));
    const loc={ "from": "location","value": a.target.value};

    sendData(loc);
  };
  const options = uniqueLocations.map((l) => {
    if (l) {
      const label = typeof l === 'string' ? l : '';
      return { value: slugify(l.split(',').join('-').toLowerCase(), '-'), label };
    }
  }).filter(Boolean) as Option[];
  // const options = uniqueLocations.map((l) => {
  //   if(l){
  //     const label = typeof l === 'string' ? l : '';
  //     return {value:slugify(l!.split(',').join('-').toLowerCase(),'-'),label:l}
  //   }
    
  // })
  return (
    // <NiceSelect
    //   options={options}
    //   defaultCurrent={0}
    //   onChange={(item) => handleLocation(item)}
    //   name="Location"
    // />
    <select placeholder='Select Location' onChange={handleLocation}  className={`nice-select `} style={{width:'100%'}}>
      <option value="" >Select Location</option>
      {options.map((option, index) => (
        <option key={index} value={option?.label} >
          {option?.label}
        </option>
      ))}
    </select>
    
    // <Select
    //   options={options}
    //   placeholder='Select Location'
    //   onChange={(item) => handleLocation(item)}
    //   name="Location"    />
  );
};

export default JobLocations;