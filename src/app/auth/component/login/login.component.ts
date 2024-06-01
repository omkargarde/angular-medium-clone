import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { BackendErrorMessagesComponent } from '../../../shared/components/backend-error-messages/backend-error-messages.component';
import { AuthService } from '../../services/auth.service';
import { authActions } from '../../store/actions';
import {
  selectIsSubmitting,
  selectValidationErrors,
} from '../../store/reducer';
import { AuthStateInterface } from '../../types/authState.interface';
import { LoginRequestInterface } from '../../types/loginRequest.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    AsyncPipe,
    BackendErrorMessagesComponent,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  fb = inject(FormBuilder);
  store = inject(Store<{ auth: AuthStateInterface }>);
  authService = inject(AuthService);

  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
  });

  form = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit() {
    console.log('from', this.form.getRawValue());
    const request: LoginRequestInterface = {
      user: this.form.getRawValue(),
    };
    this.store.dispatch(authActions.login({ request }));
  }
}
