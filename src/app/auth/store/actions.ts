import { createActionGroup, props } from '@ngrx/store';
import { CurrentUserInterface } from '../../shared/types/currentUser.interface';
import { LoginRequestInterface } from '../types/loginRequest.interface';
import { RegisterRequestInterface } from '../types/registerRequest.interface';
import { BackendErrorsInterface } from './../../shared/types/backendError.interface';

export const authActions = createActionGroup({
  source: 'auth',
  events: {
    Register: props<{ request: RegisterRequestInterface }>(),
    'Register success': props<{ currentUser: CurrentUserInterface }>(),
    'Register failure': props<{ errors: BackendErrorsInterface }>(),

    Login: props<{ request: LoginRequestInterface }>(),
    'Login success': props<{ currentUser: CurrentUserInterface }>(),
    'Login failure': props<{ errors: BackendErrorsInterface }>(),
  },
});
