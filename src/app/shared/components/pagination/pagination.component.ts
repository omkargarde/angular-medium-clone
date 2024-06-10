import { NgClass } from '@angular/common';
import { Component, OnInit, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [NgClass, RouterLink],
  templateUrl: './pagination.component.html',
})
export class PaginationComponent implements OnInit {
  utilsService = inject(UtilsService);

  total = input(0);
  limit = input(20);
  currentPage = input(1);
  url = input('');
  pagesCount = signal(1);
  pages = signal<number[]>([]);

  ngOnInit(): void {
    this.pagesCount.set(Math.ceil(this.total() / this.limit()));
    this.pages.set(
      this.pagesCount() > 0
        ? this.utilsService.range(1, this.pagesCount())
        : [],
    );
    console.log(this.pages());
  }
}
