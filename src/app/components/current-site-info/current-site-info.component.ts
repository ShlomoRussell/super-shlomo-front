import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ItemsService } from 'src/app/services/items.service';
import { OrderService } from 'src/app/services/order.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-current-site-info',
  templateUrl: './current-site-info.component.html',
  styleUrls: ['./current-site-info.component.css'],
})
export class CurrentSiteInfoComponent implements OnInit {
  public numberOfItemsAvailable!: number
  public numberOfOrdersPlaced!: number
  public dateOfLastPurchase!: Date
  public openCart!: Date
  public today = new Date()
  public cartIsEmpty = false
  public isLoggedIn = false
  constructor(
    private itemsService: ItemsService,
    private shoppingCartService: ShoppingCartService,
    private ordersService: OrderService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.itemsService.getItems.subscribe(res => this.numberOfItemsAvailable = res.length)
    this.ordersService.getCountOfOrders().subscribe(res => this.numberOfOrdersPlaced = res)
    this.ordersService.getLatestOrder().subscribe(res => this.dateOfLastPurchase = res.orderedDate!)
    this.authService.getLoggedIn.subscribe(res => this.isLoggedIn = res)
    this.shoppingCartService.getCart.subscribe(res => {
      this.openCart = new Date(res.dateCreated!)
      this.cartIsEmpty = !!res.items.length
    })
  }

}
