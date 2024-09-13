import axios from 'axios';

const BASE_URL = 'https://us-central1-reeltalk-app.cloudfunctions.net/backend/api/user/setProfile';
// const BASE_URL =  'http://localhost:8080/api/user/setProfile';


export const setProfile = async (data, idToken) => {
  try {
    const response = await axios.post(
      BASE_URL,
      data,
      { headers: { Authorization: `Bearer ${idToken}` } }
    );
    return response.data;
  } catch (error) {
    console.error('Error setting profile:', error);
    throw error;
  }
};
