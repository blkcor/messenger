'use client'
import clsx from 'clsx';
import React from 'react';
import { IconType } from 'react-icons';
import Link from 'next/link';

type MobileItemProps = {
  href:string;
  icon:IconType;
  label:string;
  active?:boolean;
  onClick?:()=>void
};

const MobileItem:React.FC<MobileItemProps> = ({
  href,
  icon:Icon,
  label,
  active,
  onClick
}) => {
  const handleClick = ()=>{
    if(onClick) return onClick()
  }

  return(
    <Link onClick={handleClick} href={href}
      className={clsx(`
          group
          flex
          gap-x-3
          text-xl
          leading-6
          font-semibold
          w-full
          justify-center
          p-4
          text-gray-500
          hover:text-black
          hover:bg-gray-100
        `,
          active && 'bg-gray-100 text-black'
        )}>
      <Icon className='h-6 w-6'/>
    </Link>
  ) 
}
export default MobileItem;
