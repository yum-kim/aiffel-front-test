import React from 'react';
import Input from '../common/Input/Input';
import Button from '../common/Button/Button';
import styles from './Login.module.scss';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequestAction } from '../../reducers/user';
import { useNavigate } from 'react-router-dom';
import Loading from '../common/Loading/Loading';
import logoImg from '../../assets/images/aiffel_logo.png';

const Login = () => {
  const emailInput = useRef();
  const [email, setEmail] = useState();
  const [emailError, setEmailError] = useState(null);
  const passwordInput = useRef();
  const [password, setPassword] = useState();
  const [passwordError, setPasswordError] = useState(null);
  const dispatch = useDispatch();
  const { loginLoading, loginDone, loginError, loginData } = useSelector(
    (state) => state.user,
  );
  const navigate = useNavigate();

  const onChangeEmail = (e) => {
    if (/\S+@\S+\.\S+/.test(e.target.value)) {
      setEmailError(null);
    } else {
      setEmailError('이메일 형식이 올바르지 않습니다.');
    }
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    if (e.target.value.length >= 10) {
      setPasswordError(null);
    } else {
      setPasswordError('비밀번호는 10자리 이상 입력해주세요.');
    }
    setPassword(e.target.value);
  };

  const onLogin = () => {
    if (loginLoading) {
      alert('로그인 중입니다. 잠시만 기다려주세요.');
      return;
    }

    if (emailError || passwordError) {
      alert('이메일 혹은 비밀번호를 확인해주세요.');
      return;
    }

    dispatch(loginRequestAction({ email, password }));
  };

  useEffect(() => {
    if (loginDone) {
      navigate('/forum');
    }
  }, [loginDone]);

  useEffect(() => {
    if (loginError && !loginData.accessToken) {
      alert('로그인에 실패했습니다. 이메일 혹은 비밀번호를 확인해주세요.');
    }
  }, [loginError]);

  useEffect(() => {
    emailInput.current.focus();
    emailInput.current.value = 'we.want.u@aiffel.com';
    passwordInput.current.value = 'passpassplz';
  }, []);

  return (
    <section className={styles.loginWrapper}>
      {loginLoading && <Loading />}

      <div className={styles.login}>
        <div className={styles.logo}>
          <img src={logoImg} alt="로고 이미지" />
          {/* {data.map((item) => {
            return <div>{item.id}</div>;
          })} */}
        </div>
        <div className={styles.inputWrapper}>
          <Input
            type="text"
            placeholder="이메일을 입력해주세요"
            onChange={onChangeEmail}
            value="we.want.u@aiffel.com"
            ref={emailInput}
          />
          <Input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            onChange={onChangePassword}
            value={password}
            ref={passwordInput}
          />
        </div>
        {emailError && <p className={styles.error}>{emailError}</p>}
        {passwordError && <p className={styles.error}>{passwordError}</p>}
        <Button
          name="로그인"
          size="40"
          outline="false"
          onClick={onLogin}
          // disabled={(emailError || passwordError) && true}
        />
      </div>
    </section>
  );
};

export default Login;
