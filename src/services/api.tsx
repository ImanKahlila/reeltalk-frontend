import axios, { AxiosResponse } from 'axios';
import toast from 'react-hot-toast';

const BASE_URL = 'https://us-central1-reeltalk-app.cloudfunctions.net/backend/';
// const BASE_URL = 'http://localhost:8080/';



const ENDPOINTS = {
  GET_PROFILE:'api/user/profile/',
  SET_PROFILE: 'api/user/setProfile',
  GET_GENRES: 'api/movies/getPossibleGenres',
  GET_RECOMMENDED_LISTS: 'api/lists/recommended',
  GET_RECENTLY_VIEWED_LISTS: 'api/lists/recently-viewed-lists',
  GET_MY_LISTS: 'api/lists/',
  GET_TRENDING_LISTS: 'api/lists/trending',
  GET_POPULAR_SEARCHES: 'movies/popular-searches',
};

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

const handleApiError = (error: any) => {
  console.error(error.message);
  if (error.response?.status === 401) {
    toast.error("Session expired. Please log in again.");
  } else {
    console.error('Error fetching data:', error.message);
    toast.error("Failed to fetch data. Please try again.");
  }
};

const apiGet = async (url: string, idToken: string, param?:string, returnFullData: boolean = false): Promise< []> => {
  try {
    if (param) {
      url = `${url}${param}`;
    }
    const response: AxiosResponse = await axiosInstance.get(url, {
      headers: { Authorization: `Bearer ${idToken}` },
    });
    if (returnFullData) {
      return response?.data || [];
    }
    return response?.data?.data || [];
  } catch (error) {
    handleApiError(error);
    return [];
  }
};

const apiPost = async (url: string, data: any, idToken: string): Promise< null> => {
  try {
    const response: AxiosResponse = await axiosInstance.post(url, data, {
      headers: { Authorization: `Bearer ${idToken}` },
    });
    return response?.data;
  } catch (error) {
    handleApiError(error);
    return null;
  }
};

export const getGenres = (idToken: string) => apiGet(ENDPOINTS.GET_GENRES, idToken);

export const getProfile = (idToken: string, param: string) => apiGet(ENDPOINTS.GET_PROFILE, idToken,param);

export const setProfile = (data: any, idToken: string) => apiPost(ENDPOINTS.SET_PROFILE, data, idToken);

export const getRecommendedLists = (idToken: string) => apiGet(ENDPOINTS.GET_RECOMMENDED_LISTS, idToken);

export const getRecentlyViewedLists = (idToken: string) => apiGet(ENDPOINTS.GET_RECENTLY_VIEWED_LISTS, idToken);

export const getMyLists = (idToken: string) => apiGet(ENDPOINTS.GET_MY_LISTS, idToken);

export const getTrendingLists = (idToken: string) => apiGet(ENDPOINTS.GET_TRENDING_LISTS, idToken);

export const getPopularSearches = (idToken: string) => apiGet(ENDPOINTS.GET_POPULAR_SEARCHES, idToken,undefined, true);
