import React from 'react';
import './styles/Card.css';

export default function Card({ children, className, ...rest }) {
  return (
    <div className={"Card " + className} {...rest}>
      { children }
    </div>
  )
}
