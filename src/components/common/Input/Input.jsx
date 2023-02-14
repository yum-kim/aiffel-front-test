import React, { forwardRef } from 'react';
import styles from './Input.module.scss';

const Input = forwardRef(({ type, name, placeholder, onChange }, ref) => {
  return (
    <>
      <input
        className={styles.input}
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        ref={ref}
      />
    </>
  );
});

export default Input;
