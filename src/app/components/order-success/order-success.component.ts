import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import OrderModel from 'src/app/models/order.model';
import { CartItemMapped } from 'src/app/models/shoppingCart.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css'],
})
export class OrderSuccessComponent implements OnInit {
  public user!: User;
  @Input()
  order!: OrderModel;
  @Input()
  cartItems!: CartItemMapped[];
  public tax!: string;
  constructor(
    public activeModal: NgbActiveModal,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.getUser.subscribe((res) => (this.user = res));
    this.tax = (Number(this.order.totalPrice!) * 0.17).toFixed(2);
  }

  closeModal(sendData: string) {
    this.activeModal.close(sendData);
  }
}
