import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  getMyLists,
  getRecentlyViewedLists,
  getRecommendedLists, getTrendingLists,
} from '@/services/api';

export interface List {
  listId: string;
  name: string;
  coverPhoto: string;
  type: string;
  ownerProfile: {
    displayName: string;
    showType?: boolean;
    imageUrl?: string;
  };
  lastUpdated:string;
  genres: {
    emoji: string;
    name: string;
    id: string;
  }[];
  contentList: {
    primaryImage: {
      url: string;
    };
    titleText: {
      text: string;
    };
    releaseYear: {
      year: number;
    };
  }[];
}

interface ListsState {
  recommendedLists: List[];
  recentlyViewedLists: List[];
  myLists: List[];
  trendingLists: List[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ListsState = {
  recommendedLists: [],
  recentlyViewedLists: [],
  myLists: [],
  trendingLists: [],
  isLoading: false,
  error: null,
};

// Utility function for setting loading state
const handlePending = (state: ListsState) => {
  state.isLoading = true;
  state.error = null;
};

// Utility function for handling fulfilled state
const handleFulfilled = (
  state: ListsState,
  action: PayloadAction<List[]>,
  key: keyof Omit<ListsState, 'isLoading' | 'error'>
) => {
  state.isLoading = false;
  (state[key] as List[]) = action.payload;  // Type assertion here to ensure it's a List[]
};


// Utility function for handling rejected state
const handleRejected = (state: ListsState, action: any) => {
  state.isLoading = false;
  state.error = action.payload || 'Failed to fetch data';
};

// Reusable thunk creator to reduce redundancy
const createFetchThunk = (type: string, apiCall: (idToken: string) => Promise<List[]>) => {
  return createAsyncThunk(type, async (idToken: string, { rejectWithValue }) => {
    try {
      return await apiCall(idToken);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  });
};

// Define thunks using the reusable function
export const fetchRecommendedLists = createFetchThunk(
  'lists/fetchRecommendedLists',
  getRecommendedLists
);

export const fetchRecentlyViewedLists = createFetchThunk(
  'lists/fetchRecentlyViewedLists',
  getRecentlyViewedLists
);

export const fetchMyLists = createFetchThunk('lists/fetchMyLists', getMyLists);

export const fetchTrendingLists = createFetchThunk('lists/fetchTrendingLists', getTrendingLists);


const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.recommendedLists = [];
      state.recentlyViewedLists = [];
      state.myLists = [];
      state.trendingLists = [];

    },
    logout(state) {
      state.recommendedLists = [];
      state.recentlyViewedLists = [];
      state.myLists = [];
      state.trendingLists = [];
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Handle recommended lists
    builder
      .addCase(fetchRecommendedLists.pending, handlePending)
      .addCase(fetchRecommendedLists.fulfilled, (state, action) =>
        handleFulfilled(state, action, 'recommendedLists')
      )
      .addCase(fetchRecommendedLists.rejected, handleRejected);

    // Handle recently viewed lists
    builder
      .addCase(fetchRecentlyViewedLists.pending, handlePending)
      .addCase(fetchRecentlyViewedLists.fulfilled, (state, action) =>
        handleFulfilled(state, action, 'recentlyViewedLists')
      )
      .addCase(fetchRecentlyViewedLists.rejected, handleRejected);

    // Handle my lists
    builder
      .addCase(fetchMyLists.pending, handlePending)
      .addCase(fetchMyLists.fulfilled, (state, action) =>
        handleFulfilled(state, action, 'myLists')
      )
      .addCase(fetchMyLists.rejected, handleRejected);

    // Handle trending lists
    builder
      .addCase(fetchTrendingLists.pending, handlePending)
      .addCase(fetchTrendingLists.fulfilled, (state, action) =>
        handleFulfilled(state, action, 'trendingLists')
      )
      .addCase(fetchTrendingLists.rejected, handleRejected);
  },
});

export const { setLoading, setError, logout } = listsSlice.actions;

export default listsSlice.reducer;
