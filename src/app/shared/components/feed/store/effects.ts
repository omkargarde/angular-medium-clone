import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { FeedService } from '../services/feed.service';
import { GetFeedResponseInterface } from '../types/getFeedResponse.interface';
import { feedAction } from './actions';

export const getGetFeedEffect = createEffect(
  (actions$ = inject(Actions), feedService = inject(FeedService)) => {
    return actions$.pipe(
      ofType(feedAction.getFeed),
      switchMap(({ url }) => {
        return feedService.getFeed(url).pipe(
          map((feed: GetFeedResponseInterface) => {
            return feedAction.getFeedSuccess({ feed });
          }),
          catchError(() => {
            return of(feedAction.getFeedFailure());
          })
        );
      })
    );
  },
  { functional: true }
);
