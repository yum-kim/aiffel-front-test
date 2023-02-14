import React, { forwardRef } from 'react';
import styles from './Input.module.scss';

const Input = forwardRef(
  ({ type, name, placeholder, theme = 'outline', onChange }, ref) => {
    return (
      <>
        <input
          className={styles.input}
          type={type}
          name={name}
          placeholder={placeholder}
          theme={theme}
          onChange={onChange}
          ref={ref}
        />
      </>
    );
  },
);

export default Input;
