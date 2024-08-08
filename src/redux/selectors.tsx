import { createSelector } from 'reselect';
import { RootState } from '@/redux/store';

const selectUserInfo = (state: RootState) => state.user.userInfo;

// Memoized user selector
export const selectUser = createSelector(
  [selectUserInfo],
  userInfo => userInfo
);
