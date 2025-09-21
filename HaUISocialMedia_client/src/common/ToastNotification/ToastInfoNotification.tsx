import React, { useState, useEffect, memo } from 'react';
import "./ToastNotification.scss";
import { observer } from 'mobx-react';
import { toast } from 'react-toastify';
import CloseIcon from '@mui/icons-material/Close';

function ToastInfoNotification(props: any) {
  const { notification } = props;

  const imagePath = notification?.actor?.avatar || ('https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg');

  return (
    <div className='toastNotificationContainer'>
      <div className="notiImageWrapper">
        <img src={imagePath} alt="" className="notiImage" />
      </div>
      <div className="notiContentWrapper">
        <p className="notiContent">
          {notification?.content}
        </p>
      </div>
    </div>
  );
}

function CloseButton(props: any) {
  const { closeToast } = props;

  return (
    <div className="closeButtonToast">
      <CloseIcon onClick={closeToast} />
    </div>
  );
}

export function toastInfo(notification: any) {
  const config = {
    closeOnClick: false,
    pauseOnHover: true,
    autoClose: 5000000,
  };

  toast(<ToastInfoNotification
    notification={notification}
  />, config);
}
