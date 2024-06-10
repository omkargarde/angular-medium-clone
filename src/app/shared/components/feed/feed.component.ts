import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject, input, signal } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import queryString from 'query-string';
import { combineLatest } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { LoadingComponent } from '../loading/loading.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { feedActions } from './store/actions';
import { selectError, selectFeedData, selectIsLoading } from './store/reducers';

@Component({
  selector: 'app-feed',
  standalone: true,
  templateUrl: './feed.component.html',
  imports: [
    AsyncPipe,
    RouterLink,
    ErrorMessageComponent,
    LoadingComponent,
    PaginationComponent,
  ],
})
export class FeedComponent implements OnInit {
  store = inject(Store);
  router = inject(Router);
  route = inject(ActivatedRoute);

  apiUrl = input.required<string>();

  limit = signal(environment.limit);
  baseUrl = signal(this.router.url.split('?')[0]);
  currentPage = signal(0);

  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    feed: this.store.select(selectFeedData),
  });

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      console.log('params', params);
      this.currentPage.set(Number(params['page'] || 1));
      this.fetchFeed();
    });
  }

  fetchFeed(): void {
    const offset = this.currentPage() * this.limit() - this.limit();
    const parsedUrl = queryString.parseUrl(this.apiUrl());
    const stringifiedParams = queryString.stringify({
      limit: this.limit(),
      offset,
      ...parsedUrl.query,
    });
    const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`;
    this.store.dispatch(feedActions.getFeed({ url: apiUrlWithParams }));
  }
}
