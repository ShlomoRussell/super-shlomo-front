import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import OrderModel from 'src/app/models/order.model';
import {
  CartItemMapped,
  ShoppingCart,
} from 'src/app/models/shoppingCart.model';
import { OrderService } from 'src/app/services/order.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { OrderSuccessComponent } from '../order-success/order-success.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  public order = new OrderModel();
  public cartItems!: CartItemMapped[];
  public subTotal!: string;
  public total!: string;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private orderService: OrderService,
    private modalService: NgbModal,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.shoppingCartService.getCartItemsMapped.subscribe((res) => {
      
      this.cartItems = res;
 
      this.subTotal = this.cartItems.reduce(
        (prev, curr) => (Number(curr.totalPrice!) + Number(prev)).toFixed(2),
        '0'
      );
      this.total = (
        Number(this.subTotal) +
        Number(this.subTotal) * 0.17
      ).toFixed(2);
      this.shoppingCartService.getCart.subscribe((res) => {
       
        this.order.cartId = res.id;
        this.order.customerId = res.customerId;
      });
    });
  }

  public sendOrder() {
    this.order.totalPrice = this.total;
    this.order.orderedDate = new Date();
    this.orderService.checkout(this.order).subscribe((res) => {
      const modal = this.modalService.open(OrderSuccessComponent, {
        backdropClass: 'light-blue-backdrop',
        backdrop:"static"
      });
      modal.componentInstance.order = this.order;
      modal.componentInstance.cartItems = this.cartItems;
      this.shoppingCartService.deleteCart().subscribe((res) => {
        this.shoppingCartService
          .getShoppingCart()
          .subscribe((res) => this.shoppingCartService.setCart(res))
          .unsubscribe();
        this.shoppingCartService.setCartItemsMapped([]);
      });
    });
  }
}
