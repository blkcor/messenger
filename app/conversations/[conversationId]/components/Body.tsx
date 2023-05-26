'use client'
import useConversation from '@/app/hooks/useConversation';
import { FullMessage } from '@/app/types';
import React, { useEffect, useRef, useState } from 'react';
import MessageBox from './MessageBox';
import axios from 'axios';
import { pusherClient } from '@/app/libs/pusher';
import { find } from 'lodash';

type BodyProps = {
  initialMessages: FullMessage[]
};

const Body: React.FC<BodyProps> = ({ initialMessages }) => {

  const [messages, setMessages] = useState(initialMessages)
  const bottomRef = useRef<HTMLDivElement>(null)

  const { conversationId } = useConversation()

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`)
  }, [conversationId])

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`)

    pusherClient.subscribe(conversationId);
    bottomRef?.current?.scrollIntoView({ behavior: 'smooth' })

    const messageHandler = (message: FullMessage) => {
      setMessages((current) => {
        if (find(current, { id: message.id })) {
          return current
        }
        return [...current, message]
      })
      //TODO:different
      bottomRef?.current?.scrollIntoView({ behavior: 'smooth' })
    }

    const updateMessageHandler = (newMessage: FullMessage) => {
      setMessages((current) => current.map((currentMessage) => {
        if (currentMessage.id === newMessage.id) {
          return newMessage
        }
        return currentMessage
      }))
    }

    pusherClient.bind('message:new', messageHandler)
    pusherClient.bind('message:update', updateMessageHandler)
    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind('message:new', messageHandler)
      pusherClient.unbind('message:update', updateMessageHandler)
    }
  }, [conversationId])
  return (
    <div className='flex-1 overflow-y-auto'>
      {
        messages.map((message, i) => {
          return (
            <MessageBox
              key={message.id}
              data={message}
              isLast={i === messages.length - 1} />
          )
        })
      }
      <div ref={bottomRef} className='pt-24' />
    </div>
  )
}
export default Body;
