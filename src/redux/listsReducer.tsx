import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getRecommendedLists } from '@/services/api';

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
  isLoading: boolean;
  error: string | null;
}

const initialState: ListsState = {
  recommendedLists: [],
  isLoading: false,
  error: null,
};

// Thunk to fetch recommended lists
export const fetchRecommendedLists = createAsyncThunk(
  'lists/fetchRecommendedLists',
  async (idToken: string) => {
    return await getRecommendedLists(idToken);
  }
);

const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    setRecommendedLists(state, action: PayloadAction<List[]>) {
      state.recommendedLists = action.payload;
      state.error = null;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.recommendedLists = [];
    },
    logout(state) {
      state.recommendedLists = [];
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecommendedLists.pending, (state) => {
        state.isLoading = true;
        state.error = null;  // Clear previous errors when loading starts
      })
      .addCase(fetchRecommendedLists.fulfilled, (state, action: PayloadAction<List[]>) => {
        state.isLoading = false;
        state.recommendedLists = action.payload;  // Set fetched lists
      })
      .addCase(fetchRecommendedLists.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch recommended lists';  // Handle errors
      });
  },
});

export const { setRecommendedLists, setLoading, setError, logout } = listsSlice.actions;
export default listsSlice.reducer;
