import { Component, OnInit, input } from '@angular/core';
import { BackendErrorsInterface } from '../../types/backendError.interface';

@Component({
  selector: 'app-backend-error-messages',
  standalone: true,
  imports: [],
  templateUrl: './backend-error-messages.component.html',
  styleUrl: './backend-error-messages.component.scss',
})
export class BackendErrorMessagesComponent implements OnInit {
  backendErrors = input.required<BackendErrorsInterface>();
  errorMessages: string[] = [];

  ngOnInit(): void {
    this.errorMessages = Object.keys(this.backendErrors()).map(
      (name: string) => {
        const messages = this.backendErrors()[name].join(' ');
        return `${name} ${messages}`;
      }
    );
  }
}
