import { routerNavigationAction } from '@ngrx/router-store';
import { createFeature, createReducer, on } from '@ngrx/store';
import { FeedStateInterface } from '../types/feedState.interface';
import { feedAction } from './actions';

const initialState: FeedStateInterface = {
  isLoading: false,
  error: null,
  data: null,
};

const feedFeature = createFeature({
  name: 'feed',
  reducer: createReducer(
    initialState,
    on(feedAction.getFeed, (state) => ({ ...state, isLoading: true })),
    on(feedAction.getFeedSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      data: action.feed,
    })),
    on(feedAction.getFeedFailure, (state) => ({ ...state, isLoading: false })),
    on(routerNavigationAction, () => initialState)
  ),
});

export const {
  name: feedFeatureKey,
  reducer: feedReducer,
  selectIsLoading,
  selectError,
  selectData: selectFeedData,
} = feedFeature;
