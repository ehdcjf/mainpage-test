
const initialState = {
  loadding: true,
  isWriter: false,
  isLike: null,
  id: null,
  subject: null,
  content: null,
  hit: null,
  liked: 0,
  disliked: 0,
  del: null,
  createdAt: null,
  updatedAt: null,
  nickname: null,
  useridx: null,
  comment: [],
}



const SHOW_ARTICLE_REQUEST = 'SHOW_ARTICLE_REQUEST'
const SHOW_ARTICLE_SUCCESS = 'SHOW_ARTICLE_SUCCESS'
const SHOW_ARTICLE_ERROR = 'SHOW_ARTICLE_ERROR'
const INSERT_B_LIKE_ACTION = 'INSERT_B_LIKE_ACTION'
const INSERT_B_DISLIKE_ACTION = 'INSERT_B_DISLIKE_ACTION'
const DELETE_B_LIKE_ACTION = 'DELETE_B_LIKE_ACTION'
const DELETE_B_DISLIKE_ACTION = 'DELETE_B_DISLIKE_ACTION'
const UPDATE_B_LIKE_ACTION = 'UPDATE_B_LIKE_ACTION'
const UPDATE_B_DISLIKE_ACTION = 'UPDATE_B_DISLIKE_ACTION'



export const ShowArticleAction = (data) => {
  return async (dispatch) => {
    dispatch(ShowArticleRequest());
    try {
      data.success === true
        ? dispatch(ShowArticleSuccess(data))
        : dispatch(ShowArticleError())
    } catch (e) {
      dispatch(ShowArticleError())
    }
  }
}

export const ShowArticleRequest = () => {
  return {
    type: SHOW_ARTICLE_REQUEST,
  }
}
export const ShowArticleSuccess = (data) => {
  return {
    type: SHOW_ARTICLE_SUCCESS,
    data: data,
  }
}
export const ShowArticleError = () => {
  return {
    type: SHOW_ARTICLE_ERROR,
  }
}

export const InsertBLikeAction = (data) => {
  if (data) {
    return {
      type: INSERT_B_LIKE_ACTION,
      data: data,
    }
  } else {
    return {
      type: INSERT_B_DISLIKE_ACTION,
      data: data,
    }
  }
}

export const DeleteBLikeAction = (data) => {
  if (data) {
    return {
      type: DELETE_B_LIKE_ACTION,

    }
  } else {
    return {
      type: DELETE_B_DISLIKE_ACTION,

    }
  }
}

export const UpdateBLikeAction = (data) => {
  if (data) {
    return {
      type: UPDATE_B_LIKE_ACTION,
    }
  } else {
    return {
      type: UPDATE_B_DISLIKE_ACTION,

    }
  }
}


const reducer = (state = initialState, action) => {
  switch (action.type) {

    case SHOW_ARTICLE_REQUEST:
      return {
        ...state,
        loadding: true,

      }
    case SHOW_ARTICLE_SUCCESS:
      return {
        ...state,
        ...action.data,
        loadding: false,
      }
    case SHOW_ARTICLE_ERROR:
      return {
        ...state,
        loadding: false,
      }
    case INSERT_B_LIKE_ACTION:
      return {
        ...state,
        isLike: true,
        liked: state.liked + 1,
      }
    case INSERT_B_DISLIKE_ACTION:
      return {
        ...state,
        isLike: false,
        disliked: state.disliked + 1,
      }
    case DELETE_B_LIKE_ACTION:
      return {
        ...state,
        isLike: null,
        liked: state.liked - 1,
      }
    case DELETE_B_DISLIKE_ACTION:
      return {
        ...state,
        isLike: null,
        disliked: state.disliked - 1,
      }
    case UPDATE_B_LIKE_ACTION:
      return {
        ...state,
        isLike: true,
        liked: state.liked + 1,
        disliked: state.disliked - 1,
      }
    case UPDATE_B_DISLIKE_ACTION:
      return {
        ...state,
        isLike: false,
        liked: state.liked - 1,
        disliked: state.disliked + 1,
      }
    default:
      return state
  }
}

export default reducer