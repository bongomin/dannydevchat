import * as actionTypes from './types';

// User Actions
export const setUser = user => {
   return {
      type: actionTypes.SET_USER,
      payLoad: {
         currentUser: user
      }
   }
}

export const clearUser = () => {
   return {
      type: actionTypes.CLEAR_USER
   };
};

// channel Actions
export const setCurrentChannel = channel => {
   return {
      type: actionTypes.SET_CURRENT_CHANNEL,
      payLoad: {
         currentChannel: channel
      }
   }
}