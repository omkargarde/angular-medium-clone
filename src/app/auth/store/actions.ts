import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CurrentUserInterface } from '../../shared/types/currentUser.interface';
import { LoginRequestInterface } from '../types/loginRequest.interface';
import { RegisterRequestInterface } from '../types/registerRequest.interface';
import { BackendErrorsInterface } from './../../shared/types/backendError.interface';

export const authActions = createActionGroup({
  // This specifies the name of the action group. Here, it's set to "auth" indicating these actions are for authentication.
  source: 'auth',
  //  This is an object that defines individual actions within the group.
  events: {
    // <ActionName>: props<{ property1: Type1, property2: Type2 }>(),

    // <ActionName>: This is the name you give to the action (e.g., Register).
    // props<{ ... }>: This is an optional property that defines the data the action carries. It's an object with properties and their expected data types.

    Register: props<{ request: RegisterRequestInterface }>(),
    'Register success': props<{ currentUser: CurrentUserInterface }>(),
    'Register failure': props<{ errors: BackendErrorsInterface }>(),

    Login: props<{ request: LoginRequestInterface }>(),
    'Login success': props<{ currentUser: CurrentUserInterface }>(),
    'Login failure': props<{ errors: BackendErrorsInterface }>(),

    'Get current user': emptyProps(),
    'Get current user success': props<{ currentUser: CurrentUserInterface }>(),
    'Get current user failure': emptyProps(),
  },
});
