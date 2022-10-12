import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { Items } from 'src/app/models/item.model';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {
  @Input()
  item!: Items;
  public editedItem = new Items();

  constructor(
    private itemsService: ItemsService,
    private offcanvasService: NgbOffcanvas,
  ) { }


  ngOnInit(): void {
  }
  public formData = new FormData();
  public onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;

    if (target.files![0]) {
      this.formData.append(target.name, target.files![0], target.value);
    }
  }
  public editItem() {
    this.editedItem.id = this.item.id
    this.itemsService.editItem(this.editedItem)
      .subscribe(res => this.itemsService.setItems(this.itemsService._items.value.map(currentItem => currentItem.id === this.item.id ? res : currentItem)))
  }

  public openOffcanvas(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { scroll: true });
  }

}
