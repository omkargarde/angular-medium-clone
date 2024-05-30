import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { PersistanceService } from './persistance.service';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const persistanceService = inject(PersistanceService);
  const token = persistanceService.get('accessToken');
  request = request.clone({
    setHeaders: {
      // "token" has to be capitalized in the string while passing the token object is passed
      Authorization: token ? `Token ${token}` : '',
    },
  });
  return next(request);
};
