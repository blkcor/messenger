'use client'
import ReactSelect from 'react-select'
import React from 'react';

type SelectProps = {
  disabled?: boolean;
  label:string;
  onChange: (value:Record<string,any>) => void;
  value?:Record<string,any>
  options?:Record<string,any>[]
};  

const Select:React.FC<SelectProps> = ({
  disabled,
  label,
  onChange,
  value,
  options
}) => {
  
  return(
    <div className='z-[100]'>
      <label className='block text-sm font-medium leading-6 text-gray-900'>
        {label}
      </label>
      <div className='mt-2'>
        <ReactSelect
          isDisabled={disabled}
          value={value}
          onChange={onChange}
          isMulti
          options={options}
          menuPortalTarget={document.body}
          styles={{
            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
          }}
          classNames={{
            control:()=> "text-sm"
          }}
        />
      </div>
    </div>
  )
}
export default Select;
