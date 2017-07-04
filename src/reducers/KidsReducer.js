import {
   KIDS_FETCH_SUCCESS,
   POOP_SAVE_TIME_SUCCESS,
   EAT_SAVE_TIME_SUCCESS,
   WOKEUP_SAVE_TIME_SUCCESS,
   GROUP_FETCH
 } from '../actions/types';

const INITIAL_STATE = {};
// babies is passed from tabs to avoid accessing DB in groups tab.
let babies = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case KIDS_FETCH_SUCCESS:
      babies = action.payload;
      return action.payload;
    case GROUP_FETCH:
      console.log(`in reducer group_fetch ${babies}`);
      return babies;
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
