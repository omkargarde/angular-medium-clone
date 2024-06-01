import { AsyncPipe } from '@angular/common';
import { Component, OnInit, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { feedActions } from './store/actions';
import { selectError, selectFeedData, selectIsLoading } from './store/reducers';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  templateUrl: './feed.component.html',
})
export class FeedComponent implements OnInit {
  store = inject(Store);
  apiUrl = input<string>('');

  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    feed: this.store.select(selectFeedData),
  });

  ngOnInit(): void {
    computed(() => {
      this.store.dispatch(feedActions.getFeed({ url: this.apiUrl() }));
    });
  }
}
