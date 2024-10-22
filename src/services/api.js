import axios from 'axios';
import toast from 'react-hot-toast';

const BASE_URL = 'https://us-central1-reeltalk-app.cloudfunctions.net/backend/';
// const BASE_URL = 'http://localhost:8080/';



const ENDPOINTS = {
  SET_PROFILE: 'api/user/setProfile',
  GET_GENRES: 'api/movies/getPossibleGenres',
  GET_RECOMMENDED_LISTS: 'api/lists/recommended',
  GET_RECENTLY_VIEWED_LISTS: 'api/lists/recently-viewed-lists',
  GET_MY_LISTS:'api/lists/',
  GET_TRENDING_LISTS:'api/lists/trending',
  GET_POPULAR_SEARCHES: 'movies/popular-searches',
};

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

const handleApiError = (error) => {
  console.error(error.message);
  if (error.response?.status === 401) {
    toast.error("Session expired. Please log in again.");
  } else {
    console.error('Error fetching data:', error.message);
    toast.error("Failed to fetch data. Please try again.");
  }
};

const apiGet = async (url, idToken, returnFullData=false) => {
  try {
    const response = await axiosInstance.get(url, {
      headers: { Authorization: `Bearer ${idToken}` }
    });
    if (returnFullData) {
      return response?.data || [];
    }
    return response?.data?.data || [];  } catch (error) {
    return handleApiError(error);
  }
};

const apiPost = async (url, data, idToken) => {
  try {
    const response = await axiosInstance.post(url, data, {
      headers: { Authorization: `Bearer ${idToken}` }
    });
    return response?.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getGenres = (idToken) => apiGet(ENDPOINTS.GET_GENRES, idToken);

export const setProfile = (data, idToken) => apiPost(ENDPOINTS.SET_PROFILE, data, idToken);

export const getRecommendedLists = (idToken) => apiGet(ENDPOINTS.GET_RECOMMENDED_LISTS, idToken);

export const getRecentlyViewedLists = (idToken) => apiGet(ENDPOINTS.GET_RECENTLY_VIEWED_LISTS, idToken);

export const getMyLists = (idToken) => apiGet(ENDPOINTS.GET_MY_LISTS, idToken);

export const getTrendingLists = (idToken) => apiGet(ENDPOINTS.GET_TRENDING_LISTS, idToken);

export const getPopularSearches = (idToken) => apiGet(ENDPOINTS.GET_POPULAR_SEARCHES, idToken,true);
