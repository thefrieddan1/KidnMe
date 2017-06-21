import firebase from 'firebase';

import {
  KIDS_FETCH_SUCCESS,
  POOP_SAVE_TIME_SUCCESS,
  EAT_SAVE_TIME_SUCCESS,
  WOKEUP_SAVE_TIME_SUCCESS
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

export const poopTimeSave = (poop, uid) => {
  console.log(`in poop save saving ${poop} to ${uid}`);
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase.database().ref(`/${currentUser.uid}/${uid}`)
    .update({ poop })
    .then(() => {
      dispatch({ type: POOP_SAVE_TIME_SUCCESS });
    });
  };
};

export const eatTimeSave = (eat, uid) => {
  console.log(`in poop save saving ${eat} to ${uid}`);
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase.database().ref(`/${currentUser.uid}/${uid}`)
    .update({ eat })
    .then(() => {
      dispatch({ type: EAT_SAVE_TIME_SUCCESS });
    });
  };
};

export const wokeUpTimeSave = (wokeUp, uid) => {
  console.log(`in woke up save saving ${wokeUp} to ${uid}`);
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase.database().ref(`/${currentUser.uid}/${uid}`)
    .update({ wokeUp })
    .then(() => {
      dispatch({ type: WOKEUP_SAVE_TIME_SUCCESS });
    });
  };
};
