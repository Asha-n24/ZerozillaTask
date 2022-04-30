import React from 'react'
import './notification.css'
import 'antd/dist/antd.css'
import { Modal } from 'antd'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { BiCheck } from 'react-icons/bi'
import { AiOutlineExclamation, AiOutlineClose } from 'react-icons/ai'

export const AddNotification = ({
  variant = 'info',
  visible,
  onClose,
  message,
  
}) => {

  
  if (visible) {
    setTimeout(() => {
      onClose();
    }, 1500);
  }
  return (
    <>
      <Modal
        centered
        wrapClassName="Notification-modal"
        title="Info"
        visible={visible}
        keyboard={true}
        onOk={onClose}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ size: 'large', style: { opacity: '0.63',display: 'none' } }}
      >
        {variant === 'info' && (
          <p className="text-center info-icon">
            <AiOutlineInfoCircle style={{ fontSize: '72px' }} />
          </p>
        )}
        {variant === 'success' && (
          <p className="text-center  ">
            <BiCheck className="success-icon" style={{ fontSize: '72px' }} />
          </p>
        )}
        {variant === 'warning' && (
          <p className="text-center  ">
            <AiOutlineExclamation
              className="warning-icon"
              style={{ fontSize: '72px' }}
            />
          </p>
        )}
        {variant === 'error' && (
          <p className="text-center  ">
            <AiOutlineClose
              className="error-icon"
              style={{ fontSize: '72px' }}
            />
          </p>
        )}
        <p className="text-center notification-message mt-4">{message}</p>
      </Modal>
    </>
  )
}
