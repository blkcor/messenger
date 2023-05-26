'use client'
import React from 'react';
import Modal from '../../Modal';
import Image from 'next/image';

type ImageModalProps = {
  src: string
  isOpen: boolean,
  onClose: () => void
};

const ImageModal: React.FC<ImageModalProps> = ({
  src,
  isOpen,
  onClose
}) => {

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className='w-80 h-80'>
        <Image
          alt='Image'
          className='object-cover'
          fill
          src={src}
        />
      </div>
    </Modal>
  )
}
export default ImageModal;
