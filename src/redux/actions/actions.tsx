import { SET_USER_INFO, SET_LOADING, SET_ERROR } from './actionTypes';

export const setUserInfo = (userInfo: any) => ({
  type: SET_USER_INFO,
  payload: userInfo,
});

export const setLoading = (isLoading: boolean) => ({
  type: SET_LOADING,
  payload: isLoading,
});

export const setError = (error: any) => ({
  type: SET_ERROR,
  payload: error,
});
