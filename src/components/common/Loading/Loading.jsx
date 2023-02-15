import React from 'react';
import styles from './Loading.module.scss';
import loadingImg from '../../../assets/images/loading.gif';

const Loading = () => {
  return <img src={loadingImg} className={styles.loading}></img>;
};

export default Loading;
