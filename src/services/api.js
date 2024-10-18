import axios from 'axios';
import toast from 'react-hot-toast';

const BASE_URL = 'https://us-central1-reeltalk-app.cloudfunctions.net/backend/';
// const BASE_URL = 'http://localhost:8080/';


const SET_PROFILE = 'api/user/setProfile';
const GET_GENRES = 'api/movies/getPossibleGenres';
const GET_RECOMMENDED_LISTS = 'api/lists/recommended';
const GET_RECENTLY_VIEWED_LISTS = 'api/lists/recently-viewed-lists';
const GET_POPULAR_SEARCHES = 'movies/popular-searches';


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
    toast.error("Failed to load genres. Please try again.");
    return [];  }
};

export const setProfile = async (data, idToken) => {
  try {
    const response = await axios.post(
      `${BASE_URL}${SET_PROFILE}`,
      data,
      {
        withCredentials: true,
        headers: { Authorization: `Bearer ${idToken}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error setting profile:', error);
    throw error;
  }
};

export const getRecommendedLists = async (idToken) => {
  try {
    const response = await axios.get(
      `${BASE_URL}${GET_RECOMMENDED_LISTS}`,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      }
    );
    return response?.data.data || [];
  } catch (error) {
    console.error('Error fetching recommended lists:', error.message);
    toast.error("Failed to recommended lists. Please try again.");
    return [];  }
};

export const getRecentlyViewedLists = async (idToken) => {
  try {
    const response = await axios.get(
      `${BASE_URL}${GET_RECENTLY_VIEWED_LISTS}`,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      }
    );
    return response?.data.data || [];
  } catch (error) {
    console.error('Error fetching recently viewed lists:', error.message);
    toast.error("Failed to recently viewed lists. Please try again.");
    return [];  }
};

export const getPopularSearches = async (idToken) => {
  try {
    const response = await axios.get(
      `${BASE_URL}${GET_POPULAR_SEARCHES}`,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      }
    );
    return response.data || [];
  } catch (error) {
    console.error('Error fetching recently viewed lists:', error.message);
    toast.error("Failed to recently viewed lists. Please try again.");
    return [];  }
};
