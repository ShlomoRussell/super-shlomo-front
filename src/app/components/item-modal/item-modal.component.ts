import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Items } from 'src/app/models/item.model';
import { CartItemMapped, ShoppingCartItem } from 'src/app/models/shoppingCart.model';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-item-modal',
  templateUrl: './item-modal.component.html',
  styleUrls: ['./item-modal.component.css']
})
export class ItemModalComponent implements OnInit {
  public baseUrl = environment.baseUrl;
  public shoppingCartItem = new ShoppingCartItem();
  public currentCartItems: CartItemMapped[] = [];

  @Input()
  item!: Items
  constructor(
    private shoppingCartService: ShoppingCartService,
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
    this.shoppingCartItem.quantity = 1;
    this.shoppingCartItem.totalPrice = this.item.price;

    this.shoppingCartService.getCartItemsMapped.subscribe(
      (res) => (this.currentCartItems = res)
    );
  }

  closeModal(sendData: string) {
    this.activeModal.close(sendData);
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

  public addToCart() {
    this.shoppingCartItem.itemId = this.item.id;
    this.activeModal.dismiss();
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


}
