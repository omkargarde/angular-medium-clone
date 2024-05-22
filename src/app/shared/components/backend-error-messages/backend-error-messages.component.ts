import { Component, input } from '@angular/core';
import { BackendErrorsInterface } from '../../types/backendError.interface';

@Component({
  selector: 'app-backend-error-messages',
  standalone: true,
  imports: [],
  templateUrl: './backend-error-messages.component.html',
  styleUrl: './backend-error-messages.component.scss',
})
export class BackendErrorMessagesComponent {
  backendErrors = input.required<BackendErrorsInterface>();
}
