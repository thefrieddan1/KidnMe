import {
   KIDS_FETCH_SUCCESS,
   POOP_SAVE_TIME_SUCCESS,
   EAT_SAVE_TIME_SUCCESS,
   WOKEUP_SAVE_TIME_SUCCESS
 } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case KIDS_FETCH_SUCCESS:
      return action.payload;
    case POOP_SAVE_TIME_SUCCESS:
      return { ...state };
    case EAT_SAVE_TIME_SUCCESS:
      return { ...state };
    case WOKEUP_SAVE_TIME_SUCCESS:
      return { ...state };
    default:
      return state;
  }
};
