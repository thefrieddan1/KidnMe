import firebase from 'firebase';

import {
  KIDS_FETCH_SUCCESS
} from './types';

export const kidsFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/gardens/${currentUser.uid}/groups/babies`)
    .on('value', snapshot => {
      console.log(snapshot.val());
      dispatch({ type: KIDS_FETCH_SUCCESS, payload: snapshot.val() });
    });
  };
};
