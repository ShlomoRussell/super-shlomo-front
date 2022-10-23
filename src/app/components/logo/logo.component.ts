import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css']
})
export class LogoComponent implements OnInit {
  public isNewCart!: boolean;
  constructor(private router: Router, private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.shoppingCartService.getCart.subscribe(res => this.isNewCart = !res.items.length)
  }

  public startShopping() {
    this.router.navigate(['/shop']);
  }
}
