import { createSelector } from 'reselect';
import { RootState } from '@/redux/store';

const selectUserInfo = (state: RootState) => state.user.userInfo;

// Memoized user selector
export const selectUser = createSelector(
  [selectUserInfo],
  userInfo => userInfo
);

// Selector to get the lists state from the Redux store
const selectListsState = (state: RootState) => state.lists;

// Selector to get recommended lists from the lists state
export const selectRecommendedLists = createSelector(
  [selectListsState],
  listsState => listsState.recommendedLists
);


