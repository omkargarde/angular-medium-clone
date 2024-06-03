import { Component, input } from '@angular/core';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [],
  template: `<div>{{ message() }}</div>`,
})
export class ErrorMessageComponent {
  message = input<string>('Something went wrong');
}
