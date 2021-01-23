import React from 'react';
import './Error.scss';

const Error = (props: any) => {

  return (
    <>
      { !props.hidden && 
        <div 
          className="error"
          onClick={() => props.clear && props.clear()}
        >
          {props.children}
        </div>
      }
    </>
  );
};

export default Error;