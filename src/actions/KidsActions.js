import firebase from 'firebase';

import {
  KIDS_FETCH_SUCCESS
} from './types';

export const kidsFetch = () => {
  const { currentUser } = firebase.auth();
  console.log(`${currentUser.uid}`);
  return (dispatch) => {
    firebase.database().ref(`/${currentUser.uid}/`)
    .on('value', snapshot => {
      dispatch({ type: KIDS_FETCH_SUCCESS, payload: snapshot.val() });
    });
  };
};
