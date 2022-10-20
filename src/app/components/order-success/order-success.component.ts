import { Component, Input, OnInit, } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import OrderModel from 'src/app/models/order.model';
import { CartItemMapped } from 'src/app/models/shoppingCart.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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
  public fileUrl!: SafeResourceUrl;
  constructor(
    public activeModal: NgbActiveModal,
    private authService: AuthService,
    private orderService: OrderService,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    this.authService.getUser.subscribe((res) => (this.user = res));
    this.tax = (Number(this.order.totalPrice!) * 0.17).toFixed(2);
    const data = this.cartItems.reduce((prev, curr) =>
      prev + `${curr.productName} (Qty:${curr.quantity}) - price: ${curr.price} - total: ${curr.totalPrice}\n`, '') + `Tax: ${this.tax}\n` + `Total: ${this.order.totalPrice}`
    const blob = new Blob([data], { type: 'application/pdf' });
    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
  }


  public closeModal(sendData: string) {
    this.activeModal.close(sendData);
  }
}
