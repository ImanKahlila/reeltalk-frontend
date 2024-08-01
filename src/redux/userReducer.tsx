import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  userInfo: any;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  userInfo: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo(state, action: PayloadAction<any>) {
      state.userInfo = action.payload;
      state.error = null;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<any>) {
      state.error = action.payload;
      state.userInfo = null;
    },
    logout(state) {
      state.userInfo = null;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const { setUserInfo, setLoading, setError,logout } = userSlice.actions;

export default userSlice.reducer;
