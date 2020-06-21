import React from 'react';
import './styles/Button.css';

export default function Button({ className, children, ...rest }) {
  
  return (
    <div className={"Button " + className } {...rest}>
      { children }
    </div>
  )
}
