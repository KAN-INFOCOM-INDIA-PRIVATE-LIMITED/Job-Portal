import React, { useEffect, useState } from 'react';
import Autocomplete, { AutocompleteChangeDetails, AutocompleteChangeReason } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/system';
import '@/assets/css/style.css'
import { min } from 'date-fns';

type IPropType = {
    options:string[];
    name:string;
    sValue:any;
    className?:string;
    sendData: (data: any) => void;
  }

const CustomAutocomplete = styled(Autocomplete)({
  // Add custom styles here
});

const AutocompleteComponent = ({sValue,options,name,className,sendData}:IPropType) => {
    const [selectedValues, setSelectedValues] = useState<string[]>([]);

useEffect(() => {
  // Incorrect: Causing an infinite loop
  // setSelectedValues(sValue)
  if(typeof sValue === 'string' && sValue!==""){
  const arr = sValue!.split(',');
  setSelectedValues(arr);
}
}, [sValue]);
//   const options = ['Option 1', 'Option 2', 'Option 3'];

const handleAutocompleteChange = (
    event: React.SyntheticEvent,
    values: string[],
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<string> | undefined
  ) => {
    setSelectedValues(values);
    sendData(values);
  };

  return (
    <Autocomplete
      multiple
      options={options}
      value={selectedValues}
      className={className}
      limitTags={2}
      onChange={handleAutocompleteChange}
      renderInput={(params) => (
        <TextField {...params} label={name} variant="outlined" 
        />
      )}
    />
  );
};

export default AutocompleteComponent;