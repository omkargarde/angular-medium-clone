import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from '../../services/auth.service';
import { register } from '../../store/actions';
import { selectIsSubmitting } from '../../store/reducer';
import { RegisterRequestInterface } from '../../types/registerRequest.interface';
import { AuthStateInterface } from './../../types/authState.interface';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  fb = inject(FormBuilder);
  store = inject(Store<{ auth: AuthStateInterface }>);
  authService = inject(AuthService);
  isSubmitting$ = this.store.select(selectIsSubmitting);
  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit() {
    console.log('from', this.form.getRawValue());
    const request: RegisterRequestInterface = {
      user: this.form.getRawValue(),
    };
    this.store.dispatch(register({ request }));
    this.authService
      .register(request)
      .subscribe((res) => console.log('res=', res));
  }
}
