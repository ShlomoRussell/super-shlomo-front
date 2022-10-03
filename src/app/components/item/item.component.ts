import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Items } from 'src/app/models/item.model';
import {
  CartItemMapped,
  ShoppingCartItem,
} from 'src/app/models/shoppingCart.model';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {
  @Input()
  item!: Items;
  public shoppingCartItem = new ShoppingCartItem();
  public currentCartItems: CartItemMapped[] = [];
  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private shoppingCartService: ShoppingCartService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.shoppingCartItem.quantity = 1;
    this.shoppingCartItem.totalPrice = this.item.price;
    this.shoppingCartService.getCartItemsMapped.subscribe(
      (res) => (this.currentCartItems = res)
    );
  }
  public addToCart() {
    this.shoppingCartItem.itemId = this.item.id;
    this.modalService.dismissAll();
    this.shoppingCartService
      .addToCart(this.shoppingCartItem)
      .subscribe((res) => {
        this.shoppingCartService.setCartItems(res);
        const index = this.currentCartItems.findIndex(
          (item) => item.id === this.item.id
        );
        if (index !== -1) {
          this.shoppingCartService.setCartItemsMapped(
            this.currentCartItems.map((item, i) => {
              if (i === index) {
                const { quantity, price } = item;
                return {
                  ...item,
                  ...this.currentCartItems[index],
                  quantity: quantity! + this.currentCartItems[index].quantity!,
                  totalPrice: (
                    Number(price!) +
                    Number(this.currentCartItems[index].totalPrice!)
                  ).toFixed(2),
                };
              }
              return item;
            })
          );
        } else {
          this.shoppingCartService.setCartItemsMapped([
            ...this.currentCartItems,
            { ...res, ...this.item },
          ]);
        }
      });
  }
  public addQuantity() {
    this.shoppingCartItem.quantity! =
      this.shoppingCartItem.quantity !== undefined
        ? this.shoppingCartItem.quantity + 1
        : 1;
    this.shoppingCartItem.totalPrice = (
      this.item.price! * this.shoppingCartItem.quantity!
    ).toFixed(2);
  }

  public subtractQuantity() {
    if (this.shoppingCartItem.quantity) {
      this.shoppingCartItem.quantity!--;
      this.shoppingCartItem.totalPrice = (
        this.item.price! * this.shoppingCartItem.quantity!
      ).toFixed(2);
    }
  }

  public open(content: TemplateRef<any>) {
    this.modalService.open(content);
  }
}
