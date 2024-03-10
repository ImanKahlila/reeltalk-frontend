import React from 'react';
import { Modal } from 'antd';

import { CloseOutlined } from '@ant-design/icons';

interface SuccessModalProps {
  visible: boolean;
  onClose: () => void;
}

const CustomHeader: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className='flex flex-col items-center justify-between bg-[#464646] '>
    <div className=' w-full'>
      <CloseOutlined
        onClick={onClose}
        className='h-[10px] w-[10px] cursor-pointer text-xl text-high-emphasis'
      />
    </div>
    <div className=' h-[46px] w-[85%]'>
      <h1 className='text-m text-center text-primary'>Thank you for joining the waitlist</h1>
    </div>
  </div>
);

const SuccessModal: React.FC<SuccessModalProps> = ({ visible, onClose }) => {
  return (
    <Modal
      visible={visible}
      onCancel={onClose}
      title={<CustomHeader onClose={onClose} />}
      closeIcon={null}
      footer={null}
      centered
      width={257}
      wrapClassName='modal-bg'
      bodyStyle={{
        textAlign: 'center',
        backgroundColor: '#464646',
        height: '100px',
        display: 'flex',
        alignItems: 'center',
      }}
      className='bg-third-surface'
    >
      <div className='flex justify-center'>
        <div className='flex w-[75%] justify-center'>
          <p className='text-center text-xs text-high-emphasis'>
            We will notify you when the product is launched!
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default SuccessModal;
