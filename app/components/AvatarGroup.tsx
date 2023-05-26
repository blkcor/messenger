'use client'
import { User } from '@prisma/client';
import Image from 'next/image';
import React from 'react';

type AvatarGroupProps = {
  users:User[]  
};

const AvatarGroup:React.FC<AvatarGroupProps> = ({
  users
}) => {
  const slicedUsers = users.slice(0,4)
  const positionMap = {
    0:"top-0 left-[12px]",
    1:"bottom-0",
    2:"bottom-0 right-0",
    3:"top-0 left-0"
  }
  return (
    <div className='relative h-11 w-11'>
      {slicedUsers.map((user,index)=>{
        return(
          <div 
            key={user.id} 
            className={`absolute inline-block rounded-full overflow-hidden h-[21px] w-[21px] ${positionMap[index as keyof typeof positionMap]}`}>
              <Image 
                alt='Avatar'
                fill
                src={user?.image || "/images/placeholder.svg"}
              />
            </div>
        )
      })}
    </div>
  )
}
export default AvatarGroup;
