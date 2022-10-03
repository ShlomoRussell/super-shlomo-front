import { Component, OnInit } from '@angular/core';
import { Router, Scroll } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Items } from 'src/app/models/item.model';
import {
  CartItemMapped,
  ShoppingCartItem,
} from 'src/app/models/shoppingCart.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { ItemsService } from 'src/app/services/items.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public isCollapsed = false;
  public user!: User;
  public isShopping = false;
  private items!: Items[];
  private cartItems: ShoppingCartItem[] = [];
  constructor(
    private authService: AuthService,
    private router: Router,
    private itemsService: ItemsService,
    private shoppingCartService: ShoppingCartService
  ) {}
  ngOnInit(): void {
    this.shoppingCartService.getShoppingCart().subscribe(res=>this.shoppingCartService.setCart(res))
    this.itemsService.get_items.subscribe((res) => (this.items = res));
    this.shoppingCartService
      .getShoppingCart()
      .subscribe((res) => (this.cartItems = res.items));
    this.itemsService
      .getAllItems()
      .pipe(tap((res) => this.itemsService._items.next(res)))
      .subscribe((res) => this.itemsService.setItems(res));
    this.itemsService.get_items.subscribe((res) => {
      if (this.cartItems.length > 0) {
        this.shoppingCartService.setCartItemsMapped(
          res
            .filter(
              (item) =>
                item.id ===
                this.cartItems.find((_item) => _item.itemId === item.id)?.itemId
            )
            .reduce(
              (newArr: CartItemMapped[], curr) => [
                ...newArr,
                {
                  ...this.cartItems.find((_item) => _item.itemId === curr.id),
                  ...curr,
                },
              ],
              []
            )
        );
      }
    });
    this.authService.getUser.subscribe((res) => (this.user = res));
    this.router.events.subscribe((event) => {
      if (event instanceof Scroll && event.routerEvent.url === '/shop') {
        this.isShopping = true;
      } else {
        this.isShopping = false;
      }
    });
  }
  public onChangeSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    this.itemsService.searchItems(target.value);
  }
  public logOut() {
    this.authService.logOut();
  }
}
