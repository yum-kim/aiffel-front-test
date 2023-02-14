export const initialState = {
  searchPostLoading: false,
  searchPostDone: false,
  searchPostError: null,

  addPostLoading: false,
  addPostDone: false,
  addPostError: null,

  deletePostLoading: false,
  deletePostDone: false,
  deletePostError: null,

  isLiked: false,
  postData: [],
  currentPageData: [],
};

export const POST_SEARCH_REQUEST = 'POST_SEARCH_REQUEST';
export const POST_SEARCH_SUCCESS = 'POST_SEARCH_SUCCESS';
export const POST_SEARCH_FAILURE = 'POST_SEARCH_FAILURE';

export const POST_BY_PAGE_REQUEST = 'POST_BY_PAGE_REQUEST';
export const POST_BY_PAGE_SUCCESS = 'POST_BY_PAGE_SUCCESS';
export const POST_BY_PAGE_FAILURE = 'POST_BY_PAGE_FAILURE';

export const POST_ADD_REQUEST = 'POST_ADD_REQUEST';
export const POST_ADD_SUCCESS = 'POST_ADD_SUCCESS';
export const POST_ADD_FAILURE = 'POST_ADD_FAILURE';

export const POST_DELETE_REQUEST = 'POST_DELETE_REQUEST';
export const POST_DELETE_SUCCESS = 'POST_DELETE_SUCCESS';
export const POST_DELETE_FAILURE = 'POST_DELETE_FAILURE';

export const postSearchRequestAction = (data) => {
  return {
    type: POST_SEARCH_REQUEST,
    data,
  };
};

export const postByPageRequestAction = (data) => {
  return {
    type: POST_BY_PAGE_REQUEST,
    data,
  };
};

const postReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case POST_SEARCH_REQUEST:
      return {
        ...state,
        searchPostLoading: true,
        searchPostDone: false,
        searchPostError: null,
        currentPage: action.data._page,
      };
    case POST_SEARCH_SUCCESS:
      return {
        ...state,
        postData: [...action.data],
        searchPostLoading: false,
        searchPostDone: true,
        searchPostError: null,
      };
    case POST_SEARCH_FAILURE:
      return {
        ...state,
        searchPostLoading: false,
        searchPostDone: false,
        searchPostError: { ...action.error },
      };
    case POST_BY_PAGE_REQUEST:
      return {
        ...state,
        searchPostLoading: true,
        searchPostDone: false,
        searchPostError: { ...action.error },
      };
    case POST_BY_PAGE_SUCCESS:
      return {
        ...state,
        currentPageData: [...action.data],
        searchPostLoading: false,
        searchPostDone: true,
        searchPostError: null,
      };
    case POST_BY_PAGE_FAILURE:
      return {
        ...state,
        searchPostLoading: false,
        searchPostDone: false,
        searchPostError: { ...action.error },
      };
    default:
      return state;
  }
};

export default postReducer;
