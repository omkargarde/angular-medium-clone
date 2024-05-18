import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CurrentUserInterface } from '../../shared/types/currentUser.interface';
import { AuthResponseInterface } from '../types/authResponse.interface';
import { RegisterRequestInterface } from '../types/registerRequest.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);

  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.apiURL + '/users';
    return this.http
      .post<AuthResponseInterface>(url, data)
      .pipe(map((response) => response.user));
  }
}
