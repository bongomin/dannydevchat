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

// private channel actions
export const setPrivateChannel = isPrivateChannel => {
   return {
      type: actionTypes.SET_PRIVATE_CHANNEL,
      payLoad: {
         isPrivateChannel
      }
   }
}

export const setUserPosts = userPosts => {
   return {
      type: actionTypes.SET_USER_POSTS,
      payLoad: {
         userPosts
      }
   }
}