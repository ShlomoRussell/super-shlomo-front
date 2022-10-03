import { Component, Input, OnInit } from '@angular/core';
import {
  CartItemMapped,
  ShoppingCartItem,
} from 'src/app/models/shoppingCart.model';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent implements OnInit {
  @Input()
  cartItem!: CartItemMapped;
  @Input()
  isOrder: boolean = false;
  public cartItemsMappedArray!: CartItemMapped[];
  public cartItemsArray!: ShoppingCartItem[];
  constructor(private shoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {
    this.shoppingCartService.getCart.subscribe(
      (res) => (this.cartItemsArray = res.items)
    );
    this.shoppingCartService.getCartItemsMapped.subscribe(
      (res) => (this.cartItemsMappedArray = res)
    );
  }

  public addMapCb(item: CartItemMapped, index: number) {
    if (item.itemId === this.cartItem.itemId) {
      let { quantity, totalPrice } = item;
      return {
        ...item,
        ...this.cartItemsMappedArray[index],
        totalPrice: (
          Number(totalPrice!) +
          Number(totalPrice!) / quantity!
        ).toFixed(2),
        quantity: quantity! + 1,
      };
    }
    return item;
  }

  public addOneItem(item: ShoppingCartItem) {
    this.shoppingCartService.addToCart(item).subscribe((res) => {
      this.shoppingCartService.setCartItems(item);
      this.shoppingCartService.setCartItemsMapped(
        this.cartItemsMappedArray.map(this.addMapCb, this)
      );
    });
  }

  public subtractMapCb(item: CartItemMapped, index: number) {
    if (item.itemId === this.cartItem.itemId) {
      let { quantity, totalPrice, price } = item;
      return {
        ...item,
        ...this.cartItemsMappedArray[index],
        totalPrice: (Number(totalPrice!) - price!).toFixed(2),
        quantity: quantity! - 1,
      };
    }
    return item;
  }

  public subtractOneItem(item: ShoppingCartItem) {
       this.shoppingCartService
      .deleteOneItemFromCart(item.itemId!)
      .subscribe((res) => {
        if (res) {
          this.shoppingCartService.setCartItems(
            null,
            this.cartItemsArray.map(this.subtractMapCb, this)
          );

          this.shoppingCartService.setCartItemsMapped(
            this.cartItemsMappedArray.map(this.subtractMapCb, this)
          );
        }
      });
  }

  public deleteAllOfItemType(itemId: string) {
    this.shoppingCartService
      .deleteAllOfItemTypeFromCart(itemId)
      .subscribe((res) => {
        if (res) {
          this.shoppingCartService.setCartItemsMapped(
            this.cartItemsMappedArray.filter((item) => item.itemId !== itemId)
          );
        }
      });
  }
}
