import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  public categories = ['All'];
  constructor(private itemsService: ItemsService) {}

  ngOnInit(): void {
    this.itemsService
      .getCategories()
      .subscribe((res) => (this.categories = [...this.categories, ...res]));
  }

  public onCategoryChange(event: Event): void {
    const category = (event.target as HTMLSelectElement).value
    this.itemsService.filterCategories(category);
  }
}
