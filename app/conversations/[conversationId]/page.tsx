import getConversationById from '@/app/actions/getConversationById';
import getMessages from '@/app/actions/getMessages';
import EmptyState from '@/app/components/EmptyState';
import React from 'react';
import Header from './components/Header';
import Body from './components/Body';
import Form from './components/Form';

interface IParams{
  conversationId:string
}

const ConversationId = async ({params}:{
  params:IParams
})=>{
  const conversation = await getConversationById(params.conversationId);
  const message = await getMessages(params.conversationId);
  return(
    <div className='lg:pl-80 h-full'>
      <div className='h-full flex flex-col'>
        <Header conversation={conversation!} />
        <Body />
        <Form />
      </div>
    </div>
  )
} 

export default ConversationId;
