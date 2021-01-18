import React from 'react';
import classNames from 'classnames';
import './Button.scss';

const Button = (props: any) => {
  let buttonClass = classNames('button', (props.disabled && 'button--disabled')
  || {
    'button--delete': props.delete,
    'button--add': props.add,
    'button--edit': props.edit,
 });
  return (
    <button type="button" disabled={props.disabled} className={buttonClass} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;