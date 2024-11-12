import { createSelector } from 'reselect';
import { RootState } from '@/redux/store';

const selectUserInfo = (state: RootState) => state.user.userInfo;
const selectListsState = (state: RootState) => state.lists;

// Memoized user selector
export const selectUser = createSelector(
  [selectUserInfo],
  userInfo => userInfo
);

// Memoized lists selector
export const selectRecommendedLists = createSelector(
  [selectListsState],
  (listsState) => listsState.recommendedLists
);

export const selectRecentlyViewedLists = createSelector(
  [selectListsState],
  (listsState) => listsState.recentlyViewedLists
);

export const selectMyLists = createSelector(
  [selectListsState],
  (listsState) => listsState.myLists
);

export const selectTrendingLists = createSelector(
  [selectListsState],
  (listsState) => listsState.trendingLists
);

export const selectIsLoading = createSelector(
  [selectListsState],
  (listsState) => listsState.isLoading
);

export const selectListsError = createSelector(
  [selectListsState],
  (listsState) => listsState.error
);
