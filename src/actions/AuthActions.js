import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { EMAIL_CHANGED,
  ID_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  ANNONYMOS_LOGIN_USER,
} from './types';

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const idChanged = (text) => {
  return {
    type: ID_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(user => loginUserSuccess(dispatch, user))
    .catch((error) => {
      loginUserFailed(dispatch);
      console.log(error);
    });
  };
};

export const annonymosLoginUser = ({ id }) => {
  console.log(`anonymos login with id ${id}`);
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });

    firebase.auth().signInAnonymously()
    .then(user => annonymLoginUserSuccess(dispatch, user, id))
    .catch((error) => {
      loginUserFailed(dispatch);
      console.log(error);
    });
  };
};

export const loginUserFailed = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
};

const annonymLoginUserSuccess = (dispatch, user, id) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: [user, id]
  });

  Actions.main(id);
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });

  Actions.main();
};
