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

  detailPostLoading: false,
  detailPostDone: false,
  detailPostError: null,

  postData: [], //forumList
  currentPageData: [], //forumList
  postDetailData: {}, //postDetail
};

export const POST_SEARCH_REQUEST = 'POST_SEARCH_REQUEST';
export const POST_SEARCH_SUCCESS = 'POST_SEARCH_SUCCESS';
export const POST_SEARCH_FAILURE = 'POST_SEARCH_FAILURE';

export const POST_ADD_REQUEST = 'POST_ADD_REQUEST';
export const POST_ADD_SUCCESS = 'POST_ADD_SUCCESS';
export const POST_ADD_FAILURE = 'POST_ADD_FAILURE';

export const POST_DELETE_REQUEST = 'POST_DELETE_REQUEST';
export const POST_DELETE_SUCCESS = 'POST_DELETE_SUCCESS';
export const POST_DELETE_FAILURE = 'POST_DELETE_FAILURE';

export const POST_BY_PAGE_REQUEST = 'POST_BY_PAGE_REQUEST';
export const POST_BY_PAGE_SUCCESS = 'POST_BY_PAGE_SUCCESS';
export const POST_BY_PAGE_FAILURE = 'POST_BY_PAGE_FAILURE';

export const POST_DETAIL_REQUEST = 'POST_DETAIL_REQUEST';
export const POST_DETAIL_SUCCESS = 'POST_DETAIL_SUCCESS';
export const POST_DETAIL_FAILURE = 'POST_DETAIL_FAILURE';

export const POST_LIKE_REQUEST = 'POST_LIKE_REQUEST';
export const POST_LIKE_SUCCESS = 'POST_LIKE_SUCCESS';
export const POST_LIKE_FAILURE = 'POST_LIKE_FAILURE';

export const postSearchRequestAction = (data) => {
  return {
    type: POST_SEARCH_REQUEST,
    data,
  };
};

export const postAddRequestAction = (data) => {
  return {
    type: POST_ADD_REQUEST,
    data,
  };
};

export const postDetailRequestAction = (data) => {
  return {
    type: POST_DETAIL_REQUEST,
    data,
  };
};

export const postByPageRequestAction = (data) => {
  return {
    type: POST_BY_PAGE_REQUEST,
    data,
  };
};

export const postLikeRequestAction = (data) => {
  return {
    type: POST_LIKE_REQUEST,
    data,
  };
};

export const postDeleteRequestAction = (data) => {
  return {
    type: POST_DELETE_REQUEST,
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
    case POST_ADD_REQUEST:
      return {
        ...state,
        addPostLoading: true,
        addPostDone: false,
        addPostError: { ...action.error },
      };
    case POST_ADD_SUCCESS:
      return {
        ...state,
        addPostLoading: false,
        addPostDone: true,
        addPostError: null,
      };
    case POST_ADD_FAILURE:
      return {
        ...state,
        addPostLoading: false,
        addPostDone: false,
        addPostError: { ...action.error },
      };
    case POST_DELETE_REQUEST:
      return {
        ...state,
        deletePostLoading: true,
        deletePostDone: false,
        deletePostError: { ...action.error },
      };
    case POST_DELETE_SUCCESS:
      return {
        ...state,
        postDetailData: {},
        deletePostLoading: false,
        deletePostDone: true,
        deletePostError: null,
      };
    case POST_DELETE_FAILURE:
      return {
        ...state,
        deletePostLoading: false,
        deletePostDone: false,
        deletePostError: { ...action.error },
      };
    case POST_DETAIL_REQUEST:
      return {
        ...state,
        detailPostLoading: true,
        detailPostDone: false,
        detailPostError: { ...action.error },
      };
    case POST_DETAIL_SUCCESS:
      return {
        ...state,
        postDetailData: { ...action.data[0] },
        detailPostLoading: false,
        detailPostDone: true,
        detailPostError: null,
      };
    case POST_DETAIL_FAILURE:
      return {
        ...state,
        detailPostLoading: false,
        detailPostDone: false,
        detailPostError: { ...action.error },
      };
    case POST_LIKE_REQUEST:
      return {
        ...state,
      };
    case POST_LIKE_SUCCESS:
      return {
        ...state,
        postDetailData: { ...action.data },
      };
    case POST_LIKE_FAILURE:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default postReducer;
