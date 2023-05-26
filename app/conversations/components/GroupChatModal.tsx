'use client'
import { User } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import Modal from '../Modal';
import Input from '@/app/components/inputs/Input';
import Select from '@/app/components/inputs/Select';
import Button from '@/app/components/Button';

type GroupChatModalProps = {
  isOpen?:boolean,
  onClose:()=>void,
  users?:User[]
};
const GroupChatModal:React.FC<GroupChatModalProps> = ({

  isOpen,
  onClose,
  users
}) => {
  const router = useRouter()
  const [isLoading,setIsLoading] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues:{
      name:"",
      members:[]
    }
  })

  const members = watch('members')

  const onSubmit :SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true)
    axios.post("/api/conversations",{
      ...data,
      isGroup:true,
    }).then(()=>{
      router.refresh()
      onClose()
    }).catch(()=>{
      toast.error('Something went wrong')
    }).finally(()=>setIsLoading(false))
  }
  return(
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='space-y-12'>
          <div className='border-b border-gray-900/10 pb-12'>
            <h2 className='text-base font-semibold leadig-7 text-gray-700'>
              Create a group chat
            </h2>
            <p className='mt-1 text-sm leading-6 text-gray-600'>
              Create a chat with more than 2 people.
            </p>
            <div className='mt-10 flex flex-col gap-y-8'>
              <Input 
                register={register} 
                label='Name'
                id='name'
                disabled={isLoading}
                required
                errors={errors}
              />
              <Select 
                label='Members'
                disabled={isLoading}
                value={members}
                options={users?.map(user=>({
                  label:user.name,
                  value:user.id,
                }))}
                onChange={(value)=>{
                  setValue('members',value,{
                    shouldValidate: true,
                  })
                }}
              />
            </div>
          </div>
        </div>
        <div className='mt-6 flex items-center justify-end gap-x-6'>
          <Button
            disabled={isLoading}
            secondary
            onClick={onClose}
            type="button"
          >
            Cancel
          </Button>
          <Button
            disabled={isLoading}
            type='submit'
          >
            Confirm
          </Button>
        </div>
      </form>
    </Modal>
  )
}
export default GroupChatModal;
