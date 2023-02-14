import React from 'react';

const Header = () => {
  return (
    <header>
      <h1 className="logo">
        <a href="/">
          <img src="images/aiffel_logo.png" alt="로고 이미지" />
        </a>
      </h1>
      <div className="userInfo">
        <div>
          <img src="images/profile.png" alt="사용자 이미지" />
        </div>
        <span>김유미</span>
      </div>
    </header>
  );
};

export default Header;
