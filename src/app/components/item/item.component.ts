import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Items } from 'src/app/models/item.model';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { ItemModalComponent } from '../item-modal/item-modal.component';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {
  @Input()
  item!: Items;
  public role = "Customer";
  public baseUrl = environment.baseUrl;
  constructor(
    private modalService: NgbModal,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.authService.getUser.subscribe(res => this.role = res.role!)
  }


  public open() {
    const itemModel = this.modalService.open(ItemModalComponent, {
      backdrop: 'static',
      keyboard: false,
    });
    itemModel.componentInstance.item = this.item;

  }
}
