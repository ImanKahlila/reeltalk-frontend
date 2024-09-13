import axios from 'axios';

const BASE_URL = 'https://us-central1-reeltalk-app.cloudfunctions.net/backend';
// const BASE_URL = 'http://localhost:8080/';


const SET_PROFILE = 'api/user/setProfile';
const GET_GENRES = 'api/movies/getPossibleGenres';

export const getGenres = async (idToken) => {
  try {
    const response = await axios.get(
      `${BASE_URL}${GET_GENRES}`,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      }
    );
    return response?.data?.data?.genres || [];
  } catch (error) {
    console.error('Error fetching genres:', error.message);
    return null;
  }
};

export const setProfile = async (data, idToken) => {
  try {
    const response = await axios.post(
      `${BASE_URL}${SET_PROFILE}`,
      data,
      {
        headers: { Authorization: `Bearer ${idToken}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error setting profile:', error);
    throw error;
  }
};
