import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddItemComponent } from './components/add-item/add-item.component';
import { LayoutComponent } from './components/layout/layout.component';
import { OrderLayoutComponent } from './components/order-layout/order-layout.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { ShoppingComponent } from './components/shopping/shopping.component';
import { LoggedInGuard } from './guards/logged-in.guard';

const routes: Routes = [
  { path: '', component: LayoutComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'shop', component: ShoppingComponent, canActivate: [LoggedInGuard] },
  { path: 'addItem', component: AddItemComponent },
  { path: 'order', component: OrderLayoutComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
