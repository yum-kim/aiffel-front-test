import React from 'react';
import { useSelector } from 'react-redux';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import logoImg from '../../../assets/images/aiffel_logo.png';
import profileImg from '../../../assets/images/profile.png';

const Header = () => {
  const { loginData } = useSelector((state) => state.user);

  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>
        <Link to="/">
          <img src={logoImg} alt="로고 이미지" />
        </Link>
      </h1>
      <div className={styles.userInfo}>
        <div className={styles.profile}>
          <img src={profileImg} alt="사용자 이미지" />
        </div>
        <div className={styles.menu}>
          <Link to="/profile">Profile</Link>
        </div>
        <span className={styles.username}>{loginData.username}님</span>
      </div>
    </header>
  );
};

export default Header;
