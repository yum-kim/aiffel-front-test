//store
export const initialState = {
  loginLoading: false,
  loginDone: false,
  loginError: null,
  loginData: {},
};

//action
export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const loginRequestAction = (data) => {
  return {
    type: LOG_IN_REQUEST,
    data,
  };
};

export const loginSuccessAction = (data) => {
  return {
    type: LOG_IN_SUCCESS,
    data,
  };
};

export const loginFailureAction = (error) => {
  return {
    type: LOG_IN_FAILURE,
    error,
  };
};

//reducer
const userReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case LOG_IN_REQUEST:
      return {
        ...state,
        loginLoading: true,
        loginDone: false,
        loginError: null,
      };
    case LOG_IN_SUCCESS:
      return {
        ...state,
        loginData: { ...action.data },
        loginLoading: false,
        loginDone: true,
        loginError: null,
      };
    case LOG_IN_FAILURE:
      return {
        ...state,
        loginLoading: false,
        loginDone: false,
        loginError: { ...action.error },
      };
    default:
      return state;
  }
};

export default userReducer;
