import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import {
  LOG_IN_REQUEST,
  loginSuccessAction,
  loginFailureAction,
} from '../reducers/user';
import requestAxios from '../utils/axios';
import { authToken } from '../utils/authToken';

function logInAPI(data) {
  const options = {
    method: 'GET',
    url: '/login',
    params: data,
  };

  return requestAxios(options);
}

function* logIn(action) {
  try {
    console.log(`Saga- LOG_IN_SUCCESS`);
    console.log(action.data);

    const res = yield call(logInAPI, action.data);

    console.log(res);

    if (res.length > 0) {
      res[0].accessToken = '123456abcdefg';
      const { accessToken } = res[0];

      yield put(loginSuccessAction({ ...res[0] }));
      authToken.setToken(accessToken);
      //   localStorage.setItem('accessToken', accessToken);
    } else {
      yield put(loginFailureAction(res));
    }
  } catch (e) {
    yield put(loginFailureAction(e.response.data));
  }
}

function* watchLogInRequest() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}

export default function* userSaga() {
  yield all([fork(watchLogInRequest)]);
}
