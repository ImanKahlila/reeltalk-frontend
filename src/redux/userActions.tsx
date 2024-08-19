import axios from 'axios';
import { AppDispatch } from './store';
import { setError, setLoading, setUserInfo } from './userReducer';

export const fetchUserProfile = (userId: string, idToken: string) => async (
  dispatch: AppDispatch
) => {
  dispatch(setLoading(true));

  try {
    const response = await axios.get(
      // `https://us-central1-reeltalk-app.cloudfunctions.net/backend/api/user/profile/${userId}`,
      `http://localhost:8080/api/user/profile/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      }
    );

    const userData = response.data.data;
    dispatch(setUserInfo(userData));
  } catch (error: any) {
    dispatch(setError(error.message || 'Failed to fetch user details'));
  } finally {
    dispatch(setLoading(false));
  }
};
