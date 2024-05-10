import React from 'react';

type IProps={
  options:any,
  defaultValue:any,
  onSelect:any
}

const SelectDropdown = ({ options, defaultValue, onSelect }:IProps) => {
  const handleSelectChange = (e:any) => {
    const selectedValue = e.target.value;
    onSelect(selectedValue);
  };

  return (
    <select defaultValue={defaultValue} onChange={handleSelectChange} className='dash-input-wrapper mb-30'>
      {options.map((option:any, index:any) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectDropdown;