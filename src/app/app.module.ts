import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { LayoutComponent } from './components/layout/layout.component';
import { AboutComponent } from './components/about/about.component';
import { CurrentSiteInfoComponent } from './components/current-site-info/current-site-info.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ShoppingComponent } from './components/shopping/shopping.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ItemComponent } from './components/item/item.component';
import { AddItemComponent } from './components/add-item/add-item.component';
import { OrderComponent } from './components/order/order.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { OrderLayoutComponent } from './components/order-layout/order-layout.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    LayoutComponent,
    AboutComponent,
    CurrentSiteInfoComponent,
    PageNotFoundComponent,
    ShoppingCartComponent,
    ShoppingComponent,
    CategoriesComponent,
    ItemComponent,
    AddItemComponent,
    OrderComponent,
    CartItemComponent,
    OrderLayoutComponent,
    OrderSuccessComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    NgbActiveModal,
    {
      useClass: JwtInterceptor,
      provide: HTTP_INTERCEPTORS,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
