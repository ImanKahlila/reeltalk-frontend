import { AppDispatch } from './store';
import { setError, setLoading, setUserInfo } from './userReducer';
import { getProfile } from '@/services/api';

export const fetchUserProfile = (userId: string, idToken: string) => async (
  dispatch: AppDispatch
) => {
  dispatch(setLoading(true));

  try {
    dispatch(setUserInfo(await  getProfile(idToken,userId)));
  } catch (error: any) {
    dispatch(setError(error.message || 'Failed to fetch user details'));
  } finally {
    dispatch(setLoading(false));
  }
};


