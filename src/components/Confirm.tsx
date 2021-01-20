import React from 'react';
import Button from './Button';
import './Confirm.scss';

const Confirm = (props: any) => {
  return (
    <div className="confirm-card">
      <div className="confirm-message">
        {props.message}
      </div>
      {props.children}
      <div className="button-list">
        <Button
          onClick={props.onCancel}
        >CANCEL</Button>
        <Button danger
          onClick={props.onConfirm}
        >CONFIRM</Button>
      </div>
    </div>
  );
};

export default Confirm;