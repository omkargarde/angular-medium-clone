import { Component, input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
})
export class PaginationComponent {
  total = input(0);
  limit = input(20);
  currentPage = input(1);
  url = input('');
}
