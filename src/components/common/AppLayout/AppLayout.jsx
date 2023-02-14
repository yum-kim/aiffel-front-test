import React from 'react';
import Header from '../Header/Header';
import styles from './AppLayout.module.scss';

const AppLayout = ({ children }) => {
  return (
    <main className={styles.layout}>
      <Header />
      {children}
    </main>
  );
};

export default AppLayout;
