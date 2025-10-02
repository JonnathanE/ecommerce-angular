import { Component, computed, input, linkedSignal, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pagination',
  imports: [RouterLink],
  templateUrl: './pagination.html',
})
export class Pagination {
  pages = input<number>(0);
  currentPage = input<number>(1);

  activePage = linkedSignal(this.currentPage);

  getPageList = computed(() => {
    return Array.from({ length: this.pages() }, (_, i) => i + 1);
  });
}
