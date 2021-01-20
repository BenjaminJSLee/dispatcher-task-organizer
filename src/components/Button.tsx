import React from 'react';
import classNames from 'classnames';
import './Button.scss';

const Button = (props: any) => {
  let buttonClass = classNames('button', (props.disabled && 'button--disabled')
  || {
    'button--danger': props.danger,
    'button--success': props.success,
    'button--warning': props.warning,
 });
  return (
    <button type="button" disabled={props.disabled} className={buttonClass} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;