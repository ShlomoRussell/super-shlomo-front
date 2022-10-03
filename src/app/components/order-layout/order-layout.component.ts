import { Component, OnInit } from '@angular/core';
import { CartItemMapped } from 'src/app/models/shoppingCart.model';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-order-layout',
  templateUrl: './order-layout.component.html',
  styleUrls: ['./order-layout.component.css'],
})
export class OrderLayoutComponent implements OnInit {
  public cartItems!: CartItemMapped[];
  constructor(private shoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {
    this.shoppingCartService.getCartItemsMapped.subscribe(
    (res) => (this.cartItems = res))
    }
}
