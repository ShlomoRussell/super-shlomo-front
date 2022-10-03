import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, Scroll } from '@angular/router';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import {
  CartItemMapped,
  ShoppingCart,
} from 'src/app/models/shoppingCart.model';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  public cart!: ShoppingCart;
  public cartItems: CartItemMapped[] = [];
  public total = '00.00';
  public offCanvasIsDisabled = false;
  constructor(
    private shoppingCartService: ShoppingCartService,
    private offcanvasService: NgbOffcanvas,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.shoppingCartService
      .getShoppingCart()
      .subscribe((res) => (this.cart = res));
    this.shoppingCartService.getCartItemsMapped.subscribe((res) => {
      this.cartItems = res;
      this.total = res.reduce(
        (prev, curr) => (Number(curr.totalPrice!) + Number(prev)).toFixed(2),
        '0'
      );
    });
    this.router.events.subscribe((event) => {
      if (event instanceof Scroll && event.routerEvent.url === '/order') {
        this.offCanvasIsDisabled = true;
      } else {
        this.offCanvasIsDisabled = false;
      }
    });
  }

  public openScroll(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { scroll: true });
  }
}
