import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Items } from 'src/app/models/item.model';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css'],
})
export class AddItemComponent implements OnInit {
  public newItem = new Items();
  public categories!: string[];
  constructor(private itemsService: ItemsService, private router: Router) {}

  ngOnInit(): void {
    this.itemsService
      .getCategories()
      .subscribe((res) => (this.categories = res));
  }
  public formData = new FormData();
  public onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;

    if (target.files![0]) {
      this.formData.append(target.name, target.files![0], target.value);
    }
  }
  public addItem() {
    Object.entries(this.newItem).forEach((kv) =>
      this.formData.append(kv[0], kv[1])
    );
    this.itemsService.addItem(this.formData).subscribe((res) => {
      this.itemsService.setItems([...this.itemsService._items.value, res]);
      this.router.navigate(['/shop']);
    });
  }
}
