import {
  EMAIL_CHANGED,
  ID_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  ANNONYMOS_LOGIN_USER,
} from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  user: null,
  error: '',
  id: '',
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ID_CHANGED:
      return { ...state, id: action.payload, email: '' };
    case EMAIL_CHANGED:
      return { ...state, email: action.payload, id: '' };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case LOGIN_USER:
      return { ...state, loading: true, error: 'loading' };
    case LOGIN_USER_SUCCESS:
      return { ...state, error: 'Authentication Succeeded.', password: '', loading: false };
    case LOGIN_USER_FAIL:
      return { ...state, error: 'Authentication Failed.', password: '', loading: false };
    default:
      return state;
  }
};
