import React from 'react';
import styles from './Button.module.scss';

const Button = ({ name, size = 32, theme = 'yellow', onClick, ...props }) => {
  return (
    <button
      className={`${styles.btn}`}
      size={size}
      onClick={onClick}
      theme={theme}
      {...props}
    >
      {name}
    </button>
  );
};

export default Button;
