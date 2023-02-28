import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import requestAxios from '../utils/axios';
import {
  POST_SEARCH_REQUEST,
  POST_SEARCH_SUCCESS,
  POST_SEARCH_FAILURE,
  POST_BY_PAGE_REQUEST,
  POST_BY_PAGE_SUCCESS,
  POST_BY_PAGE_FAILURE,
  POST_ADD_REQUEST,
  POST_ADD_SUCCESS,
  POST_ADD_FAILURE,
  POST_DELETE_REQUEST,
  POST_DELETE_SUCCESS,
  POST_DELETE_FAILURE,
  POST_DETAIL_REQUEST,
  POST_DETAIL_SUCCESS,
  POST_DETAIL_FAILURE,
  POST_LIKE_REQUEST,
  POST_LIKE_SUCCESS,
  POST_LIKE_FAILURE,
} from '../reducers/post';

function getPostAPI(data) {
  const options = {
    method: 'GET',
    url: '/forum',
    params: data,
  };

  return requestAxios(options);
}

function updatePostAPI(data) {
  const options = {
    method: 'PATCH',
    url: `/forum/${parseInt(data.id)}`,
    data,
  };

  return requestAxios(options);
}

function deletePostAPI(id) {
  const options = {
    method: 'DELETE',
    url: `/forum/${parseInt(id)}`,
  };

  return requestAxios(options);
}

function addPostAPI(data) {
  console.log(data);

  const options = {
    method: 'POST',
    url: `/forum`,
    data,
  };

  return requestAxios(options);
}

function* searchAllPost(action) {
  try {
    const data = yield call(getPostAPI, action.data);

    yield put({
      type: POST_SEARCH_SUCCESS,
      data,
    });
  } catch (e) {
    yield put({
      type: POST_SEARCH_FAILURE,
      data: e,
    });
  }
}

function* searchCurrentPagePost(action) {
  try {
    const data = yield call(getPostAPI, action.data);

    yield put({
      type: POST_BY_PAGE_SUCCESS,
      data,
    });
  } catch (e) {
    yield put({
      type: POST_BY_PAGE_FAILURE,
      data: e,
    });
  }
}

function* searchDetailPost(action) {
  try {
    const data = yield call(getPostAPI, action.data);

    yield put({
      type: POST_DETAIL_SUCCESS,
      data,
    });
  } catch (e) {
    yield put({
      type: POST_DETAIL_FAILURE,
      data: e,
    });
  }
}

function* toggleLikePost(action) {
  try {
    const data = yield call(updatePostAPI, action.data);

    yield put({
      type: POST_LIKE_SUCCESS,
      data,
    });
  } catch (e) {
    yield put({
      type: POST_LIKE_FAILURE,
      data: e.response.data,
    });
  }
}

function* deletePost(action) {
  try {
    const data = yield call(deletePostAPI, action.data);

    yield put({
      type: POST_DELETE_SUCCESS,
    });
  } catch (e) {
    yield put({
      type: POST_DELETE_FAILURE,
      data: e.response.data,
    });
  }
}

function* addPost(action) {
  try {
    const data = yield call(addPostAPI, action.data);

    yield put({
      type: POST_ADD_SUCCESS,
      data,
    });
  } catch (e) {
    yield put({
      type: POST_ADD_FAILURE,
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

function* watchPostAddRequest() {
  yield takeLatest(POST_ADD_REQUEST, addPost);
}

function* watchPostDeleteRequest() {
  yield takeLatest(POST_DELETE_REQUEST, deletePost);
}

function* watchPostDetailRequest() {
  yield takeLatest(POST_DETAIL_REQUEST, searchDetailPost);
}

function* watchPostLikeRequest() {
  yield takeLatest(POST_LIKE_REQUEST, toggleLikePost);
}

export default function* postSaga() {
  yield all([
    fork(watchPostSearchRequest),
    fork(watchPostByPageRequest),
    fork(watchPostAddRequest),
    fork(watchPostDeleteRequest),
    fork(watchPostDetailRequest),
    fork(watchPostLikeRequest),
  ]);
}
