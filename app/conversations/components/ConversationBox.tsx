'use client'
import { FullConversation } from '@/app/types';
import { useRouter } from 'next/navigation';
import React, { useCallback, useMemo } from 'react';
import {format} from 'date-fns'
import { useSession } from 'next-auth/react';
import clsx from 'clsx';
import useOtherUser from '@/app/hooks/useOtherUser';
import Avatar from '@/app/components/Avatar';


type ConversationBoxProps = {
  data:FullConversation,
  selected:boolean
};

const ConversationBox:React.FC<ConversationBoxProps> = ({
  data,
  selected
}) => {
  const router = useRouter()
  const session = useSession()
  const otherUser =  useOtherUser(data)

  const handleClick = useCallback(()=>{
    router.push(`/conversations/${data.id}`)
  },[data.id,router])

  const lastMessage = useMemo(()=>{
    const messages = data.messages || []

    return messages[messages.length - 1]
  },[data.messages])

  const userEmail = useMemo(() => {
    return session?.data?.user?.email
  }, [session?.data?.user?.email])

  const hasSeen = useMemo(()=>{
    if(!lastMessage) return false

    const seenArray = lastMessage.seen || []

    if(!userEmail) return false

    return seenArray.filter((item)=>{
      return item.email === userEmail
    }).length !==0
    
  },[lastMessage,userEmail])
  
  const lastMessageText = useMemo(()=>{
    //if the last message is an image
    if(lastMessage?.image){
      return "Send an image"
    }
    if(lastMessage?.body){
      return lastMessage?.body
    }
    return "Start a conversation"
  },[lastMessage])

  return(
    <div 
    onClick={handleClick}
    className={clsx(`
      w-full
      relative
      flex
      items-center
      space-x-3
      hover:bg-neutral-100
      rounded-lg
      trasition
      cursor-pointer
      p-3
    `,
    selected ? "bg-neutral-100" : "bg-white"
    )}>
        <Avatar user={otherUser} />
        <div className='min-w-0 flex-1'>
          <div className='focus-outline-none'>
            <div className='flex justify-between items-center mb-1'>
              <p className='text-md font-medium text-gray-900'>
                {data.name || otherUser?.name}
              </p>
              {lastMessage?.createAt && (
                <p className='text-xs text-gray-400 font-light'>
                  {format(new Date(lastMessage?.createAt), "p")}
                </p> 
              )}
            </div>
            <p className={clsx(`
              truncate
              text-sm
            `,
                hasSeen? "text-gray-500" : 'text-black font-medium'
            )}>
              {lastMessageText}
            </p>
          </div>
        </div>
    </div>
  )
}
export default ConversationBox;
