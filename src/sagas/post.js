import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import requestAxios from '../utils/axios';
import {
  POST_SEARCH_REQUEST,
  POST_SEARCH_SUCCESS,
  POST_SEARCH_FAILURE,
  POST_BY_PAGE_REQUEST,
  POST_BY_PAGE_SUCCESS,
  POST_BY_PAGE_FAILURE,
} from '../reducers/post';

function searchPostAPI(data) {
  const options = {
    method: 'GET',
    url: '/forum',
    params: data,
  };

  return requestAxios(options);
}

function* searchAllPost(action) {
  try {
    const data = yield call(searchPostAPI, action.data);

    yield put({
      type: POST_SEARCH_SUCCESS,
      data,
    });
  } catch (e) {
    yield put({
      type: POST_SEARCH_FAILURE,
      data: e.response.data,
    });
  }
}

function* searchCurrentPagePost(action) {
  try {
    const data = yield call(searchPostAPI, action.data);

    yield put({
      type: POST_BY_PAGE_SUCCESS,
      data,
    });
  } catch (e) {
    yield put({
      type: POST_BY_PAGE_FAILURE,
      data: e.response.data,
    });
  }
}

function* watchPostSearchRequest() {
  yield takeLatest(POST_SEARCH_REQUEST, searchAllPost);
}

function* watchPostByPageRequest() {
  yield takeLatest(POST_BY_PAGE_REQUEST, searchCurrentPagePost);
}

export default function* postSaga() {
  yield all([fork(watchPostSearchRequest), fork(watchPostByPageRequest)]);
}
