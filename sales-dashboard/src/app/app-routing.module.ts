import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalesComponent } from './pages/content/sales/sales.component';
import { ShopsComponent } from './pages/content/shops/shops.component';
import { AddShopComponent } from './pages/content/shops/add-shop/add-shop.component';
import { ShopComponent } from './pages/content/shops/shop/shop.component';
import { AddSaleComponent } from './pages/content/sales/add-sale/add-sale.component';
import { SaleComponent } from './pages/content/sales/sale/sale.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { NotAuthenticationGuard } from 'src/guards/not-authentication.guard';
import { AuthenticationGuard } from 'src/guards/authentication.guard';

const routes: Routes = [
  { path: '',   redirectTo: '/shops', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NotAuthenticationGuard]
  },
  {
    path: 'shops',
    component: ShopsComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'shops/add',
    component: AddShopComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'shops/:id',
    component: ShopComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'sales',
    component: SalesComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'sales/add',
    component: AddSaleComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'sales/:id',
    component: SaleComponent,
    canActivate: [AuthenticationGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
