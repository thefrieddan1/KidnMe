import firebase from 'firebase';

import {
  KIDS_FETCH_SUCCESS,
  POOP_SAVE_TIME_SUCCESS,
  EAT_SAVE_TIME_SUCCESS,
  WOKEUP_SAVE_TIME_SUCCESS,
  GROUP_FETCH
} from './types';

export const groupFetch = () => {
  return (dispatch) => {
    dispatch({ type: GROUP_FETCH });
  };
};

export const kidFetch = (id) => {
  return (dispatch) => {
    firebase.database().ref()
    .orderByKey()
    .equalTo(`${id}`)
    .on('value', snapshot => {
      dispatch({ type: KIDS_FETCH_SUCCESS, payload: snapshot.val() });
    });
  };
};

export const kidsFetch = () => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase.database().ref()
    .orderByChild('uid')
    .equalTo(`${currentUser.uid}`)
    .on('value', snapshot => {
      dispatch({ type: KIDS_FETCH_SUCCESS, payload: snapshot.val() });
    });
  };
};

export const poopTimeSave = (poop, uid) => {
  console.log(`in poop saving ${poop} to ${uid}`);
  return (dispatch) => {
    firebase.database().ref(`/${uid}/`)
    .update({ poop })
    .then(() => {
      dispatch({ type: POOP_SAVE_TIME_SUCCESS });
    });
  };
};

export const eatTimeSave = (eat, uid) => {
  console.log(`in eat saving ${eat} to ${uid}`);
  return (dispatch) => {
    firebase.database().ref(`/${uid}/`)
    .update({ eat })
    .then(() => {
      dispatch({ type: EAT_SAVE_TIME_SUCCESS });
    });
  };
};

export const wokeUpTimeSave = (wokeUp, uid) => {
  console.log(`in woke up saving ${wokeUp} to ${uid}`);
  return (dispatch) => {
    firebase.database().ref(`/${uid}/`)
    .update({ wokeUp })
    .then(() => {
      dispatch({ type: WOKEUP_SAVE_TIME_SUCCESS });
    });
  };
};
