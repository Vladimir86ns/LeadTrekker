import {
  REGISTER_USER,
  LOGIN_USER,
  SET_USER_INFO,
  LOGIN_USER_FAIL,
  RESET_AUTH_FAIL,
  RESET_USER
} from '../actions/types';

const initialState = {
  user: {},
  isAccountSet: false,
  loginFail: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER:
      return {
        ...state,
        user: action.payload.user.registerUser
      };

    case LOGIN_USER:
      return {
        ...state,
        user: action.payload.user.loginUser,
        showSidebar: true
      };

    case SET_USER_INFO:
      return {
        ...state,
        user: action.payload.user,
        isAccountSet: true
      };

    case LOGIN_USER_FAIL:
      return {
        ...state,
        loginFail: true
      };

    case RESET_AUTH_FAIL:
      return {
        ...state,
        loginFail: false
      };
    
      case RESET_USER:
      return {
        ...state,
        isAccountSet: false,
        user: {}
      };

    default:
      return state;
  }
};

export default reducer;