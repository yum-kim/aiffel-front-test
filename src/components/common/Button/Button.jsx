import React from 'react';
import styles from './Button.module.scss';

const Button = ({ name, size = 32, outline, onClick, ...props }) => {
  return (
    <button
      className={`${styles.btn}`}
      size={size}
      onClick={onClick}
      outline={outline}
      {...props}
    >
      {name}
    </button>
  );
};

export default Button;
