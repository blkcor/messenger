'use client'
import React from 'react';
import useActiveChannel from '../hooks/useActiveChannel';

type ActiveStatusProps = {

};

const ActiveStatus: React.FC<ActiveStatusProps> = () => {
  useActiveChannel();
  return null
}
export default ActiveStatus;
