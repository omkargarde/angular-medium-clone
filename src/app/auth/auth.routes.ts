import { Route } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';

export const registerRoutes: Route[] = [
  {
    path: '',
    component: RegisterComponent,
  },
];
export const loginRoutes: Route[] = [
  {
    path: '',
    component: LoginComponent,
  },
];
