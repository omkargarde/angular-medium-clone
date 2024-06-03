import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import {
  ApplicationConfig,
  isDevMode,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import * as authEffects from './auth/store/effects';
import { authFeatureKey, authReducer } from './auth/store/reducer';
import * as feedEffects from './shared/components/feed/store/effects';
import {
  feedFeatureKey,
  feedReducer,
} from './shared/components/feed/store/reducers';
import { authInterceptor } from './shared/services/authInterceptor';
export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    provideRouterStore(),
    provideRouter(routes),
    provideStore({
      router: routerReducer,
    }),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
    provideEffects(authEffects, feedEffects),
    provideState(authFeatureKey, authReducer),
    provideState(feedFeatureKey, feedReducer),
  ],
};
