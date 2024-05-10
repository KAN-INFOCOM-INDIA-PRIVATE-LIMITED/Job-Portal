import React, { useEffect, useState } from 'react';
import Autocomplete, { AutocompleteChangeDetails, AutocompleteChangeReason } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

type IPropType = {
    options:string[];
    name:string;
    sValue?:any;
    className?:string;
    id?:any;
    menuHeight?:number;
    sendData: (data: string[]) => void;
  }



const JobSearchAutocompleteComponent = ({sValue,options,name,className,id,sendData}:IPropType) => {
    const [selectedValues, setSelectedValues] = useState<string[]>([]);

  

useEffect(() => {

  if(typeof sValue === 'string' && sValue!==""){
  const arr = sValue!.split(',');
  setSelectedValues(arr);
}
}, [sValue]);

const handleAutocompleteChange = (
    event: React.SyntheticEvent,
    values: string[],
    reason: AutocompleteChangeReason
  ) => {
    if (values.length <= 2) {
    setSelectedValues(values);
    sendData(values);
    }
  };
  

  return (
    <Autocomplete
            multiple
            options={options}
            value={selectedValues}
            className={className}
            onChange={handleAutocompleteChange}
            filterOptions={(options: string[], state) => {
                if (selectedValues.length >= 2 && state.inputValue !== '') {
                    return [];
                }
                return options;
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    placeholder={selectedValues.length === 0 ? name : ''}
                    variant="standard"
                    InputProps={{ ...params.InputProps, disableUnderline: true }}
                    style={{ width: '300px' }}
                />
            )}
        />
  );
};

export default JobSearchAutocompleteComponent;