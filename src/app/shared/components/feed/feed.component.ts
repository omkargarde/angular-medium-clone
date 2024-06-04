import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject, input, signal } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { LoadingComponent } from '../loading/loading.component';
import { feedActions } from './store/actions';
import { selectError, selectFeedData, selectIsLoading } from './store/reducers';
import { PaginationComponent } from "../pagination/pagination.component";

@Component({
    selector: 'app-feed',
    standalone: true,
    templateUrl: './feed.component.html',
    imports: [AsyncPipe, RouterLink, ErrorMessageComponent, LoadingComponent, PaginationComponent]
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
    this.store.dispatch(feedActions.getFeed({ url: this.apiUrl() }));
    this.route.queryParams.subscribe((params: Params) => {
      this.currentPage.set(Number(params['page'] || 1));
    });
  }
}
